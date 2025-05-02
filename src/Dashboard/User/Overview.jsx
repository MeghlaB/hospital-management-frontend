import React, { useState, useEffect } from "react";
import axios from "axios";

const Overview = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("https://hospital-server-peach.vercel.app/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    };

    fetchAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) > new Date()
  );

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) <= new Date()
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>

      <h3 className="text-2xl font-medium">Upcoming Appointments</h3>
      {upcomingAppointments.length > 0 ? (
        <ul className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <li key={appointment._id} className="p-4 border rounded-md shadow-sm">
              <p>{appointment.doctorName}</p>
              <p>{new Date(appointment.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments.</p>
      )}

      <h3 className="text-2xl font-medium mt-6">Past Appointments</h3>
      {pastAppointments.length > 0 ? (
        <ul className="space-y-4">
          {pastAppointments.map((appointment) => (
            <li key={appointment._id} className="p-4 border rounded-md shadow-sm">
              <p>{appointment.doctorName}</p>
              <p>{new Date(appointment.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No past appointments.</p>
      )}
    </div>
  );
};

export default Overview;
