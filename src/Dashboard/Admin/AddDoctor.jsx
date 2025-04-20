import React from "react";
import { useForm } from "react-hook-form";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const AddDoctorForm = () => {

  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Doctor Data:", data);
    
    const doctorinfo = {
      name: data?.name,
      email: data?.email,
      gender: data?.gender,
      phone: data?.phone,
      specialization: data?.specialization,
      time: data?.time,
      image: data?.image[0].name,
    };
    console.log(doctorinfo);
    axiosPublic.post("/add-doctor", doctorinfo).then((res) => {
      console.log(res.data);
      reset()
      if (res.data.insertedId) {
        Swal.fire({
          title: "Doctor Added SuccessFully",
          icon: "success",
          draggable: true,
        });
        navigate('/doctor-list')

      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add Doctor
      </h2>

      <div className="">
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

          {/* Phone Number */}
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
              {...register("time", { required: "Available time is required" })}
              className="input input-bordered w-full"
              placeholder="e.g., 10:00 AM - 1:00 PM"
            />
            {errors.time && (
              <p className="text-red-500 text-sm">{errors.time.message}</p>
            )}
          </div>
          {/* Short Bio */}
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
    </div>
  );
};

export default AddDoctorForm;
