import React, { useState } from 'react';

const Appoinment = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    name: '',
    age: '',
    phone: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]); // For logged-in user's previous bookings (dummy)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings(prev => [...prev, formData]);
    setSubmitted(true);
    setFormData({
      doctor: '',
      name: '',
      age: '',
      phone: '',
      date: '',
      time: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-15 from-white to-blue-50 py-16 px-4 md:px-10 text-gray-800 font-[Inter]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">📅 Book an Appointment</h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-8 grid gap-6"
        >
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          >
            <option value="">Select a Doctor</option>
            <option value="Dr. Farzana">Dr. Farzana (Cardiologist)</option>
            <option value="Dr. Kamal">Dr. Kamal (Orthopedic)</option>
            <option value="Dr. Sumiya">Dr. Sumiya (Pediatrician)</option>
          </select>

          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="p-3 border rounded-xl"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
          >
            ✅ Confirm Appointment
          </button>
        </form>

        {/* Success message */}
        {submitted && (
          <div className="mt-6 text-center bg-green-100 text-green-700 p-4 rounded-lg">
            🎉 Appointment booked successfully! You will receive a confirmation email shortly.
          </div>
        )}

        {/* Logged-in user’s previous bookings */}
        {bookings.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4 text-blue-700">🕒 Your Previous Bookings</h3>
            <div className="space-y-3">
              {bookings.map((booking, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-md border border-blue-100">
                  <p><strong>Doctor:</strong> {booking.doctor}</p>
                  <p><strong>Name:</strong> {booking.name}</p>
                  <p><strong>Age:</strong> {booking.age}</p>
                  <p><strong>Phone:</strong> {booking.phone}</p>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appoinment;

