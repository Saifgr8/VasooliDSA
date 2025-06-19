// components/BrowseCards.jsx
"use client";
import React, { useEffect, useState, forwardRef, useRef } from "react"; // Import forwardRef
import Lottie from "lottie-react";
import target from "../../../public/target.json"; // Adjust path if necessary
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { calculatePoints } from "../utils/mockData"; // Adjust path if necessary
import crown from "../../../public/crown.json";
import { problemServices } from "../api/problemService";
import UserProblemsDisplay from "./UserProblemsDisplay";
import silver from "../../../public/silverMedal.json";

// Use forwardRef to allow parent to pass a ref to this component's DOM element
const BrowseCards = forwardRef(
  ({ user, index, isLoggedInUser = false }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [toggleProblemsModal, setTogglePorblemsModal] = useState(false);

    const [widthData, setwidthData] = useState({
      easy: 0,
      medium: 0,
      hard: 0,
    });

    const toggleExpand = () => {
      setExpanded(!expanded);
    };
    const handleOpenPorblemModal = () => {
      setTogglePorblemsModal(true);
    };
    const handleClosePorblemModal = () => {
      setTogglePorblemsModal(false);
    };
    const formattedDate = user?.createdOn
      ? new Date(user.createdOn).toLocaleDateString("en-US", {
          // Changed to toLocaleDateString for cleaner output
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "N/A"; // Changed fallback to "N/A"

    const calculateWidth = (data) => {
      if (!data) {
        setwidthData({ easy: 0, medium: 0, hard: 0 });
        return;
      }
      const { easy, medium, hard } = data;
      let easyWidth = Math.min(
        100,
        easy > 0 ? Math.floor((easy / 25) * 100) : 0
      );
      let mediumWidth = Math.min(
        100,
        medium > 0 ? Math.floor((medium / 10) * 100) : 0
      );
      let hardWidth = Math.min(
        100,
        hard > 0 ? Math.floor((hard / 5) * 100) : 0
      );

      setwidthData({
        easy: easyWidth,
        medium: mediumWidth,
        hard: hardWidth,
      });
    };

    const getProblemsForUser = async (e) => {
      setLogInError("");
      let userId = e;
      let jwt = localStorage.getItem("JWTtoken");
      if (!jwt) {
        setLogInError("Please log in to view this data.");
        return;
      }
      try {
        const response = await problemServices.get(userId, jwt);
        setProblemArray(response);
      } catch (error) {
        setLogInError("Please log in to view this data.");
      }
    };

    useEffect(() => {
      calculateWidth(user?.solvedCount);
    }, [user]);

    return (
      // Attach the forwarded ref to the outer-most div of the BrowseCards component
      <div ref={ref} className="flex justify-center items-center p-2 relative ">
        {index === 0 && (
          <Lottie
            animationData={crown}
            loop={false}
            autoplay={true}
            className="absolute z-50 -top-1/4 
            right-1/3 size-24 xl:rotate-[25deg] 
            xl:-top-1/3 xl:-right-8 xl:size-24 md:right-1/2 md:-top-1/3 " // Adjusted size, top, and right for better placement
          />
        )}
        <div
          onClick={toggleExpand}
          className={`relative w-full max-w-5xl dark:text-white text-gray-900
                     rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden
                     cursor-pointer transform transition-all duration-300 ease-in-out
                     hover:scale-[1.01] hover:shadow-2xl dark:hover:shadow-blue-500/30
                     ${
                       isLoggedInUser // HIGHLIGHT logged-in user's card
                         ? "dark:bg-green-900/40 bg-green-100 dark:hover:shadow-green-500/50 hover:shadow-green-500/90 border-2 border-green-500" // Distinct green highlight
                         : index === 0 // Rank 1
                         ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-slate-200 dark:hover:shadow-yellow-500/50 hover:shadow-yellow-500/90"
                         : index === 1 // Rank 2
                         ? "bg-gradient-to-r from-gray-500 via-gray-600 to-slate-200 dark:hover:shadow-gray-500/50 hover:shadow-gray-500/90"
                         : index === 2 // Rank 3
                         ? "bg-gradient-to-r from-amber-700 via-amber-800 to-slate-200 ark:hover:shadow-amber-500/50 hover:shadow-amber-500/90"
                         : "dark:bg-slate-700 bg-blue-200" // Default background for others
                     }`}
        >
          {/* No "Your Rank" absolute label here, as it's just highlighted */}

          <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-6">
            {/* Rank Display */}
            <div
              className={`absolute top-4 left-4 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10
              ${
                isLoggedInUser
                  ? "bg-blue-600" // Keep blue for logged-in user's own rank badge
                  : index === 0
                  ? "bg-amber-800" // Darker yellow for rank 1 badge
                  : index === 1
                  ? "bg-gray-800" // Darker gray for rank 2 badge
                  : index === 2
                  ? "bg-amber-900" // Even darker amber for rank 3 badge
                  : "bg-blue-600" // Default blue for others
              } `}
            >
              #{index + 1}
            </div>
            {/* Left Section: Profile Info */}
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-grow">
              {user?.profilePicUrl ? (
                // Removed onError prop from here
                <img
                  loading="lazy"
                  src={user?.profilePicUrl}
                  // Added alt attribute for accessibility
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
                />
              ) : (
                <FaUserCircle className="w-20 h-20 text-gray-400 dark:text-gray-500" />
              )}
              <div className="flex flex-row text-left justify-between w-full">
                <div className="flex justify-center items-start flex-col">
                  <span className="text-xl font-bold text-blue-400 text-start">
                    {user.username || "N/A"}{" "}
                    {isLoggedInUser && <span>(You)</span>}
                  </span>
                  <span className="text-lg dark:text-gray-100 text-black whitespace-nowrap">
                    Points: {calculatePoints(user?.solvedCount) || 0}
                  </span>
                </div>
                <Lottie
                  className="size-20 md:size-24" // Adjusted position and size
                  animationData={target}
                  loop={true} // Changed to loop true, usually targets loop
                  autoplay={true} // Ensure it plays automatically
                />
              </div>
            </div>

            {/* Right Section: Progress Bars */}
            <div className="md:w-2/3 w-full flex justify-end items-end flex-col">
              <div className="flex flex-col gap-3 w-full relative">
                <div className="flex items-center text-sm font-medium">
                  <span className="w-16 mr-2 text-green-400">Easy:</span>
                  <div className="flex-grow bg-gray-600 rounded-full h-4 relative overflow-hidden shadow-inner ">
                    <div
                      style={{ width: `${widthData.easy}%` }}
                      className="bg-green-500 rounded-full h-full transition-all duration-500 ease-out"
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      ({user.solvedCount?.easy || 0}/25) {widthData.easy}%
                    </span>
                  </div>
                </div>
                {/* Medium Progress Bar */}
                <div className="flex items-center text-sm font-medium">
                  <span className="w-16 mr-2 text-orange-400">Medium:</span>
                  <div className="flex-grow bg-gray-600 rounded-full h-4 relative overflow-hidden shadow-inner">
                    <div
                      style={{ width: `${widthData.medium}%` }}
                      className="bg-orange-500 rounded-full h-full transition-all duration-500 ease-out"
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      ({user.solvedCount?.medium || 0}/10) {widthData.medium}%
                    </span>
                  </div>
                </div>
                {/* Hard Progress Bar */}
                <div className="flex items-center text-sm font-medium">
                  <span className="w-16 mr-2 text-red-400">Hard:</span>
                  <div className="flex-grow bg-gray-600 rounded-full h-4 relative overflow-hidden shadow-inner">
                    <div
                      style={{ width: `${widthData.hard}%` }}
                      className="bg-red-600 rounded-full h-full transition-all duration-500 ease-out"
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      ({user.solvedCount?.hard || 0}/5) {widthData.hard}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Content (with transition) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              expanded ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-center px-6 gap-4">
              <Link href={`/dashboard?userId=${user.id}`}>
                <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out">
                  Show Dashboard
                </button>
              </Link>
              <div className="text-lg dark:text-gray-500 text-black">
                Solving since:{" "}
                <span className="font-medium dark:text-blue-600 text-blue-400">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
); // End of forwardRef

BrowseCards.displayName = "BrowseCards"; // Good practice for forwardRef components

export default BrowseCards;
