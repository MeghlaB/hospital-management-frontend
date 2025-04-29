import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Replace with your API endpoint if needed
    fetch('/testimonials.json') // assuming placed in public folder
      .then(res => res.json())
      .then(data => setTestimonials(data));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-orange-300 to-orange-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">What Our Patients Say</h2>
        <p className="text-gray-600 mt-2">Real stories from satisfied patients</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-10">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 mx-auto rounded-full mb-4"
            />
            <p className="italic text-gray-700 mb-3">"{item.message}"</p>
            <h4 className="font-semibold text-lg text-blue-600">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
