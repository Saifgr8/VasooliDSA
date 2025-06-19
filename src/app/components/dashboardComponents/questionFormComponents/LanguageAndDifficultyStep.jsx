// src/components/questionFormComponents/LanguageAndDifficultyStep.jsx
import React from "react";
import { motion } from "framer-motion";

const LanguageAndDifficultyStep = ({ register, errors }) => {
  console.log("Errors prop in LanguageAndDifficultyStep:", errors);
  console.log("Errors for programmingLanguage:", errors.programmingLanguage);
  const programmingLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "TypeScript",
    "PHP",
    "Swift",
    "Kotlin",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];
  if (errors.programmingLanguage) {
    console.log("ho");
  }
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h3 className="text-xl font-semibold mb-4 ">
        Language & Difficulty
      </h3>

      {/* Programming Language Select */}
      <div className="mb-6">
        <label
          htmlFor="programmingLanguage"
          className="block  text-sm font-bold mb-2"
        >
          Programming Language used:
        </label>
        <select
          id="programmingLanguage"
          {...register("programmingLanguage", {
            required: "Programming Language is required.",
          })}
          className="shadow border rounded w-full  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700  dark:border-gray-600
                     text-sm py-2 px-3"
        >
          <option value="">-- Select Programming Language used --</option>{" "}
          {/* <--- Value for unselected is empty */}
          {programmingLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        {errors.programmingLanguage && (
          <p className="text-red-500 text-xs italic mt-2">
            {errors.programmingLanguage.message}
          </p>
        )}
      </div>

      {/* Difficulty Select */}
      <div className="mb-6">
        <label
          htmlFor="difficulty"
          className="block  text-sm font-bold mb-2"
        >
          Please select difficulty:
        </label>
        <select
          id="difficulty"
          {...register("difficulty", {
            required: "Difficulty is required.",
          })}
          className="shadow border rounded w-full  leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700  dark:border-gray-600
                     text-sm py-2 px-3"
        >
          <option value="">-- Please select difficulty of problem --</option>{" "}
          {/* <--- Value for unselected is empty */}
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
        {errors.difficulty && (
          <p className="text-red-500 text-xs italic mt-2">
            {errors.difficulty.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default LanguageAndDifficultyStep;
