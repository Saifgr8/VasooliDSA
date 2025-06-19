// app/leaderboard/page.jsx (or whatever your main leaderboard page file is)
"use client";
import React, { useEffect, useState, useRef } from "react"; // Import useRef
import { useRouter } from "next/navigation"; // Not used in this specific file, but good to keep if you need it
import DarkModeToggler from "./components/DarkModeToggler"; // Keep if you use it globally
import { ThemeProvider } from "./context/ThemeContext"; // Keep if you use it globally
import NavBar from "./components/NavBar"; // Keep if you use it globally
import BrowseCards from "./components/BrowseCards"; // Adjusted import path if necessary
import { motion } from "framer-motion"; // Keep if you use it
import { userServices } from "./api/userService"; // Your actual API service
import { setApiError, clearApiError } from "./redux/slices/authSlice"; // Redux
import { useDispatch } from "react-redux"; // Redux
import { calculatePoints } from "./utils/mockData"; // Your utility for points calculation
import { Allura } from "next/font/google";
import { useSelector } from "react-redux";
import Link from "next/link";
import { problemServices } from "./api/problemService";

const page = () => {
  // Renamed from 'Page' for clarity
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const loggedInUserRef = useRef(null);
  const verifyUser = async () => {
    const jwt = localStorage.getItem("JWTtoken");
    if (!jwt) {
      return;
    }
    try {
      const response = await userServices.verify(jwt);
      if (response.data) {
        setAuthenticatedUserId(response.data.id);
      }
      dispatch(clearApiError());
    } catch (error) {
      dispatch(setApiError());
    }
  };

  const fetchAndSortUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userServices.get();
      const fetchedUsers = response;
      // Calculate points for all users and then sort
      const usersWithPoints = fetchedUsers.map((user) => ({
        ...user,
        totalPoints: calculatePoints(
          user.solvedCount || { easy: 0, medium: 0, hard: 0 }
        ),
      }));

      // Sort all users by totalPoints in descending order
      const sortedUsers = [...usersWithPoints].sort(
        (a, b) => b.totalPoints - a.totalPoints
      );

      setAllUsers(sortedUsers);
    } catch (err) {
      console.error("Failed to fetch leaderboard users:", err);
      setError("Failed to load leaderboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch and sort users when authenticatedUserId is determined
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAndSortUsers();
      verifyUser();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Function to scroll to the logged-in user's rank
  const scrollToMyRank = () => {
    if (loggedInUserRef.current) {
      loggedInUserRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scroll animation
        block: "center", // Align the element to the center of the viewport
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center md:flex-row flex-col items-center min-h-screen dark:bg-gray-900 dark:text-white text-black gap-2">
        <p>Loading leaderboard...</p>
        <div className="h-12 w-12 rounded-full border-blue-700 border-t-2 border-b-2 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-radial-[at_25%_25%] from-white to-slate-400 to-75% dark:bg-radial-[at_25%_25%] dark:from-slate-500 dark:to-slate-900 dark:to-75% py-8">
      <div className="flex md:flex-row flex-col md:items-center items-start gap-4  mb-20 ml-2">
        {" "}
        {/* Container for title and button */}
        <h1 className="text-4xl font-extrabold text-blue-500 dark:text-blue-300">
          Global Leaderboard
        </h1>
        {isAuthenticated ? ( // Only show button if user is logged in
          <button
            onClick={scrollToMyRank}
            className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md
                       hover:bg-purple-700 transition-colors duration-300
                       dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            Your Rank
          </button>
        ) : (
          <div className="hover:scale-115 ">
            <Link href="/login">
              <span className=" m2 p-2 border-2 rounded-lg shadow-lg dark:shadow-white shadow-black text-blue-500 dark:text-blue-700 cursor-pointer whitespace-nowrap">
                Sign in to compete
              </span>
            </Link>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {" "}
        {/* Use space-y-6 for vertical spacing */}
        {allUsers.length > 0 ? (
          allUsers.map((user, index) => (
            <BrowseCards
              key={user.id}
              user={user}
              index={index}
              // Pass a ref to the specific BrowseCards component for the logged-in user
              ref={user.id === authenticatedUserId ? loggedInUserRef : null}
              // Pass isLoggedInUser prop for highlighting
              isLoggedInUser={user.id === authenticatedUserId}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No users to display.
          </p>
        )}
      </div>
    </div>
  );
};

export default page; // Export as LeaderboardPage
