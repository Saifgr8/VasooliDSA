"use client";
import React, { useEffect, useState } from "react";

const MyButton = ({ text, onClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  return (
    <div>
      {isClient && (
        <button
          type="button"
          className="cursor-pointer bg-blue-300 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-900 m-1 py-1 md:px-4 px-2 rounded-lg shadow-lg"
          onClick={onClick}
        >
          {text}
        </button>
      )}
    </div>
  );
};

export default MyButton;
