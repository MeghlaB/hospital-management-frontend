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
      <p className="text-center text-gray-500 mt-10">Loading doctors...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching doctors: {error.message}
      </p>
    );
  }

  // filter doctors based on selected specialization
  const filteredDoctors = selectedSpecialization
    ? doctors.filter(
        (doctor) => doctor.specialization === selectedSpecialization
      )
    : doctors;
  console.log(filteredDoctors);

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Dentist",
    "General Physician",
  ];

  return (
    <div className="mt-8 px-4">
      <h1 className="text-xl font-bold mb-4">Doctor List</h1>
      <div className="max-w-7xl mx-auto  grid  mt-12 grid-cols-12 gap-8">
        {/* Left Side: Specialization Filter */}
        <div className="col-span-3 px-5 pt-5 space-y-4 ">
          {specializations.map((spec) => (
            <div
              key={spec._id}
              onClick={() => setselectedSpecialization(spec)}
              className={`cursor-poiner  border px-5 text-center py-1.5 rounded-2xl ${
                selectedSpecialization === spec
                  ? "bg-green-100  border-green-500 text-green-700 "
                  : " border-gray-300"
              }`}
            >
              <p className="font-bold">{spec}</p>
            </div>
          ))}
        </div>
        {/* Right Side: Doctor Cards */}
        <div className="col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
         
          >
            {filteredDoctors.length === 0 ? (
              <p className="text-center col-span-3 text-red-500 text-lg font-semibold">
                No Doctors Found For{" "}
                <span className="text-green-600">{selectedSpecialization}</span>
              </p>
            ) : (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
               
                >
                  <figure className="h-56 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="p-4 space-y-2">
                    <h2 className="text-sm font-medium text-green-600 flex items-center gap-1">
                      <span className="text-lg font-bold text-green-500">
                        •
                      </span>
                      {doctor.status}
                    </h2>
                    <p className="text-lg font-bold text-gray-800">
                      {doctor.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {doctor.specialization}
                    </p>
                    <Link to={`/doctors/${doctor._id}`}>
                      <button className="mt-3 w-full bg-[#00786F] text-white py-2 rounded-xl hover:bg-[#00786F] transition">
                        Doctor-Details
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
