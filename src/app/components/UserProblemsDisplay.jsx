"use client"; // This component runs on the client side

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from "react-icons/fa"; // Icons for collapse and external link

const UserProblemsDisplay = ({ problemArray, logInError }) => {
  // State to manage the expanded/collapsed status of each difficulty section
  const [expandedDifficulties, setExpandedDifficulties] = useState({
    Easy: false,
    Medium: false,
    Hard: false,
  });

  // Function to toggle the expanded state of a difficulty section
  const toggleDifficulty = (difficulty) => {
    setExpandedDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }));
  };

  // Function to format the date string
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return "Invalid Date";
    }
  };

  // Categorize problems by difficulty
  const easyProblems = problemArray.filter((p) => p.difficulty === "Easy");
  const mediumProblems = problemArray.filter((p) => p.difficulty === "Medium");
  const hardProblems = problemArray.filter((p) => p.difficulty === "Hard");

  const difficulties = [
    { name: "Easy", color: "text-green-500", bgColor: "bg-green-100", problems: easyProblems },
    { name: "Medium", color: "text-yellow-500", bgColor: "bg-yellow-100", problems: mediumProblems },
    { name: "Hard", color: "text-red-500", bgColor: "bg-red-100", problems: hardProblems },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        User's Solved Problems
      </h3>

      {/* Display login error if present */}
      {logInError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
          <span className="block sm:inline">{logInError}</span>
        </div>
      )}

      {/* Message if no problems are found */}
      {problemArray.length === 0 && !logInError && (
        <div className="text-center text-gray-600 dark:text-gray-400 py-8">
          <p className="text-xl font-medium">No problems found for this user yet.</p>
          <p className="text-sm mt-2">Click on a user card to view their problems.</p>
        </div>
      )}

      {/* Difficulty Sections */}
      {problemArray.length > 0 && (
        <div className="space-y-4">
          {difficulties.map((difficultySection) => (
            <div
              key={difficultySection.name}
              className={`rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${difficultySection.bgColor} dark:bg-opacity-20`}
            >
              {/* Collapsible Header */}
              <button
                className={`w-full flex justify-between items-center p-4 font-semibold text-lg ${difficultySection.color} dark:text-opacity-80
                            hover:bg-opacity-80 focus:outline-none transition-colors duration-200`}
                onClick={() => toggleDifficulty(difficultySection.name)}
              >
                <span>{difficultySection.name} ({difficultySection.problems.length})</span>
                {expandedDifficulties[difficultySection.name] ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {/* Collapsible Content */}
              {expandedDifficulties[difficultySection.name] && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  {difficultySection.problems.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-2">
                      No {difficultySection.name.toLowerCase()} problems solved yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto overflow-x-auto"> {/* Added max-h-96, overflow-y-auto, overflow-x-auto */}
                      {difficultySection.problems.map((problem) => (
                        <div
                          key={problem.id}
                          className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600
                                     transition-all duration-200 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                              {problem.problemName}
                            </h4>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full
                                               ${
                                                 problem.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                                                 problem.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                                                 "bg-red-100 text-red-700"
                                               } dark:bg-opacity-30 dark:text-opacity-90`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          {problem.problemLink && (
                            <a
                              href={problem.problemLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center text-sm mb-2"
                            >
                              Problem Link <FaExternalLinkAlt className="ml-1 text-xs" />
                            </a>
                          )}
                          {/* Display solutions if available */}
                          {problem.solutions && problem.solutions.length > 0 ? (
                            <div className="mt-3 space-y-2 border-t pt-3 border-gray-200 dark:border-gray-600">
                              {problem.solutions.map((solution, solIndex) => (
                                <div key={solIndex} className="text-sm text-gray-700 dark:text-gray-300">
                                  <p className="font-semibold">Language: <span className="font-normal">{solution.languageUsed || 'N/A'}</span></p>
                                  <p className="font-semibold">Solved On: <span className="font-normal">{formatDateTime(solution.submittedOn)}</span></p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">No solution details available.</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProblemsDisplay;