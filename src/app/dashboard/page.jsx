"use client";
import React, { use, useEffect, useState } from "react";
import UserDetails from "../components/dashboardComponents/UserDetails";
import Calender from "../components/dashboardComponents/Calender";
import { SolvedProblemList } from "../components/dashboardComponents/SolvedProblemList";
import { ThemeProvider } from "../context/ThemeContext";
import { problemServices } from "../api/problemService";
import { userServices } from "../api/userService"; // Assuming you have this
import { setApiError, clearApiError } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  // States for Solved Problem List
  const [solvedProblemList, setSolvedProblemList] = useState([]);
  const [problemError, setProblemError] = useState(false);
  const [problemLoading, setProblemLoading] = useState(true);
  const [problemApiErrorMsg, setProblemApiErrorMsg] = useState("");

  // States for User Data
  const [userError, setUserError] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [userApiErrorMsg, setUserApiErrorMsg] = useState("");
  const [user, setUser] = useState({});
  const [trigger, setTrigger] = useState(0);

  //dashboard states
  const [targetUserDashboardId, setTargetUserDashboardId] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(true);

  const bounce = [0, 1, 2]; // For loading animation
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const fetchProblemData = async () => {
    setProblemError(false);
    setProblemLoading(true);
    const jwt = localStorage.getItem("JWTtoken");
    if (!jwt || !targetUserDashboardId) {
      setProblemError(true);
      setProblemApiErrorMsg(
        "You are logged out, please log in to see problems."
      );
      setProblemLoading(false);
      return;
    }
    try {
      const backendResponse = await problemServices.get(
        targetUserDashboardId,
        jwt
      );
      setSolvedProblemList(backendResponse);
      dispatch(clearApiError());
    } catch (err) {
      setProblemError(true);
      setProblemApiErrorMsg(err.message);
      dispatch(setApiError());
    } finally {
      setProblemLoading(false);
    }
  };

  const fetchUserData = async () => {
    setUserError(false);
    setUserLoading(true);
    const jwt = localStorage.getItem("JWTtoken");

    if (!jwt || !targetUserDashboardId) {
      setUserError(true);
      setUserApiErrorMsg(
        "You are logged out, please log in to see user details."
      );
      setUserLoading(false);
      return;
    }
    try {
      const backendResponse = await userServices.getUser(
        targetUserDashboardId,
        jwt
      );
      setUser(backendResponse);
      dispatch(clearApiError());
    } catch (error) {
      setUserError(true);
      setUserApiErrorMsg(error.message);
      dispatch(setApiError());
    } finally {
      setUserLoading(false);
    }
  };

  const handleRefresh = () => {
    setTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const userIdFromUrl = searchParams.get("userId");
    const userIdFromLocalStorage = localStorage.getItem("userId");
    if (userIdFromUrl === null) {
      setIsLoggedInUser(true);
    } else if (userIdFromUrl !== userIdFromLocalStorage) {
      setIsLoggedInUser(false);
    }
    const determinedId = userIdFromUrl || userIdFromLocalStorage;
    setTargetUserDashboardId(determinedId);
  }, [searchParams]);

  useEffect(() => {
    if (targetUserDashboardId) {
      fetchProblemData();
      fetchUserData();
    } else {
      setProblemError(true);
      setProblemApiErrorMsg("No user ID found to fetch data. Please log in.");
      setProblemLoading(false);
      setUserError(true);
      setUserApiErrorMsg("No user ID found to fetch data. Please log in.");
      setUserLoading(false);
    }
  }, [targetUserDashboardId, trigger]);

  // Determine overall loading and error status for the UI
  const overallLoading = problemLoading || userLoading;
  const overallError = problemError || userError;
  const overallApiErrorMsg = problemApiErrorMsg || userApiErrorMsg; // Or combine them more meaningfully

  return (
    <ThemeProvider>
      <div className="flex flex-col justify-center items-center dark:text-white min-h-screen bg-radial-[at_25%_25%] from-white to-slate-400 to-75% dark:bg-radial-[at_25%_25%] dark:from-slate-500 dark:to-slate-900 dark:to-75%">
        <div className="w-full">
          <UserDetails
            user={user}
            triggerChange={handleRefresh}
            targetUserDashboard={isLoggedInUser}
          />{" "}
          {/* UserDetails will read user from Redux */}
        </div>
        <div className="w-full">
          <Calender
            solvedProblems={solvedProblemList}
            user={user}
            targetUserDashboard={isLoggedInUser}
          />
        </div>
        <div className="w-full">
          {overallLoading ? ( // Use overallLoading
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 flex">
                Fetching your data, please wait
                <span>
                  {bounce.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className="animate-bounce inline-block mx-0.5 text-xl m-1"
                        style={{ animationDelay: `${index * 0.25}s` }}
                      >
                        .
                      </span>
                    );
                  })}
                </span>
              </p>
            </div>
          ) : overallError ? ( // Use overallError
            <div className="text-red-500 text-lg italic m-2 text-center min-h-[200px]">
              {overallApiErrorMsg}
            </div>
          ) : (
            <div className="w-full">
              <SolvedProblemList
                arr={solvedProblemList}
                targetUserDashboard={isLoggedInUser}
                triggerChange={handleRefresh}
              />
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Page;
