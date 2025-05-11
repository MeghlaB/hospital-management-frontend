import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

function DoctorDetails() {
  const { id } = useParams();
  const axiosPublic = UseAxiosPublic();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    isError,
    isLoading,
    data: doctor = {},
  } = useQuery({
    queryKey: ["doctors", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/doctors/${id}`);
      return res.data[0];
    },
    enabled: !!id,
  });


  const generateNext7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formatted = format(date, "EEE d"); // Example: "Mon 5"
      days.push(formatted.toUpperCase());
    }

    return days;
  };

  const dates = generateNext7Days();

  // 👉 Use doctor's availableTimes or fallback to defaults
  const times = doctor?.availableTimes || [
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 pm",
    "12:30 pm",
    "01:00 pm",
    "01:30 pm",
  ];

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading doctor details...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Something went wrong while fetching the doctor details!
      </p>
    );
  }

  if (!doctor || Object.keys(doctor).length === 0) {
    return <p className="text-center mt-10 text-red-500">Doctor not found!</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-28 p-4 md:p-8 flex flex-col md:flex-row gap-8">
      {/* Doctor Image */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={doctor?.image}
          alt={doctor?.name}
          className="w-64 h-80 object-cover rounded-2xl border-4 border-blue-100 shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Doctor Details */}
      <div className="w-full md:w-2/3 space-y-6">
        <div className="border rounded-xl p-6 shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            👨‍⚕️ {doctor?.name}
          </h2>
          <p className="text-sm text-gray-400 italic">Your trusted healthcare partner</p>
          <p className="text-gray-600 mt-2">
            {doctor?.degree} - {doctor?.specialization}
          </p>
          <p className="mt-4 text-gray-700">{doctor?.bio}</p>

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Appointment Fee:{" "}
            <span className="text-xl font-bold text-green-600">
              ${doctor?.appoinmetfee}
            </span>
          </p>
        </div>

        {/* Booking slots */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Booking slots</h3>

          {/* Dates */}
          <div className="flex flex-wrap gap-2 mb-6">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-3 rounded-full border transition-all duration-300 ${
                  selectedDate === date
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* Times */}
          <div className="flex flex-wrap gap-2">
            {times.map((time, index) => (
              <button
                key={index}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded-full border transition-all duration-300 ${
                  selectedTime === time
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Book Appointment Button */}
          <div className="mt-8">
            <Link
              to={"/doctor-appointment-booking"}
              state={{
                doctorId: id,
                doctorName: doctor?.name,
                fee: doctor?.appoinmetfee,
                selectedDate,
                selectedTime,
              }}
            >
              <button
                disabled={!selectedDate || !selectedTime}
                className={`w-full md:w-auto font-semibold px-8 py-3 rounded-full transition ${
                  selectedDate && selectedTime
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Book an appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
