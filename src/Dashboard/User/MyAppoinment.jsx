import React, { useState } from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function MyAppointments() {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();

  const [filter, setFilter] = useState('upcoming');

  const { data: appointments = [], isLoading, refetch } = useQuery({
    queryKey: [user?.email, 'appointments'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/appointments/${user?.email}`);
      return res.data;
    }
  });

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this appointment?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!'
    });

    if (confirm.isConfirmed) {
      try {
        await axiosPublic.delete(`/appointments/${id}`);
        Swal.fire('Canceled!', 'Your appointment has been canceled.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === 'upcoming') {
      return new Date(appointment.date) > new Date();
    } else if (filter === 'completed') {
      return new Date(appointment.date) < new Date() && appointment.status === 'completed';
    } else if (filter === 'canceled') {
      return appointment.status === 'canceled';
    }
    return true;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Appointments</h2>

      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilter('upcoming')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('completed')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('canceled')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
        >
          Canceled
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">#</th>
              <th className="px-4 py-2 text-left text-gray-600">Doctor</th>
              <th className="px-4 py-2 text-left text-gray-600">Date</th>
              <th className="px-4 py-2 text-left text-gray-600">Time</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={appointment._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{appointment?.doctorName}</td>
                <td className="px-4 py-2">{appointment?.date}</td>
                <td className="px-4 py-2">{appointment?.time}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      appointment?.status === 'completed'
                        ? 'bg-green-200 text-green-600'
                        : appointment?.status === 'canceled'
                        ? 'bg-red-200 text-red-600'
                        : 'bg-blue-200 text-blue-600'
                    }`}
                  >
                    {appointment?.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleCancel(appointment._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => Swal.fire('Coming Soon!', 'Rescheduling feature is coming soon!', 'info')}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                  >
                    Reschedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppointments;
