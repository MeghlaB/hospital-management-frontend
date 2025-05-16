// components/Testimonial.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Dr. Nafisa Islam',
    feedback: 'Excellent hospital with professional staff and world-class service.',
    designation: 'Cardiologist',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Md. Rayhan Ahmed',
    feedback: 'Their emergency response is very quick and helpful!',
    designation: 'Patient',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Dr. Rima Akter',
    feedback: 'Modern diagnostic lab and experienced doctors. Highly recommended.',
    designation: 'Radiologist',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    name: 'Sabbir Hasan',
    feedback: 'My father got treated here and we are fully satisfied.',
    designation: 'Visitor',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Dr. Tania Chowdhury',
    feedback: 'The surgery team is extremely skilled and compassionate.',
    designation: 'Surgeon',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    name: 'Nazia Rahman',
    feedback: 'OPD service is smooth and organized.',
    designation: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Dr. Mahmudul Hasan',
    feedback: 'As a doctor, I feel proud to work here.',
    designation: 'Consultant',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    name: 'Rasheda Begum',
    feedback: 'Clean and hygienic environment. Best hospital in town.',
    designation: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Dr. Rifat Karim',
    feedback: 'Technologically advanced and patient-friendly.',
    designation: 'Orthopedic Specialist',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
  },
  {
    name: 'Shila Sultana',
    feedback: 'Highly satisfied with the maternity care.',
    designation: 'Mother & Patient',
    image: 'https://randomuser.me/api/portraits/women/10.jpg',
  },
];

const Testimonial = () => {
  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-teal-800 mb-10">What People Say</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((person, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-teal-700">{person.name}</h4>
                    <p className="text-sm text-gray-500">{person.designation}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">“{person.feedback}”</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
