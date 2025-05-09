import { useState } from "react";
import { ChevronDown, Mic } from "lucide-react";

export default function DoctorSearchSection() {
  const [location, setLocation] = useState("Bangalore");

  return (
    <div className="bg-blue-800 text-white p-6 rounded-md w-full max-w-5xl mx-auto flex items-center gap-4 shadow-md">
      <div className="flex-1">
        <h2 className="font-semibold text-lg mb-2">I’m looking for</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-1/3">
            <label className="text-sm mb-1 block">Location/City</label>
            <div className="bg-blue-800 border-b border-white flex items-center justify-between cursor-pointer px-2 py-1">
              <input
                type="text"
                className="bg-transparent text-white outline-none w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
            />
          </div>
        </div>
      </div>
      <button className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-700 transition">
        Search
      </button>
      <button className="bg-blue-600 p-3 rounded-full hover:bg-blue-500 transition">
        <Mic className="text-white" />
      </button>
    </div>
  );
}
