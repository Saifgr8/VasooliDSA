"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProblemsModal = ({ problems, date, onClose }) => {
  if (!problems || problems.length === 0) {
    return null; // Don't render if no problems
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Selected Date";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50 p-4"
        onClick={onClose} // Close modal when clicking outside
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 text-2xl font-bold"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Problems Solved on {formattedDate}
          </h2>

          <ul className="space-y-4">
            {problems.map((problem) => (
              <li
                key={problem.id}
                className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  <a
                    href={problem.problemLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {problem.problemName}
                  </a>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Difficulty: {problem.difficulty}
                </p>
                {/* Display all solutions for this problem within the modal */}
                {problem.solutions && problem.solutions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {problem.solutions.map((solution, solIndex) => (
                      <div
                        key={solIndex}
                        className="bg-gray-100 dark:bg-gray-600 p-3 rounded-md"
                      >
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          Language: {solution.languageUsed}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">
                          Submitted:{" "}
                          {new Date(solution.submittedOn).toLocaleString()}
                        </p>
                        {solution.notes && (
                          <p className="text-xs text-gray-700 dark:text-gray-400 mt-1">
                            Notes: {solution.notes}
                          </p>
                        )}
                        <details className="mt-2 text-gray-700">
                          <summary className="cursor-pointer font-medium text-blue-700 hover:text-blue-800 text-sm">
                            View Code
                          </summary>
                          <pre className="bg-gray-200 dark:bg-gray-700 p-2 rounded-md text-xs font-mono overflow-x-auto mt-1 dark:text-white">
                            <code>{solution.code}</code>
                          </pre>
                        </details>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
