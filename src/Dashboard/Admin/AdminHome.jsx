import { BookImage } from "lucide-react";
import React from "react";
import ApexChart from "../../Components/Charts/Charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequire from "../../Hooks/UseAxiosSequir";

function AdminHome() {
  const axiosSequire = useAxiosSequire();

  // all doctors
  const { data:dactors=[] } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSequire.get("/doctors");
      // console.log(res.data);
      return res.data;
    },
  });

  // all appoinments
  const {data:appoinments=[]} =useQuery({
    queryKey:['appoinments'],
    queryFn:async ()=>{
      const res = await axiosSequire.get('/appoinments')
      // console.log(res.data)
      return res.data
    }
  })
  // all appoinments
  const {data:users=[]} =useQuery({
    queryKey:['users'],
    queryFn:async ()=>{
      const res = await axiosSequire.get('/users')
      // console.log(res.data)
      return res.data
    }
  })

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
            <div className="text-xl font-bold text-white  flex items-center  gap-3">
              <p className="text-[16px]">Total Doctors </p>
              <p>{dactors?.length}</p>
            </div>
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
            <div className="text-xl font-bold text-white  flex items-center  gap-3">
              <p className="text-[16px]">Appoinments</p>
              <p>{appoinments?.length}</p>
            </div>
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
            <div className="text-xl font-bold text-white  flex items-center  gap-3">
              <p className="text-[16px]">Users</p>
              <p>{users?.length}</p>
            </div>
          </div>
        </div>
      </div>
      {/* charts */}
      <div>
        <ApexChart />
      </div>
    </div>
  );
}

export default AdminHome;
