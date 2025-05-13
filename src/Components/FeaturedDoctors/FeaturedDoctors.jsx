import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("https://hospital-server-peach.vercel.app/doctors")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDoctors(data);
      });
  }, []);

  return (
    <section className="py-12 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-800 mb-10">
          Featured Doctors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5 text-center"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-teal-200"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              <Link to={`/doctor-appointment-booking/${doctor._id}`}>
                <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition">
                  Book Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
