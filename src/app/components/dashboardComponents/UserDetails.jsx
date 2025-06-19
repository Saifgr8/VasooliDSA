"use client";
import React, { useState, useEffect } from "react"; // Added useEffect for localStorage access
import MyButton from "../MyButton";
// import AddQuestionForm from "./AddQuestionForm"; // Not used in this component, removed for clarity
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa"; // Import for default profile picture
import EditUserForm from "./EditUserForm";

const UserDetails = ({ user, triggerChange }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const apiError = useSelector((state) => state.auth.apiError);

  // State to hold the authenticated user's ID from localStorage
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);
  const [editModal, setEditModal] = useState(false);

  const handleEditUser = async () => {};

  const toggleModal = () => {
    setEditModal((prev) => !prev);
  };
  console.log(editModal);
  // Use useEffect to access localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthenticatedUserId(localStorage.getItem("userId"));
    }
  }, []);

  const isViewingOwnProfile =
    authenticatedUserId && user?.id === authenticatedUserId;
  console.log("isvering : ,", isViewingOwnProfile);

  return (
    <div className="w-full flex justify-center items-center">
      {" "}
      {/* Increased padding for overall spacing */}
      <div
        className={`bg-transparent rounded-2xl shadow-lg dark:shadow-2xl overflow-hidden text-white ${
          isViewingOwnProfile ? "lg:w-1/2 w-2/3" : ""
        }flex justify-between items-center `}
      >
        {" "}
        {/* Card-like background */}
        {/* Desktop Layout (md and up) */}
        <div
          className={`hidden md:flex flex-col md:flex-row justify-evenly items-center py-6 px-8 gap-6  w-full`}
        >
          {" "}
          {/* Horizontal layout on desktop */}
          {/* Profile Picture and Name/Email */}
          <div className="flex items-center gap-4 ">
            {user?.profilePicUrl ? (
              <img
                src={user?.profilePicUrl}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md dark:text-white text-black"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 text-gray-400 dark:text-gray-300" />
            )}
            <div className="flex flex-col text-left justify-start items-start">
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                  {user?.username || "N/A"}
                </h2>
                <p className="text-blue-600  text-base">
                  {user?.email || "N/A"}
                </p>
              </div>
              <div className="flex flex-col  text-lg text-gray-300">
                <span className="font-semibold text-blue-600 whitespace-nowrap">
                  Joined on:
                </span>
                <span className="text-blue-600 whitespace-nowrap">
                  {user?.createdOn
                    ? new Date(user.createdOn).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
          {/* Joined On */}
          <div className="flex justify-center items-end flex-col">
            {/* Edit Profile Button (Conditional) */}
            <div className="flex-shrink-0">
              {isAuthenticated && !apiError && isViewingOwnProfile && (
                <MyButton
                  onClick={toggleModal}
                  text={"Edit Profile"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile Layout (hidden on md and up) */}
        <div className="md:hidden flex flex-col items-center text-center py-6 px-8 ">
          {user?.profilePicUrl ? (
            <img
              src={user?.profilePicUrl}
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md mb-4"
            />
          ) : (
            <FaUserCircle className="w-20 h-20 text-gray-400 dark:text-gray-300 mb-4" />
          )}
          <h2 className="text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
            {user?.username || "N/A"}
          </h2>
          <p className="text-blue-600 text-base mb-2">{user?.email || "N/A"}</p>

          <div className="text-lg text-gray-300 mb-4">
            <span className="font-semibold text-blue-600">Joined on: </span>
            <span className="text-blue-600">
              {user?.createdOn
                ? new Date(user.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </span>
          </div>

          {isAuthenticated && !apiError && isViewingOwnProfile && (
            <MyButton
              onClick={toggleModal}
              text={"Edit Profile"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
            />
          )}
        </div>
      </div>
      {editModal && (
        <EditUserForm
          user={user}
          triggerChange={triggerChange}
          onClose={toggleModal}
        />
      )}
    </div>
  );
};

export default UserDetails;
