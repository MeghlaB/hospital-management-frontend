import React from 'react';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import UseAuth from '../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function MyAppoinment() {
  const axiosPublic = UseAxiosPublic();
  const { user } = UseAuth();

  const { data: appointments = [], isLoading, refetch } = useQuery({
    queryKey: [user?.email, 'appointments'],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/appoinments/${user?.email}`);
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
        await axiosPublic.delete(`/appoinments/${id}`);
        Swal.fire('Canceled!', 'Your appointment has been canceled.', 'success');
        refetch(); // Refresh appointment list
      } catch (error) {
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        My Appointments ({appointments.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              appointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={appointment?.photo}
                      alt="user"
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{appointment?.name}</td>
                  <td>{appointment?.email}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleCancel(appointment._id)}
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => Swal.fire('Coming Soon!', 'Rescheduling feature is coming soon!', 'info')}
                      className="btn btn-sm bg-yellow-400 text-white"
                    >
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAppoinment;
