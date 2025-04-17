import React from 'react';

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6 font-[Inter] text-gray-800">
      <div className="max-w-6xl mx-auto space-y-16 my-18">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3"> Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We’re always here to help you. Reach out to us for any query, emergency, or just to say hello.
          </p>
        </div>

        {/* Contact Info + Map */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-blue-600">📍 Hospital Location</h4>
              <p>123 Health Road, Dhaka, Bangladesh</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-600">📞 Phone</h4>
              <p>+880 1234 567 890</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-blue-600">✉️ Email</h4>
              <p>contact@sevahospital.com</p>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902273656961!2d90.39109741498192!3d23.750885994693828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85f088e04f5%3A0x9c2a09dcb9ff3d48!2sDhaka%20Medical%20College!5e0!3m2!1sen!2sbd!4v1685361894323!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hospital Map"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border-t-4 border-teal-600">
          <h3 className="text-2xl font-bold text-blue-700 mb-6">📝 Send Us a Message</h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="col-span-1 md:col-span-2 border border-gray-300 rounded-xl p-3 focus:outline-teal-600"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="col-span-1 border border-gray-300 rounded-xl p-3 focus:outline-teal-600"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="col-span-1 border border-gray-300 rounded-xl p-3 focus:outline-teal-600"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="col-span-1 md:col-span-2 border border-gray-300 rounded-xl p-3 focus:outline-teal-400"
              required
            ></textarea>
            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
            >
               Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
