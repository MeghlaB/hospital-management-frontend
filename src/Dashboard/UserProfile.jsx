import React, { useEffect, useState } from "react";

import UseAxiosPublic from "../Hooks/UseAxiosPublic";
import { Link } from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

export default function UserProfile() {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/profile/${user.email}`)
        .then((res) => setProfileData(res.data))
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, [user?.email]);

  if (!profileData) {
    return (
      <div className="text-center py-10 text-red-900 font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-10 rounded-lg shadow-lg mt-10">
      {/* Avatar */}
      <div className="w-36 h-36 mx-auto mt-5 mb-6">
        <img
          src={profileData?.photo}
          className="w-36 h-36 rounded-full border-4 border-teal-700 shadow-lg"
          alt="User Avatar"
        />
      </div>

      {/* Profile Info */}
      <div className="px-6">
        <h1 className="text-xl font-semibold mb-3 text-center text-teal-700">
          <strong>Name:</strong> {profileData.name}
        </h1>
        <h2 className="text-lg mb-3">
          <strong>Email:</strong> {`${profileData.email}`}
        </h2>
        <h2 className="text-lg mb-3">
          <strong>Status:</strong> {profileData.status}
        </h2>
        <h2 className="text-lg mb-3">
          <strong>Role:</strong> {profileData.role}
        </h2>
        {/* <h2 className="text-lg mb-6">
          <strong>Role:</strong> {profileData.role}
        </h2> */}

        {/* Edit Button */}
        <Link to={`update/${profileData._id}`}>
          <button className="w-full py-2 bg-teal-900 text-white rounded-lg hover:bg-teal-700 transition duration-300">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
}
