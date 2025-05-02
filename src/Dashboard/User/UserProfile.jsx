import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaDownload, FaGlobe, FaMapMarkerAlt, FaMobileAlt, FaSlidersH } from "react-icons/fa";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2"; // Import SweetAlert2
import UseAuth from "../../Hooks/UseAuth";

// ImageBB API URL and key
const imageBBApiKey = import.meta.env.VITE_IMAGEHOSTING;
const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;

const UserProfile = () => {
  const { user } = UseAuth(); // user from UseAuth hook
  const axiosPublic = UseAxiosPublic();

  // Managing edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // For saving state
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    status: "",
    photo: "",
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview before uploading

  const {
    data: fetchedUser, // Renaming 'user' from useQuery to 'fetchedUser'
    isLoading,
    isError,
    refetch, // Get refetch function to refresh the data
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data[0]; // Assuming we want to work with the first user
    },
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setUpdatedUser({
        name: fetchedUser.name,
        email: fetchedUser.email,
        status: fetchedUser.status,
        photo: fetchedUser.photo,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Show image preview
      setImagePreview(URL.createObjectURL(file));

      // Upload image to ImageBB
      const formData = new FormData();
      formData.append("image", file);

      fetch(`${imageBBUrl}?key=${imageBBApiKey}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setUpdatedUser({ ...updatedUser, photo: data.data.url });
          } else {
            console.error("Image upload failed:", data.error);
          }
        })
        .catch((error) => console.error("Error uploading image:", error));
    }
  };

  const handleSave = async () => {
    setIsSaving(true); // Start saving
    try {
      // Make API call to save updated user data
      const response = await axiosPublic.put(`/users/${user?._id}`, updatedUser);

      // Check for successful response (this depends on your backend's response format)
      if (response.status === 200) {
        // Use SweetAlert2 for success alert
        Swal.fire({
          icon: 'success',
          title: 'Profile Updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        setIsEditing(false);

        // Refetch the user data to update the profile UI with the new data
        refetch();
      } else {
        console.error("Error saving profile:", response.data);
        // Use SweetAlert2 for failure alert
        Swal.fire({
          icon: 'error',
          title: 'Failed to update profile',
          text: 'Please try again later.',
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      // Use SweetAlert2 for error alert
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'Please try again later.',
      });
    } finally {
      setIsSaving(false); // Stop saving (enable button)
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError || !fetchedUser) {
    return <div className="text-center mt-10 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">My Profile</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <FaSlidersH />
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <img
            src={imagePreview || fetchedUser.photo || "https://i.ibb.co/4f6Yy3X/default-avatar.jpg"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border">
            <FaMobileAlt className="text-gray-600 text-sm" />
          </div>
        </div>
        {isEditing ? (
          <div className="w-full mt-3">
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              disabled
            />
            <input
              type="text"
              name="status"
              value={updatedUser.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="file"
              name="photo"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mt-4 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        ) : (
          <>
            <h3 className="mt-3 text-xl font-bold">{fetchedUser.name}</h3>
            <p className="text-sm text-gray-500">{fetchedUser.email}</p>
            <p className="text-sm text-gray-500">{fetchedUser.status}</p>
            <button
              onClick={handleEditClick}
              className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
