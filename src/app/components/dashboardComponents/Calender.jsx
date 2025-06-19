"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { motion } from "framer-motion";
import { ProblemsModal } from "./questionFormComponents/ProblemsModal";
import { useSelector } from "react-redux";
import { calculatePoints } from "@/app/utils/mockData"; // Assuming this utility is correct

const Calender = ({ user, solvedProblems }) => {
  const [activeDates, setActiveDates] = useState(new Map());
  const [isClient, setIsClient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDateProblems, setSelectedDateProblems] = useState([]);
  const [modalDate, setModalDate] = useState(null);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  // Redux state for authentication and solved count
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const solvedCount = useSelector((store) => store.auth?.user?.solvedCount); // Using solvedCount from Redux if available, otherwise from props

  // Client-side rendering check for Calendar component
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get logged-in user ID from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoggedInUserId(localStorage.getItem("userId"));
    }
  }, []);

  // Determine if the current calendar is for the authenticated user
  const validUser = loggedInUserId && loggedInUserId === user?.id;

  // Close modal function
  const closeModal = () => {
    setSelectedDateProblems([]);
    setModalOpen(false);
    setModalDate(null);
  };

  // Effect to calculate active dates for the calendar heatmap
  useEffect(() => {
    const counts = new Map();
    if (solvedProblems && solvedProblems.length > 0) {
      solvedProblems.forEach((problem) => {
        // Use the first solution's submittedOn date for problem, or handle multiple solutions if needed
        const submissionDate = problem.solutions && problem.solutions.length > 0
          ? new Date(problem.solutions[0]?.submittedOn)
          : null;

        if (submissionDate && !isNaN(submissionDate.getTime())) { // Validate date
          const year = submissionDate.getFullYear();
          const month = String(submissionDate.getMonth() + 1).padStart(2, "0");
          const day = String(submissionDate.getDate()).padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}`;
          counts.set(formattedDate, (counts.get(formattedDate) || 0) + 1);
        }
      });
    }
    setActiveDates(counts);
  }, [solvedProblems]);

  // Styling function for calendar tiles (heatmap)
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const count = activeDates.get(formattedDate);

      if (count) {
        if (count >= 3) return "bg-green-700 text-white rounded-md"; // More intense green for 3+
        else if (count >= 2) return "bg-green-600 text-white rounded-md"; // Medium green for 2
        else if (count === 1) return "bg-green-500 text-white rounded-md"; // Lighter green for 1
      }
    }
    return null;
  };

  // Handle date click on calendar to open modal
  const handleClickDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const clickedFormattedDate = `${year}-${month}-${day}`;

    const problemsOnThisDate = solvedProblems.filter((problem) => {
      if (problem.solutions && problem.solutions.length > 0) {
        return problem.solutions.some((solution) => {
          const solutionDate = new Date(solution.submittedOn);
          const solYear = solutionDate.getFullYear();
          const solMonth = String(solutionDate.getMonth() + 1).padStart(2, "0");
          const solDay = String(solutionDate.getDate()).padStart(2, "0");
          const formattedSolutionDate = `${solYear}-${solMonth}-${solDay}`;
          return formattedSolutionDate === clickedFormattedDate;
        });
      }
      return false;
    });

    if (problemsOnThisDate.length > 0) {
      setModalDate(date);
      setSelectedDateProblems(problemsOnThisDate);
      setModalOpen(true);
    } else {
      // Optional: Give feedback if no problems on clicked empty date
      // alert("No problems solved on this date.");
    }
  };

  // Combine user's solvedCount from props or Redux
  const currentUserSolvedCount = user?.solvedCount || solvedCount || { easy: 0, medium: 0, hard: 0 };
  const totalPoints = calculatePoints(currentUserSolvedCount); // Calculate total points

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch w-full p-4 lg:p-8  space-y-2 lg:space-x-8   ">
      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 max-w-xl  rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden p-6 border border-gray-200 dark:border-gray-700
                   flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Activity Calendar
        </h2>
        {isClient && (
          <Calendar
            tileClassName={tileClassName}
            showNavigation={true}
            showNeighboringMonth={false}
            locale="en-US"
            onClickDay={handleClickDate}
            className="w-full text-gray-900 dark:text-gray-200 " // Tailwind classes for overall calendar styling
          />
        )}
        {!isClient && (
          <div className="text-center text-gray-500 dark:text-gray-400">Loading Calendar...</div>
        )}
      </motion.div>

      {/* Rules and Points Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 max-w-xl  rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden p-6 border border-gray-200 dark:border-gray-700
                   flex flex-col items-center justify-start "
      >
        {/* Rules */}
        <div className="w-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Daily Submission Streak
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span>1 problem solved</span>
              <div className="bg-green-500 h-8 w-8 rounded-md shadow-inner"></div>
            </div>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span>2 problems solved</span>
              <div className="bg-green-600 h-8 w-8 rounded-md shadow-inner"></div>
            </div>
            <div className="flex items-center justify-between text-gray-700 dark:text-gray-300">
              <span>3+ problems solved</span>
              <div className="bg-green-700 h-8 w-8 rounded-md shadow-inner"></div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-800 dark:border-gray-200 pt-2 mt-8"> {/* Separator */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Points System
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div className="flex flex-col items-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <span className="text-lg font-bold text-green-700 dark:text-green-300">{currentUserSolvedCount.easy || 0}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Easy Solved</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">2 points/each</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
              <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{currentUserSolvedCount.medium || 0}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Medium Solved</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">7 points/each</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700">
              <span className="text-lg font-bold text-red-700 dark:text-red-300">{currentUserSolvedCount.hard || 0}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">Hard Solved</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">20 points/each</span>
            </div>
          </div>

          <div className="text-center w-full flex flex-col items-center justify-center p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700">
            <p className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {validUser ? "Your Total Points:" : `${user.username}'s Total Points:`}
            </p>
            <div className="bg-indigo-600 text-white text-3xl font-extrabold h-16 w-16 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              {totalPoints}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Problems Modal */}
      {modalOpen && (
        <ProblemsModal
          problems={selectedDateProblems}
          date={modalDate}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Calender;