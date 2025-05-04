import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import UseAuth from "../../Hooks/UseAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Appoinment = () => {
  const { user } = UseAuth();
  const axiosPublic = UseAxiosPublic();
  const location = useLocation();
  const { selectedDate, selectedTime, doctor } = location.state || {};

  const [doctors, setDoctors] = useState([]);
  const [quickBookingDate, setQuickBookingDate] = useState(""); // Quick booking date
  const [quickBookingTime, setQuickBookingTime] = useState(""); // Quick booking time

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get("/doctors");
      setDoctors(res.data);
    };
    fetchData();
  }, [axiosPublic]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  
  } = useForm();

  const onSubmit = async (data) => {
    const bookingInfo = {
      ...data,
      email: user.email,
      date: selectedDate || quickBookingDate, 
      time: selectedTime || quickBookingTime, 
      doctorId: doctor?._id,
      doctorName: doctor?.name,
      status: "pending",
    };

    try {
      const res = await axiosPublic.post("/appoinments", bookingInfo);
      // console.log(res.data)
      reset()
      if (res.data.insertedId) {
        Swal.fire({
          title: "Appointment Booked Successfully",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.log("Error submitting appointment:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-white to-blue-50 py-10 px-4 md:px-10 text-gray-800 font-[Inter]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-700 mb-10">
          📅 Book an Appointment
        </h2>

        {/* Quick Booking Option */}
        <div className="mb-6 text-center">
          <button
            onClick={() => {
              // Set quick booking date and time
              setQuickBookingDate("2025-05-15");
              setQuickBookingTime("10:00");
            }}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Quick Book for May 15, 2025, at 10:00 AM
          </button>
        </div>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Patient Name */}
          <div>
            <label className="block font-medium">Patient Name*</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium">Age*</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: { value: 0, message: "Invalid age" },
              })}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
              placeholder="Enter age"
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium">Phone Number*</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Enter a valid 11-digit phone number",
                },
              })}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">{errors.phone.message}</span>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium">Appointment Date*</label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              defaultValue={selectedDate || quickBookingDate}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
            />
            {errors.date && (
              <span className="text-red-500 text-sm">{errors.date.message}</span>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium">Time*</label>
            <input
              type="time"
              {...register("time", { required: "Time is required" })}
              defaultValue={selectedTime || quickBookingTime}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
            />
            {errors.time && (
              <span className="text-red-500 text-sm">{errors.time.message}</span>
            )}
          </div>

          {/* Doctor */}
          <div>
            <label className="block font-medium">Select Doctor*</label>
            <select
              {...register("doctor", { required: "Please select a doctor" })}
              className="w-full border rounded px-3 py-2 focus:text-teal-600"
            >
              {doctors.map((doc) => (
                <option key={doc._id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
            {errors.doctor && (
              <span className="text-red-500 text-sm">{errors.doctor.message}</span>
            )}
          </div>

          <input
            type="submit"
            value="Book Appointment"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default Appoinment;
