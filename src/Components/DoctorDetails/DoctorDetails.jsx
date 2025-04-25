import React from "react";
import { useParams } from "react-router-dom";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function DoctorDetails() {
  const { id } = useParams();
  console.log(id)
  const axiosPublic = UseAxiosPublic();

  const { data: doctor, isLoading, isError, error } = useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/doctors/${id}`);
      console.log(res.status); // যদি 200 না আসে তবে কিছু সমস্যা হতে পারে
console.log(res.data);
      return res.data;
    },
    enabled: !!id, // id না থাকলে fetch করবে না
  });

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-500">Loading doctor details...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto border mt-28 p-6 flex flex-col md:flex-row gap-8 items-start bg-white rounded-xl shadow">
      {/* doctor image */}
      <div className="w-full md:w-1/2">
        <img
          src={doctor?.image}
          alt={doctor?.name}
          className="w-full h-96 object-cover rounded-xl"
        />
      </div>

      {/* doctor info */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{doctor?.name}</h2>
        <p className="text-green-600 font-medium">{doctor?.status}</p>
        <p className="text-gray-600 text-lg">Specialization: {doctor?.specialization}</p>
        <p className="text-gray-600">Experience: {doctor?.experience} years</p>
        <p className="text-gray-600">Location: {doctor?.location}</p>
        <p className="text-gray-600">Fee: ৳{doctor?.fee}</p>

        <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorDetails;
