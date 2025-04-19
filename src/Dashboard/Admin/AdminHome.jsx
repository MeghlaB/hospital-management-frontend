import { BookImage } from "lucide-react";
import React from "react";
import ApexChart from "../../Components/Charts/Charts";

function AdminHome() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-teal-600">Hi , WelCome Back</h1>
      <div className="flex gap-6 items-center justify-center">
        {/* grid-1 */}
        <div className="card w-[260px]  bg-gradient-to-r  from-purple-500 to-purple-400 shadow-sm my-7">
          <div className="flex px-8 py-10 items-center justify-center gap-4">
            <div>
              <img
                src="/src/assets/total-dactors.png"
                className="w-12 h-12 rounded-full"
              ></img>
            </div>
            <div className="text-xl font-bold text-white">Total Doctors</div>
          </div>
        </div>

        {/* grid-2 */}
        {/* <div className="card w-[260px]  bg-gradient-to-r  from-purple-500 to-purple-400 shadow-sm my-7">
          <div className="flex px-8 py-10 items-center justify-center gap-4">
            <div>
              <img
                src="/src/assets/total-dactors.png"
                className="w-12 h-12 rounded-full"
              ></img>
            </div>
            <div className="text-xl font-bold text-white">Total Doctors</div>
          </div>
        </div> */}
        {/* grid-3 */}
        <div className="card w-[260px]   bg-gradient-to-r  from-amber-500 to-amber-400 shadow-sm my-7">
          <div className="flex px-8 py-10 items-center justify-center gap-4">
            <div>
              <img
                src="/src/assets/doctor-appoinment.jpg"
                className="w-12 h-12 rounded-full"
              ></img>
             
            </div>
            <div className="text-xl font-bold text-white">Appointments</div>
          </div>
        </div>
        {/* grid-4 */}
        <div className="card w-[260px]  bg-gradient-to-r  from-sky-500 to-sky-400 shadow-sm my-7">
          <div className="flex px-8 py-10 items-center justify-center gap-4">
            <div>
              <img
                src="/src/assets/patient.png"
                className="w-12 h-12 rounded-full"
              ></img>
            </div>
            <div className="text-xl font-bold text-white">Patent</div>
          </div>
        </div>
      </div>
      {/* charts */}
      <div>
        <ApexChart/>
      </div>
    </div>
  );
}

export default AdminHome;
