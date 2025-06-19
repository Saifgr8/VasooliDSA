import React from "react";
import { motion } from "framer-motion";

const ProblemStatementStep = ({ register, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.0 }}
      className="w-full flex items-center justify-center"
    >
      <div className="flex justify-center items-start flex-col m-1 w-full">
        <h3 className="text-xl font-semibold mb-4  text-start w-full ml-3">
          Problem Statement
        </h3>
        <textarea
          id="problemStatement"
          rows="5"
          cols="60"
          placeholder="Two Sum: Find two incides whose sum is equal to target"
          className="border-1 border-gray-500 rounded-xl m-1 p-1 w-full block text-sm font-bold mb-2 "
          {...register("problemStatement", {
            required: "Porblem statement is required.",
            minLength: {
              value: 3,
              message: "Minimum 3 characters for problem statement.",
            },
            maxLength: {
              value: 200,
              message: "Max length exceeded, please provide brief statement.",
            },
          })}
        />
        {errors.problemStatement && (
          <p className="text-red-500 text-xs italic m-2">
            {errors.problemStatement.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProblemStatementStep;
