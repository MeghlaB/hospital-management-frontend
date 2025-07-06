import React, { useState } from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function MyAppointments() {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const [filter, setFilter] = useState('all');

  const { data: appointments = [], isLoading, refetch } = useQuery({
    queryKey: [user?.email, 'appointments'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/appoinments/${user?.email}`);

      
      if (Array.isArray(res.data)) {
        return res.data;
      } else {
        console.error("Appointments data is not an array!", res.data);
        return [];
      }
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
        await axiosPublic.patch(`/appointments/cancel/${id}`, {
          status: 'canceled'
        });
        Swal.fire('Canceled!', 'Your appointment has been canceled.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  const filteredAppointments = appointments.filter((appointment) => {
    const today = new Date();
    const appDate = appointment?.date ? new Date(appointment.date) : null;

    if (filter === 'upcoming') {
      // ভবিষ্যতের ডেট দেখাও, যা এখন থেকে বড়
      return appDate && appDate >= today && appointment.status !== 'canceled';
    } else if (filter === 'Confirmed') {
      // ক্যাপিটাল কেস 'Confirmed' হলে তা ইউজ করো, অথবা ডাটাবেস অনুযায়ী ছোট হাতেও হতে পারে
      return appointment.status?.toLowerCase() === 'confirmed';
    } else if (filter === 'canceled') {
      return appointment.status?.toLowerCase() === 'canceled';
    }
    return true; // all appointments
  });

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Appointments</h2>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg shadow-md transition ${filter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-lg shadow-md transition ${filter === 'upcoming' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('Confirmed')}
          className={`px-4 py-2 rounded-lg shadow-md transition ${filter === 'Confirmed' ? 'bg-green-700 text-white' : 'bg-green-100 text-green-700'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('canceled')}
          className={`px-4 py-2 rounded-lg shadow-md transition ${filter === 'canceled' ? 'bg-red-700 text-white' : 'bg-red-100 text-red-700'}`}
        >
          Canceled
        </button>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Doctor</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No appointments found for "{filter}" filter.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{appointment?.doctor || 'N/A'}</td>
                  <td className="px-4 py-2">{appointment?.date || 'N/A'}</td>
                  <td className="px-4 py-2">{appointment?.time || 'N/A'}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        appointment?.status?.toLowerCase() === 'completed'
                          ? 'bg-green-200 text-green-700'
                          : appointment?.status?.toLowerCase() === 'canceled'
                          ? 'bg-red-200 text-red-700'
                          : 'bg-blue-200 text-blue-700'
                      }`}
                    >
                      {appointment?.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex space-x-2">
                    {appointment?.status?.toLowerCase() === 'canceled' ? (
                      <button disabled className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                        Canceled
                      </button>
                    ) : appointment?.status?.toLowerCase() === 'confirmed' ? (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Completed
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCancel(appointment._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => Swal.fire('Coming Soon!', 'Rescheduling feature is coming soon!', 'info')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                    >
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppointments;
