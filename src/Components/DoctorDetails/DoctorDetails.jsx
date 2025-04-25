import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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

  const dates = ["SAT 26", "SUN 27", "MON 28", "TUE 29", "WED 30", "THU 1", "FRI 2"];
  const times = ["10:00 am", "10:30 am", "11:00 am", "11:30 am", "12:00 pm", "12:30 pm", "01:00 pm", "01:30 pm"];

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading doctor details...
      </p>
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
          className="w-64 h-80 object-cover rounded-2xl bg-blue-500 p-2"
        />
      </div>

      {/* Doctor Details */}
      <div className="w-full md:w-2/3 space-y-6">
        <div className="border rounded-xl p-6 shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {doctor?.name}
            <span className="text-blue-500">✔️</span>
          </h2>
          <p className="text-gray-600 mt-2">{doctor?.degree} - {doctor?.specialization}</p>
          <p className="mt-4 text-gray-700">
            {doctor?.bio }
          </p>

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Appointment fee: <span className="text-black">${doctor?.fee}</span>
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
                className={`px-4 py-3 rounded-full border ${
                  selectedDate === date ? "bg-blue-600 text-white" : "text-gray-700"
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
                className={`px-4 py-2 rounded-full border ${
                  selectedTime === time ? "bg-blue-600 text-white" : "text-gray-700"
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {/* Book Appointment Button */}
          <div className="mt-8">
            <button
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition"
              disabled={!selectedDate || !selectedTime}
            >
              Book an appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
