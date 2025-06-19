"use client";
import React, { useState } from "react";
import MyButton from "../MyButton";
import { useForm } from "react-hook-form";
import ProblemStatementStep from "./questionFormComponents/ProblemStatementStep";
import ProblemLinkStep from "./questionFormComponents/ProblemLinkStep";
import LanguageAndDifficultyStep from "./questionFormComponents/LanguageAndDifficultyStep";
import CodeStep from "./questionFormComponents/CodeStep";
import NoteStep from "./questionFormComponents/NoteStep";
import { Truculenta } from "next/font/google";
import PorgressBar from "./questionFormComponents/PorgressBar";
import { problemServices } from "@/app/api/problemService";
import TimeComplexityStep from "./questionFormComponents/TimeCompleityStep";
import { useRouter } from "next/navigation";

const AddQuestionForm = ({ closeModal, triggerChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [apiError, setApiError] = useState("");
  const totalSteps = 7;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, touchedFields },
    getValues,
    setValue,
    trigger,
    reset,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const stepFields = [
    ["problemStatement"],
    ["problemLink"],
    ["programmingLanguage", "difficulty"],
    ["code"],
    ["note"],
    ["timeComplexity, spaceComplexity"],
  ];

  const handleNext = async () => {
    const isStepValid = await trigger(stepFields[currentStep], {
      shouldFocus: true,
    });

    if (isStepValid && currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else if (!isStepValid) {
      console.error("Validation failed here ", errors);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      return setCurrentStep((prev) => prev - 1);
    }
  };

  const mySubmit = async (data) => {
    setApiError("");
    const jwt = localStorage.getItem("JWTtoken");
   
    try {
      const backendResponse = await problemServices.save(
        {
          problemName: data.problemStatement,
          problemLink: data.problemLink,
          difficulty: data.difficulty,
          languageUsed: data.programmingLanguage,
          code: data.code,
          notes: data.note,
          timeComplexity: data.timeComplexity,
          spaceComplexity: data.spaceComplexity,
        },
        jwt
      );
      reset();
      triggerChange();
      closeModal();
    } catch (error) {
      setApiError(error.message); // Default error message

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("API Error Status:", error.response.status);
        console.error("API Error Data:", error.response.data);

        if (error.response.status === 401 || error.response.status === 403 ) {
          setApiError("Your session has expired. Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          setApiError(`Error: ${error.response.data.message || error.message}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setApiError("Network error. Please check your internet connection.");
      } else {
        // Something else happened in setting up the request that triggered an Error
        setApiError("An unexpected error occurred.");
      }
      console.error(error);
    }
  };

  const onErrors = (errors) => {
  };
  return (
    <div className="w-full flex justify-center items-center dark:text-white ">
      <form
        onSubmit={handleSubmit(mySubmit, onErrors)}
        className="flex justify-center items-center flex-col m-2 p-2 rounded-xl shadow-lg backdrop-blur-xl border-2 border-white md:w-1/2 w-2/3"
      >
        <div className="flex justify-center items-center m-2 p-2  w-full">
          <PorgressBar totalSteps={totalSteps} currentStep={currentStep} />
        </div>
        <h3 className="md:text-xl font-semibold mb-4  text-white">
          Submit your solved problem
        </h3>
        <div className="min-h-[250px] flex justify-center items-center w-full text-white">
          {currentStep === 0 && (
            <ProblemStatementStep register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <ProblemLinkStep register={register} errors={errors} />
          )}
          {currentStep === 2 && (
            <LanguageAndDifficultyStep register={register} errors={errors} />
          )}
          {currentStep === 3 && (
            <CodeStep register={register} errors={errors} />
          )}
          {currentStep === 4 && (
            <NoteStep register={register} errors={errors} />
          )}
          {currentStep === 5 && (
            <TimeComplexityStep register={register} errors={errors} />
          )}
        </div>
        {apiError && <p className="text-red-500 italic m-2  ">{apiError}</p>}
        <div className="flex justify-center items-center gap-2 w-1/w">
          <div className="flex justify-center items-center w-1/2">
            <button
              type="button"
              className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
              text={currentStep === 0 ? "Close" : "Back"}
              onClick={currentStep === 0 ? closeModal : handlePrev}
            >
              {currentStep === 0 ? "Close" : "Back"}
            </button>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <button
              type={currentStep === totalSteps - 1 ? "submit" : "button"}
              onClick={
                currentStep === totalSteps - 1
                  ? handleSubmit(mySubmit, onErrors)
                  : handleNext
              }
              className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
            >
              {currentStep === totalSteps - 2 ? "Submit" : "Next"}
            </button>
          </div>
          {apiError && (
            <div>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddQuestionForm;
