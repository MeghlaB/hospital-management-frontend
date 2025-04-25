import React from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function DoctorList() {
  const axiosPublic = UseAxiosPublic();

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

  return (
    <div className="mt-8 px-4">
      <h1 className="text-xl font-bold mb-4">Doctor List</h1>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-5 mt-12">
        {doctors.map((doctor) => (
          <div className="card bg-base-100 w-56  shadow-sm">
            <figure>
              <img
                src={doctor.image}
                className="w-full object-cover"
                alt={doctor.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="">
              
                <div className="text-green-600"><span  className="font-extrabold">.</span>{doctor.status}</div>
              </h2>
              <p className="text-xl font-semibold">
                {doctor.name}
              </p>
              <p className="text-gray-500">
                {doctor. specialization}
              </p>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
