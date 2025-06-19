import React from "react";

const PorgressBar = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-center items-center w-full gap-5">
      {Array.from({ length: totalSteps - 1 }, (_, i) => {
        return (
          <div
            key={i}
            className={`h-4 w-4 rounded-full transition-all duration-300 flex justify-center items-center flex-row gap-5 ${
              i === currentStep ? "scale-150 animate-bounce" : ""
            }
        ${
          i <= currentStep
            ? "bg-blue-500 dark:bg-blue-700"
            : "bg-gray-400 dark:bg-gray-600"
        }
        `}
          ></div>
        );
      })}
    </div>
  );
};

export default PorgressBar;
