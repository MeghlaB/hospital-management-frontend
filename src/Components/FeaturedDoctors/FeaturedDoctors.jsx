import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/doctors")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDoctors(data);
      });
  }, []);

  // Animation variants
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

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-12 to-white"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          variants={title}
          className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-10"
        >
          Featured Doctors
        </motion.h2>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {doctors.map((doctor) => (
            <motion.div
              key={doctor._id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 text-center"
            >
              <motion.img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-teal-200"
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              <Link to={`/doctor-appointment-booking`}>
                <motion.button 
                  className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturedDoctors;