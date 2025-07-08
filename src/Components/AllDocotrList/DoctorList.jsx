import React, { useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function DoctorList() {
  const axiosPublic = UseAxiosPublic();
  const [selectedSpecialization, setselectedSpecialization] = useState(null);

  const {
    isLoading,
    error,
    isError,
    data: doctors = [],
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosPublic.get("/doctors");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-xs"></span>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching doctors: {error.message}
      </p>
    );
  }

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doctor) => doctor.specialization === selectedSpecialization)
    : doctors;

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Dentist",
    "General Physician",
  ];

  return (
    <div className="mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Doctor List
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Specialization Filter (Left Side) */}
        <div className="lg:col-span-3 space-y-4">
          {specializations.map((spec) => (
            <div
              key={spec}
              onClick={() => setselectedSpecialization(spec)}
              className={`cursor-pointer border px-4 py-2 rounded-xl text-center font-semibold transition ${
                selectedSpecialization === spec
                  ? "bg-green-100 border-green-500 text-green-700"
                  : "border-gray-300 hover:border-green-400 hover:bg-green-50"
              }`}
            >
              {spec}
            </div>
          ))}
        </div>

        {/* Doctor Cards (Right Side) */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.length === 0 ? (
              <p className="col-span-full text-center text-red-500 text-lg font-medium">
                No Doctors Found For{" "}
                <span className="text-green-600 font-semibold">
                  {selectedSpecialization}
                </span>
              </p>
            ) : (
             filteredDoctors.map((doctor) => (
  <div
    key={doctor._id}
    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300"
  >
    <figure className="h-48 md:h-52 overflow-hidden rounded-t-2xl">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </figure>
    <div className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {doctor.name}
        </h2>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full 
          ${doctor.status === 'Available' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'}`}>
          {doctor.status}
        </span>
      </div>
      <p className="text-sm text-gray-500">{doctor.specialization}</p>
      <Link to={`/doctors/${doctor._id}`}>
        <button className="mt-3 w-full bg-[#00786F] text-white text-sm font-medium py-2 rounded-xl hover:bg-[#00665F] transition duration-200">
          View Profile
        </button>
      </Link>
    </div>
  </div>
))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
