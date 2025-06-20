"use client";
import React, { useState, useEffect } from "react"; // Added useEffect for localStorage access
import MyButton from "../MyButton";
// import AddQuestionForm from "./AddQuestionForm"; // Not used in this component, removed for clarity
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa"; // Import for default profile picture
import EditUserForm from "./EditUserForm";

const UserDetails = ({ user, triggerChange, targetUserDashboard }) => {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const apiError = useSelector((state) => state.auth.apiError);

  // State to hold the authenticated user's ID from localStorage
  const [editModal, setEditModal] = useState(false);

  const handleEditUser = async () => {};

  const toggleModal = () => {
    setEditModal((prev) => !prev);
  };

  const isViewingOwnProfile = targetUserDashboard;

  const error = !isAuthenticated || apiError;
  console.log("same viewer: ", isViewingOwnProfile, "error is: ", error);
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
                {user?.username ? (
                  <h2 className="text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
                    {user?.username}
                  </h2>
                ) : (
                  <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse m-2"></div>
                )}
                {user?.email ? (
                  <h2 className="text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
                    {user?.email}
                  </h2>
                ) : (
                  <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse m-2"></div>
                )}
              </div>
              <div className="flex flex-col  text-lg text-gray-300">
                <span className="font-semibold text-blue-600 whitespace-nowrap">
                  Joined on:
                </span>
                <span className="text-blue-600 whitespace-nowrap">
                  {user?.createdOn ? (
                    new Date(user.createdOn).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  ) : (
                    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse m-2"></div>
                  )}
                </span>
                {error && (
                  <p className="text-red-500 italic text-sm">
                    Please login to see these details.
                  </p>
                )}
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
          {user?.username ? (
            <h2 className="text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
              {user?.username}
            </h2>
          ) : (
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse m-2"></div>
          )}
          {user?.email ? (
            <h2 className="text-2xl font-bold text-blue-600 mb-1 whitespace-nowrap">
              {user?.email}
            </h2>
          ) : (
            <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse m-2"></div>
          )}

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
          {error && (
            <p className="text-red-500 italic text-sm">
              Please login to see these details.
            </p>
          )}
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
