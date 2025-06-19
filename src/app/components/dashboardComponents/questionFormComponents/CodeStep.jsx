import React from "react";
import { motion } from "framer-motion";

const CodeStep = ({ register, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.0 }}
      className="w-full flex items-center justify-center"
    >
      <div className="flex justify-center items-start flex-col m-2 p-2 w-full">
        <h3 className="text-xl font-semibold mb-4  text-start w-full ml-3">
          Please paste the code.
        </h3>
        <textarea
          rows="10"
          cols="60"
          id="code"
          placeholder="....."
          className="border-1 border-gray-500 rounded-lg m-1 px-2 py-1 w-full"
          {...register("code", {
            required: "code is required.",
          })}
        />
        {errors.code && (
          <p className="text-red-500 text-xs italic m-2">
            {errors.code.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CodeStep;
