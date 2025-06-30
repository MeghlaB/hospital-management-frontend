import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://hospital-server-peach.vercel.app/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
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

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        <p>Error loading doctors: {error}</p>
      </div>
    );
  }

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="py-12 bg-gradient-to-b from-teal-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={title}
          className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-12"
        >
          Our Expert Doctors
        </motion.h2>

        {doctors.length === 0 ? (
          <p className="text-center text-gray-500">No doctors available at the moment</p>
        ) : (
          <motion.div 
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {doctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6 text-center">
                  <motion.img
                    src={doctor.image}
                    alt={`Dr. ${doctor.name}, ${doctor.specialty}`}
                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-teal-100 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    loading="lazy"
                  />
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Dr. {doctor.name}
                    </h3>
                    <p className="text-teal-600 font-medium mt-1">
                      {doctor.specialty}
                    </p>
                    {doctor.experience && (
                      <p className="text-gray-500 text-sm mt-2">
                        {doctor.experience} years experience
                      </p>
                    )}
                  </div>
                  <Link 
                    to={`/doctor-appointment-booking/${doctor._id}`}
                    className="inline-block mt-6"
                  >
                    <motion.button 
                      className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full hover:from-teal-600 hover:to-teal-700 transition-all shadow-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Appointment
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default FeaturedDoctors;