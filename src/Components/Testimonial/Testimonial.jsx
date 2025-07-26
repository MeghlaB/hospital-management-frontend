import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    name: 'Dr. Nafisa Islam',
    feedback: 'Excellent hospital with professional staff and world-class service. The facilities are top-notch and patient care is exceptional.',
    designation: 'Cardiologist',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    rating: 6
  },
  {
    name: 'Md. Rayhan Ahmed',
    feedback: 'Their emergency response is very quick and helpful! Saved my father during a critical situation.',
    designation: 'Patient',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 9
  },
  {
    name: 'Dr. Rima Akter',
    feedback: 'Modern diagnostic lab and experienced doctors. Highly recommended for accurate diagnoses.',
    designation: 'Radiologist',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    rating: 7
  },

];

const Testimonial = () => {
 
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const title = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const renderStars = (rating) => {
    return (
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={container}
      className="py-16 bg-gradient-to-b from-teal-50 to-white" 
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={title}
          className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-12"
        >
          Patient & Doctor Testimonials
        </motion.h2>

        <motion.div variants={item}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            autoplay={{ 
              delay: 5000,
              disableOnInteraction: false 
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((person, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all h-full flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-teal-100"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-teal-700">{person.name}</h4>
                      <p className="text-sm text-gray-500">{person.designation}</p>
                      {person.rating && renderStars(person.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 italic mb-4 flex-grow">“{person.feedback}”</p>
                  <div className="text-right">
                    <svg className="w-8 h-8 mx-auto text-teal-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <div className="swiper-button-prev bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="swiper-pagination !relative !bottom-0"></div>
            <div className="swiper-button-next bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600 transition cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Testimonial;