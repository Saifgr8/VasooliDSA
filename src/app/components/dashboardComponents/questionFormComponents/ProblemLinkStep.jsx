import React from "react";
import { motion } from "framer-motion";

const ProblemLinkStep = ({ register, errors }) => {
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
          Porblem Statement Link
        </h3>
        <input
          type="text"
          id="problemLink"
          placeholder="https:leetcode/twoSum.com"
          className="border-1 border-gray-500 text-white rounded-lg m-1 px-2 py-1 w-full "
          {...register("problemLink", {
            required: "Porblem Link is required.",
            pattern: {
              value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
              message: "Please enter a valid URL",
            },
          })}
        />
        {errors.problemLink && (
          <p className="text-red-500 text-xs italic m-2">
            {errors.problemLink.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProblemLinkStep;
