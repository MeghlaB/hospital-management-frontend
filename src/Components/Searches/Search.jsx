import { useState } from "react";
import debounce from "lodash.debounce";
import { ChevronDown, Mic } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DoctorSearchSection() {
  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = debounce(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/doctor-search", {
        params: {
          location,
          search: searchText,
        },
      });
      setDoctors(res.data);
    } catch (error) {
      setError("An error occurred while fetching doctors.");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, 500);

  return (
    <div className="bg-blue-800 text-white p-6 rounded-md w-full max-w-5xl mx-auto shadow-md">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        <div className="flex-1 w-full">
          <h2 className="font-semibold text-lg mb-2">I’m looking for</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-1/3">
              <label className="text-sm mb-1 block">Location/City</label>
              <div className="bg-blue-800 border-b border-white flex items-center justify-between px-2 py-1">
                <input
                  type="text"
                  className="bg-transparent text-white outline-none w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="location..."
                />
                <ChevronDown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="w-full sm:w-2/3">
              <label className="text-sm mb-1 block">Search Doctors by</label>
              <input
                type="text"
                placeholder="Specialty, Condition, Doctor’s name"
                className="bg-blue-800 border-b border-white text-white placeholder-white w-full px-2 py-1 outline-none"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleSearch();
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition">
            <Mic className="text-white" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Doctor Results */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="text-white text-center col-span-full">Loading...</div>
        ) : doctors.length === 0 ? (
          <div className="text-white text-center col-span-full">No doctors found.</div>
        ) : (
          doctors.map((doc) => (
            <div key={doc._id} className="bg-white text-black p-4 rounded shadow">
              <Link to={`/doctors/${doc._id}`}>
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg">{doc.name}</h3>
                <p className="text-sm">{doc.specialization}</p>
                <p className="text-sm text-gray-500">Location: {doc.location}</p>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
