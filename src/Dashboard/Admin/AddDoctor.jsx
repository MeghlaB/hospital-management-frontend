import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMAGEHOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddDoctorForm = () => {
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // ImageBB Hosting
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Image upload request
      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.data.success) {
        const photoURL = res.data.data.display_url;

        // Doctor information object
        const doctorinfo = {
          name: data?.name,
          email: data?.email,
          gender: data?.gender,
          phone: data?.phone,
          specialization: data?.specialization,
          time: data?.time,
          appoinmetfee: data?.fee,
          image: photoURL,
          status: "available",
          bio: data?.bio,
          location:data?.location
        };
        console.log(doctorinfo);

      
        const doctorResponse = await axiosPublic.post(
          "/add-doctor",
          doctorinfo
        );

        if (doctorResponse.data.insertedId) {
          reset();
          Swal.fire({
            title: "Doctor Added Successfully",
            icon: "success",
            draggable: true,
          });
          navigate("/doctor-list");
        }
      }
    } catch (error) {
      console.error("Error uploading image or adding doctor:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while adding the doctor. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add Doctor
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-2 gap-3"
      >
        {/* Full Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            {...register("name", { required: "Full name is required" })}
            className="input input-bordered w-full"
            placeholder="Dr. John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input input-bordered w-full"
            placeholder="doctor@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            {...register("phone", { required: "Phone number is required" })}
            className="input input-bordered w-full"
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* Specialization */}
        <div>
          <label className="block font-semibold mb-1">Specialization</label>
          <select
            {...register("specialization", {
              required: "Specialization is required",
            })}
            className="select select-bordered w-full"
          >
            <option value="">-- Select Specialization --</option>
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
            <p className="text-red-500 text-sm">
              {errors.specialization.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold mb-1">Gender</label>
          <select
            {...register("gender", { required: "Please select gender" })}
            className="select select-bordered w-full"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>
        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
            placeholder="location here..."
          />
          {errors.location && (
            <p className="text-red-500 text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block font-semibold mb-1">Profile Image</label>
          <input
            type="file"
            {...register("image", { required: "Profile image is required" })}
            className="file-input file-input-bordered w-full"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Available Time */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Available Time</label>
          <input
            type="date"
            {...register("time", { required: "Available time is required" })}
            className="input input-bordered w-full"
            placeholder="e.g., 10:00 AM - 1:00 PM"
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>

        {/* Fee */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Appointment Fee</label>
          <textarea
            {...register("fee", { required: "Appointment fee is required" })}
            className="input input-bordered w-full"
            placeholder="Doctor appointment fee..."
          />
          {errors.fee && (
            <p className="text-red-500 text-sm">{errors.fee.message}</p>
          )}
        </div>

        {/* Short Bio */}
        <div className="col-span-2">
          <label className="block font-semibold mb-1">Short Bio</label>
          <textarea
            {...register("bio", { required: "Short bio is required" })}
            className="textarea textarea-bordered w-full"
            placeholder="Write a short bio about the doctor..."
            rows={4}
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
