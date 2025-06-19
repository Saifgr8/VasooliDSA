import React from "react";
import { motion } from "framer-motion";

const NoteStep = ({ register, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 1.0 }}
      className="w-full flex items-center justify-center"
    >
      <div className="flex justify-center items-center flex-col m-2 p-2 w-full">
        <h3 className="text-xl font-semibold mb-4 ">
          Paste or write comments related to problem(Optional)
        </h3>
        <textarea
          rows="10"
          cols="60"
          id="note"
          placeholder="Dynamic programming or expand around center."
          className="border-1 border-gray-500 rounded-lg m-1 px-2 py-1 w-full"
          {...register("note")}
        />
        {errors.note && (
          <p className="text-red-500 text-xs italic mt-2">
            {errors.note.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default NoteStep;
