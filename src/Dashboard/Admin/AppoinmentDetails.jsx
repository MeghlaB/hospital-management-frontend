import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useAxiosSequire from '../../Hooks/UseAxiosSequir';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

function AppointmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      queryClient.invalidateQueries(['appointment', id]);
    },
    onError: () => {
      toast.error("Failed to confirm appointment.");
    },
  });

  const handleConfirm = () => {
    confirmMutation.mutate();
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  if (error) return (
    <div className="alert alert-error shadow-lg max-w-2xl mx-auto mt-8">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading appointment details.</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      {/* Back button and header */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-4 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Appointments
        </button>
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Appointment Details</h2>
        <p className="text-gray-600 mt-1">ID: {id}</p>
      </div>

      {/* Appointment card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        {/* Header with status */}
        <div className={`px-6 py-4 ${
          appointment.status === 'confirmed' ? 'bg-green-50 border-b border-green-100' : 
          appointment.status === 'pending' ? 'bg-yellow-50 border-b border-yellow-100' : 
          'bg-gray-50 border-b border-gray-100'
        }`}>
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium uppercase ${
              appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'
            }">
              {appointment.status}
            </span>
            <span className="text-sm text-gray-500">{appointment.date} at {appointment.time}</span>
          </div>
        </div>

        {/* Appointment details */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Patient information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Patient Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Name:</span> {appointment.name}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Contact:</span> {appointment.phone || 'N/A'}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Email:</span> {appointment.patientEmail || 'N/A'}
                </p>
              </div>
            </div>

            {/* Doctor information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Doctor Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium text-gray-700">Name:</span> {appointment.doctor}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Specialization:</span> {appointment.specialization || 'N/A'}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Service:</span> {appointment.service}
                </p>
              </div>
            </div>
          </div>

          {/* Additional notes */}
          {appointment.notes && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Notes</h3>
              <p className="mt-2 text-gray-700">{appointment.notes}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleConfirm}
              disabled={appointment.status === 'confirmed' || confirmMutation.isLoading}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                appointment.status === 'confirmed' 
                  ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                  : confirmMutation.isLoading
                    ? 'bg-primary-400 text-white cursor-wait'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {confirmMutation.isLoading ? (
                'Confirming...'
              ) : appointment.status === 'confirmed' ? (
                'Appointment Confirmed'
              ) : (
                'Confirm Appointment'
              )}
            </button>

            <Link 
              to={`/appointments/edit/${id}`} 
              className="flex-1 py-3 px-4 border border-gray-300 hover:border-gray-400 rounded-lg font-medium text-gray-700 hover:bg-gray-50 text-center transition-colors"
            >
              Edit Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetails;