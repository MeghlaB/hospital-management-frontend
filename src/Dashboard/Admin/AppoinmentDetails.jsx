import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSequire from '../../Hooks/UseAxiosSequir';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

function AppointmentDetails() {
  const { id } = useParams();
  const axiosSequire = useAxiosSequire();
  const queryClient = useQueryClient();


  const { data: appointment, isLoading, error } = useQuery({
    queryKey: ['appointment', id],
    queryFn: async () => {
      const res = await axiosSequire.get(`/appointments/${id}`);
      return res.data;
    },
  });


  const confirmMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSequire.put(`/appointment/${id}`, { status: 'confirmed' });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Appointment confirmed successfully!");
      queryClient.invalidateQueries(['appointment', id]); // Refetch updated data
    },
    onError: () => {
      toast.error("Failed to confirm appointment.");
    },
  });

  const handleConfirm = () => {
    confirmMutation.mutate();
  };

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error loading data.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
  
      <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-[#00786F] mb-4">Appointment Details</h2>

        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Patient Name:</span> {appointment.patientName}</p>
          <p><span className="font-medium">Doctor:</span> {appointment.doctorName}</p>
          <p><span className="font-medium">Date:</span> {appointment.date}</p>
          <p><span className="font-medium">Time:</span> {appointment.time}</p>
          <p><span className="font-medium">Service:</span> {appointment.service}</p>
          <p>
            <span className="font-medium">Status:</span>{' '}
            <span className={`uppercase font-semibold ${
              appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {appointment.status}
            </span>
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleConfirm}
            disabled={appointment.status === 'confirmed'}
            className={`w-full ${
              appointment.status === 'confirmed' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00786F] hover:bg-[#005f57]'
            } text-white py-2 rounded-xl transition`}
          >
            {appointment.status === 'confirmed' ? 'Already Confirmed' : 'Confirm Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;
