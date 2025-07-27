import React from 'react';

const services = [
  {
    title: '24/7 Emergency',
    description: 'Quick and professional emergency services available round the clock.',
  },
  {
    title: 'Outpatient Department (OPD)',
    description: 'Consult our specialist doctors for regular check-ups and treatments.',
  },
  {
    title: 'Inpatient Care',
    description: 'Comfortable wards and excellent care for admitted patients.',
  },
  {
    title: 'Diagnostic Services',
    description: 'Modern lab and imaging services including X-Ray, MRI, and CT Scan.',
  },
  {
    title: 'Surgery Department',
    description: 'Highly equipped operation theatres for both minor and major surgeries.',
  },
  {
    title: 'Pharmacy',
    description: 'In-house pharmacy with all essential and emergency medicines.',
  },
];

const OurServices = () => {
  return (
    <section className="py-16" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
