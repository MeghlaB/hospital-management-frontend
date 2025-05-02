import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { Link } from "react-router-dom";

function AppointmentList() {
  const axiosPublic = UseAxiosPublic();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    isError,
    data: appointments = [],
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/appoinments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading appointments...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error fetching appointments: {error.message}
      </p>
    );
  }

  const filteredAppointments = selectedSpecialization
    ? appointments.filter(
        (appointment) => appointment.specialization === selectedSpecialization
      )
    : appointments;

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Dentist",
    "General Physician",
  ];

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const res = await axiosPublic.put(`/appointment/${appointmentId}`, {
        status: newStatus,
      });
      console.log("Status updated:", res.data);
      queryClient.invalidateQueries(["appointments"]);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="mt-8 px-4">
      <h1 className="text-xl font-bold mb-4">Appointment List</h1>
      <div className="max-w-7xl mx-auto mt-12">
        <div className="mb-6">
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">-- Select Specialization --</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Doctor</th>
                <th className="border px-4 py-2 text-left">Specialization</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Time</th>
                <th className="border px-4 py-2 text-left">Patient</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-red-500 text-lg font-semibold"
                  >
                    No appointments found for{" "}
                    <span className="text-green-600">
                      {selectedSpecialization}
                    </span>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="border px-4 py-2">{appointment.doctor}</td>
                    <td className="border px-4 py-2">
                      {appointment.specialization}
                    </td>
                    <td className="border px-4 py-2">{appointment.date}</td>
                    <td className="border px-4 py-2">{appointment.time}</td>
                    <td className="border px-4 py-2">{appointment.name}</td>
                    <td className="border px-4 py-2">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <Link to={`/appointments/${appointment._id}`}>
                        <button className="w-full bg-[#00786F] text-white py-2 rounded-xl hover:bg-[#005f57] transition">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
