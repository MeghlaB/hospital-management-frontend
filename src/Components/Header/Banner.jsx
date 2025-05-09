import { useCallback, useEffect, useState } from "react";

import hospital1 from '../../assets/Images/hospital1.jpg';
import hospital2 from '../../assets/Images/hospital2.jpeg';
import hospital3 from '../../assets/Images/hospital3.jpeg';
import hospital4 from '../../assets/Images/hospital4.jpeg';
import hospital5 from '../../assets/Images/hospital5.jpeg';

export const Banner = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const carouselSlides = [
    {
      image: hospital1,
      title: 'Modern Healthcare Facility',
      description: 'Experience world-class medical treatment in a clean, safe, and advanced hospital environment.'
    },
    {
      image: hospital2,
      title: 'Expert Medical Professionals',
      description: 'Our dedicated team of doctors and nurses ensures you get the best care around the clock.'
    },
    {
      image: hospital3,
      title: 'Emergency Services 24/7',
      description: 'We provide fast and reliable emergency care any time of day or night.'
    },
    {
      image: hospital4,
      title: 'Advanced Diagnostic Center',
      description: 'Get accurate and timely diagnostics with our state-of-the-art equipment.'
    },
    {
      image: hospital5,
      title: 'Patient-Centered Care',
      description: 'Your health and comfort are our top priorities at every stage of your treatment.'
    }
  ];

  const prevSlider = () => {
    setCurrentSlider((prev) =>
      prev === 0 ? carouselSlides.length - 1 : prev - 1
    );
  };

  const nextSlider = useCallback(() => {
    setCurrentSlider((prev) =>
      prev === carouselSlides.length - 1 ? 0 : prev + 1
    );
  }, [carouselSlides.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlider();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <div className="h-60 md:h-[470px] lg:h-[540px] w-full overflow-hidden bg-white relative flex items-center justify-center mt-15">
      {/* Left Arrow */}
      <button
        onClick={prevSlider}
        className="absolute top-1/2 left-3 z-50 transform -translate-y-1/2 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
      >
        <svg className="h-4 w-4 md:h-6 md:w-6 fill-black/50" viewBox="0 0 1024 1024">
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlider}
        className="absolute top-1/2 right-3 z-50 transform -translate-y-1/2 flex justify-center items-center bg-white rounded-full w-6 h-6 md:w-8 md:h-8"
      >
        <svg className="h-4 w-4 md:h-6 md:w-6 fill-black/50 transform rotate-180" viewBox="0 0 1024 1024">
          <path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center items-center z-50 absolute bottom-4 w-full gap-1">
        {carouselSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full duration-500 bg-black ${currentSlider === idx ? "w-8" : "w-2"} h-2`}
          ></button>
        ))}
      </div>

      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ width: `${carouselSlides.length * 100}%`, transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {carouselSlides.map((slide, idx) => (
          <div
            key={idx}
            className="min-w-full h-60 sm:h-96 md:h-[540px] flex flex-col md:flex-row items-center justify-between bg-white text-black p-6 md:p-12"
          >
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
              <p className="text-sm md:text-lg">{slide.description}</p>
              <button className="bg-black text-white px-4 py-2 rounded shadow">
                Learn More
              </button>
            </div>
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="md:w-1/2 w-full h-48 md:h-full object-cover rounded shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
