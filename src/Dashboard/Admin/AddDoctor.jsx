import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUpload, FiArrowLeft } from "react-icons/fi";

const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddDoctorForm = () => {
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Image upload
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const doctorInfo = {
          name: data.name,
          email: data.email,
          gender: data.gender,
          phone: data.phone,
          specialization: data.specialization,
          time: data.time,
          appoinmetfee: data.fee,
          image: res.data.data.display_url,
          status: "available",
          bio: data.bio,
          location: data.location
        };

        const doctorResponse = await axiosPublic.post("/add-doctor", doctorInfo);

        if (doctorResponse.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            title: "Doctor Added Successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            backdrop: false
          });
          navigate("/doctor-list");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to add doctor",
        icon: "error",
        confirmButtonColor: "#00786F",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Form Header with Back Button */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white relative">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-6 top-6 flex items-center text-black hover:text-gray-200 transition-colors"
          >
            <FiArrowLeft className="mr-1" />
            Back
          </button>
          <div className="text-center pt-2">
            <h2 className="text-2xl font-bold">Add New Doctor</h2>
            <p className="text-teal-200">Fill in the details to register a new doctor</p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Information</h3>
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  {...register("name", { required: "Full name is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Dr. John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="doctor@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                <input
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="01XXXXXXXXX"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
                )}
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Information</h3>
              
              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization*</label>
                <select
                  {...register("specialization", { required: "Specialization is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.specialization ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Specialization</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Psychiatrist">Psychiatrist</option>
                  <option value="General Physician">General Physician</option>
                </select>
                {errors.specialization && (
                  <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input
                  type="text"
                  {...register("location", { required: "Location is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Hospital or clinic address"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              {/* Appointment Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Fee*</label>
                <input
                  type="number"
                  {...register("fee", { required: "Fee is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.fee ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter fee amount"
                />
                {errors.fee && (
                  <p className="mt-1 text-sm text-red-600">{errors.fee.message}</p>
                )}
              </div>

              {/* Available Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Time*</label>
                <input
                  type="date"
                  {...register("time", { required: "Available time is required" })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Profile Image</h3>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  {...register("image", { required: "Profile image is required" })}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Professional Bio</h3>
            <div>
              <textarea
                {...register("bio", { required: "Bio is required", minLength: 30 })}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
                rows={4}
                placeholder="Brief professional background, qualifications, and experience..."
              />
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.bio.type === "minLength" 
                    ? "Bio must be at least 30 characters" 
                    : errors.bio.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg text-white font-medium ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700"
              } transition-colors`}
            >
              {isSubmitting ? "Adding Doctor..." : "Add Doctor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;