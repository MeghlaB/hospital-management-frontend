
import React, { useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

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
        <div className="col-span-9 boder">
          <div className=" grid grid-cols-3 gap-5 ">
            {filteredDoctors.length === 0 ? (
              <p className="text-center col-span-3 text-red-500">
                {" "}
                No Doctors Found For {selectedSpecialization}
              </p>
            ) : (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="card bg-base-100 w-56 shadow-sm"
                >
                  <figure>
                    <img
                      src={doctor.image}
                      className="w-full object-cover bg-[#EAEFFF]"
                      alt={doctor.name}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-green-600">
                      <span className="font-extrabold">.</span>
                      {doctor.status}
                    </h2>
                    <p className="text-xl font-semibold">{doctor.name}</p>
                    <p className="text-gray-500">{doctor.specialization}</p>
                  </div>
                </div>
              )))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DoctorList;
