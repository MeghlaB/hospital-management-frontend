export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-cyan-950 to-cyan-900 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Patients Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-white inline-block pb-1">
            Patients Info
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Find a Doctor</li>
            <li>Inpatient Payment</li>
            <li>Reports Download</li>
            <li>Enquiry</li>
            <li>Feedback</li>
            <li>International Patient</li>
            <li>Organ Transplant Compliance</li>
          </ul>
        </div>

        {/* Column 2: Other Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-white inline-block pb-1">
            Other Links
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Contact</li>
            <li>Corporate Tie-up</li>
            <li>Career</li>
            <li>Appointment Request</li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2 border-b border-white inline-block pb-1">
            Resources
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Bio Medical Waste Report</li>
            <li>Stent Prices</li>
            <li>Knee Implant Price</li>
          </ul>
        </div>

        {/* Column 4: Map */}
        <div className="w-full h-48">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.343721860926!2d88.37661731495952!3d22.601933485167073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027657cae7317b%3A0x12e0f7a7d38ddc0c!2sPeerless%20Hospital!5e0!3m2!1sen!2sin!4v1642504294819!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Peerless Hospital Map"
          ></iframe>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-sm text-white mt-8">
        Copyright© 2025 Peerless Hospital
      </div>
    </footer>
  );
}
