"use client";
import React, { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { problemServices } from "@/app/api/problemService";
import EditProblemForm from "./EditProblemForm";
import { useSelector } from "react-redux";
import AddQuestionForm from "./AddQuestionForm";
import MyButton from "../MyButton";

export const SolvedProblemList = ({
  arr,
  triggerChange,
  targetUserDashboard,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [formModal, setFromModal] = useState(false);

  const [displayedList, setDisplayedList] = useState([]);
  const [ascSort, setAscSort] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editProblem, setEditProblem] = useState(null);
  const [selectedLanguagePerProblem, setSelectedLanguagePerProblem] = useState(
    {}
  );
  const [editModal, setEditModal] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const toggleFormModal = (arg) => {
    setFromModal((prev) => !prev);
  };
  useEffect(() => {
    let currentList = [...arr];

    if (selectedDifficulty !== "All") {
      currentList = currentList.filter(
        (problem) => problem.difficulty === selectedDifficulty
      );
    }

    if (searchQuery !== "") {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentList = currentList.filter((problem) => {
        return (
          problem.problemName.toLowerCase().includes(lowerCaseQuery) ||
          problem.problemName.toLowerCase().startsWith(lowerCaseQuery)
        );
      });
    }

    // Sort by submittedOn date from the *first* solution, or createdOn if available
    currentList.sort((a, b) => {
      // Assuming 'submittedOn' is on the first solution.
      // If you added 'createdOn' to UserProblem, you might sort by that instead.
      const dateA = new Date(a.solutions[0]?.submittedOn || 0); // Use first solution's date
      const dateB = new Date(b.solutions[0]?.submittedOn || 0); // Use first solution's date
      return ascSort
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime(); // Corrected syntax for getTime()
    });

    setDisplayedList(currentList);

    const initialSelectedLanguages = {};
    arr.forEach((problem) => {
      if (problem.solutions && problem.solutions.length > 0) {
        initialSelectedLanguages[problem.id] =
          problem.solutions[0].languageUsed;
      }
    });
    setSelectedLanguagePerProblem(initialSelectedLanguages);
  }, [arr, selectedDifficulty, ascSort, searchQuery]); // Dependencies

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDateSort = () => {
    setAscSort((prev) => !prev);
  };

  // *** NEW HANDLER: For language dropdown change on each problem card ***
  const handleLanguageChange = (problemId, event) => {
    const newLanguage = event.target.value;
    setSelectedLanguagePerProblem((prev) => ({
      ...prev,
      [problemId]: newLanguage,
    }));
  };

  const handleProblemDelete = async (problemId) => {
    if (!window.confirm("Are you sure you want to delete the problem?")) {
      return;
    }
    const jwt = localStorage.getItem("JWTtoken");
    if (!jwt) {
      console.error("JWT not found, pelase log in");
      return;
    }
    try {
      const response = await problemServices.delete(problemId, jwt);
      triggerChange();
    } catch (error) {
      console.error(error.message);
      alert("Failed to delete problem due to: ", error.message);
    }
  };
  const onEditClick = (problem) => {
    setEditProblem(problem);
    setEditModal(true);
  };
  const handleCloseModal = () => {
    setEditProblem(null);
    setEditModal(false);
  };

  const verifiedID = targetUserDashboard;
  return (
    <div className="w-full ">
      <div className="max-w-4xl mx-auto bg-transparent p-6 rounded-xl shadow-lg font-inter">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 ">
          {/* Search Input */}
          <div className="flex items-center w-full justify-evenly ">
            <input
              value={searchQuery}
              onChange={handleSearchQuery}
              className="m-2 p-2 rounded-xl shadow-lg shadow-slate-800 dark:shadow-white w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search for problem..."
            />

            <div className="hidden md:flex flex-col justify-between items-start m-2 p-2 gap-2 whitespace-nowrap w-1/3">
              {verifiedID && (
                <button
                  className="flex justify-center items-center gap-2 md:m-1 p-2 rounded-lg cursor-pointer shadow-lg shadow-slate-800 dark:shadow-white bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
                  type="button"
                  onClick={toggleFormModal}
                >
                  Add Question
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center md:justify-end items-center gap-4 w-full sm:w-1/2">
            <div className=" md:hidden flex flex-col justify-between items-start m-2 p-2 gap-2 whitespace-nowrap w-1/3">
              {verifiedID && (
                <button
                  className="flex justify-center items-center gap-2 md:m-1 p-2 rounded-lg cursor-pointer shadow-lg shadow-slate-800 dark:shadow-white bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
                  type="button"
                  onClick={toggleFormModal}
                >
                  Add Question
                </button>
              )}
            </div>
            {/* Difficulty Filter Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
              className="md:m-1 p-2 rounded-lg cursor-pointer shadow-lg shadow-slate-800 dark:shadow-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="All">Difficulty (All)</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            {/* Sort by Date Button */}
            <div
              onClick={toggleDateSort}
              className="flex justify-center items-center gap-2 md:m-1 p-2 rounded-lg cursor-pointer shadow-lg shadow-slate-800 dark:shadow-white bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:scale-105"
            >
              <button>Date</button>
              {ascSort ? "↓" : "↑"}
            </div>
          </div>
        </div>
        {/* List of Solved Problems */}
        {displayedList.length > 0 ? (
          <ul className="space-y-4">
            {displayedList.map((problem) => {
              // Use problem.id as key if available
              // Find the currently selected solution for this problem
              const currentSelectedLanguage =
                selectedLanguagePerProblem[problem.id];
              const displayedSolution = problem.solutions.find(
                (sol) => sol.languageUsed === currentSelectedLanguage
              );
              return (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  key={problem.id} // *** Use problem.id as key for better stability ***
                  className="p-4 rounded-lg hover:shadow-md transition duration-200 ease-in-out shadow-inner shadow-white dark:bg-slate-800 bg-blue-100/20 hover:bg-blue-200/50 dark:hover:bg-slate-900"
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        <a
                          href={problem.problemLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline w-full"
                        >
                          {problem.problemName}
                        </a>
                      </h3>
                    </div>
                    {isAuthenticated && verifiedID && (
                      <div className=" flex justify-end items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEditClick(problem)}
                          className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
                        >
                          <FaRegEdit />
                        </button>
                        <button
                          className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
                          type="button"
                          onClick={() => handleProblemDelete(problem.id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span
                      className={`font-medium ${
                        problem.difficulty === "Easy"
                          ? "text-green-600"
                          : problem.difficulty === "Medium"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      Difficulty: {problem.difficulty}
                    </span>
                    {/* Removed language and submittedOn from here as they will be in the dropdown/details */}
                  </p>
                  <div className="flex  flex-col justify-start items-start gap-2 my-2">
                    <span className="text-sm text-gray-500">
                      Time Complexity:{" "}
                      <span className="dark:text-blue-500 text-blue-700">
                        {problem?.timeComplexity}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">
                      Space Complexity:{" "}
                      <span className="dark:text-blue-500 text-blue-700">
                        {problem?.spaceComplexity}
                      </span>
                    </span>
                  </div>
                  {/* *** NEW: Language Dropdown for each problem *** */}
                  {problem.solutions &&
                    problem.solutions.length > 1 && ( // Only show if multiple solutions exist
                      <div className="mb-4">
                        <label
                          htmlFor={`language-select-${problem.id}`}
                          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                        >
                          View Solution In:
                        </label>
                        <select
                          id={`language-select-${problem.id}`}
                          value={currentSelectedLanguage || ""} // Handle initial undefined state
                          onChange={(e) => handleLanguageChange(problem.id, e)}
                          className="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 text-sm py-2 px-3"
                        >
                          {/* Dynamically populate options from available solutions for this problem */}
                          {problem.solutions.map((sol) => (
                            <option
                              key={sol.languageUsed}
                              value={sol.languageUsed}
                            >
                              {sol.languageUsed}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  <details className="text-gray-700">
                    <summary className="cursor-pointer font-medium text-blue-700 hover:text-blue-800">
                      Notes & Code
                      {/* Display selected language and submitted on date here for clarity */}
                      {displayedSolution && (
                        <span className="text-black dark:text-white text-xs ml-2">
                          | {displayedSolution.languageUsed} | Submitted:{" "}
                          {new Date(
                            displayedSolution.submittedOn
                          ).toLocaleString()}
                        </span>
                      )}
                    </summary>
                    <div className="mt-2 text-sm dark:text-white">
                      {displayedSolution ? ( // Only render if a solution is found
                        <>
                          <p className="mb-2">
                            <strong>Notes:</strong> {displayedSolution.notes}
                          </p>
                          <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-x-auto text-xs font-mono border border-gray-300">
                            <code>{displayedSolution.code}</code>
                          </pre>
                        </>
                      ) : (
                        <p className="text-gray-500">
                          No solution selected or found.
                        </p>
                      )}
                    </div>
                  </details>
                </motion.li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg py-8">
            No problems found matching your criteria, Please try again.
          </p>
        )}
      </div>
      {editModal && (
        <EditProblemForm
          closeModal={handleCloseModal}
          problem={editProblem}
          triggerChange={triggerChange}
        />
      )}
      {formModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50 bg-black/70">
          <AddQuestionForm
            closeModal={toggleFormModal}
            triggerChange={triggerChange}
          />
        </div>
      )}
    </div>
  );
};
