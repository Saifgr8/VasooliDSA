// src/components/questionFormComponents/TimeComplexityStep.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const TimeComplexityStep = ({ register, errors }) => {
  // Common examples for time complexity notation (can be adjusted)
  const commonTimeComplexities = [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n^2)",
    "O(n^3)",
    "O(2^n)",
    "O(n!)",
  ];

  // Common examples for space complexity notation (can be adjusted)
  const commonSpaceComplexities = [
    "O(1)",
    "O(log n)",
    "O(n)",
    "O(n log n)",
    "O(n^2)",
  ];

  return (
    <motion.div // Unique key for motion component transitions
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        Time & Space Complexity
      </h3>

      {/* Time Complexity Input */}
      <div className="mb-6">
        <label
          htmlFor="timeComplexity"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          Time Complexity:
        </label>
        <select
          id="timeComplexity"
          type="text"
          {...register("timeComplexity", {
            required: "Time Complexity is required.",
          })}
          className={`shadow border ${
            errors.spaceComplexity
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700`}
        >
          <option value="">-- Select Time Complexity --</option>
          {commonTimeComplexities.map((complexity) => {
            return (
              <option key={complexity} value={complexity}>
                {complexity}
              </option>
            );
          })}
        </select>
        {errors.timeComplexity && (
          <p className="text-red-500 text-xs italic mt-2">
            {errors.timeComplexity.message}
          </p>
        )}
      </div>

      {/* Space Complexity Select */}
      <div className="mb-6">
        <label
          htmlFor="spaceComplexity"
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          Space Complexity:
        </label>
        <select
          id="spaceComplexity"
          {...register("spaceComplexity", {
            required: "Space Complexity is required.",
          })}
          className={`shadow border ${
            errors.spaceComplexity
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700`}
        >
          <option value="">-- Select Space Complexity --</option>
          {commonSpaceComplexities.map((complexity) => (
            <option key={complexity} value={complexity}>
              {complexity}
            </option>
          ))}
        </select>
        {errors.spaceComplexity && (
          <p className="text-red-500 text-xs italic mt-2">
            {errors.spaceComplexity.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default TimeComplexityStep;
