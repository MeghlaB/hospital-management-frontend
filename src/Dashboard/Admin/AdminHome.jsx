import {
  BookImage,
  Stethoscope,
  CalendarCheck,
  Users,
  Activity,
  Clock,
  DollarSign,
} from "lucide-react";
import React from "react";
import ApexChart from "../../Components/Charts/Charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSequire from "../../Hooks/UseAxiosSequir";
import { Skeleton } from "../../Components/Ui/Skeleton";
import axios from "axios";

function AdminHome() {
  const axiosSequire = useAxiosSequire();

  // all doctors
  const { data: doctors = [], isLoading: doctorsLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await axiosSequire.get("/doctors");
      // console.log(doctors)
      return res.data;
    },
  });

  // all appointments
  const { data: appointments = [], isLoading: appointmentsLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const res = await axios.get(
        "https://hospita-management-server.onrender.com/appoinments"
      );

      return res.data;
    },
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSequire.get("/users");
      return res.data;
    },
  });


  const pendingAppointments = appointments.filter(
    (app) => app.status === "pending"
  ).length;


  const revenue = appointments.reduce(
    (total, app) => total + (app.fee || 0),
    0
  );

  // Recent appointments (last 5)
  const filterRecentAppoinments = appointments.filter(
    (app) => app.status === "Completed" || app.status === "Confirmed"
  );
  console.log(filterRecentAppoinments);
  const recentAppointments = filterRecentAppoinments.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, Admin!</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Doctors Card */}
        <StatCard
          title="Total Doctors"
          value={doctors.length}
          icon={<Stethoscope className="h-6 w-6" />}
          color="bg-purple-100 text-purple-600"
          loading={doctorsLoading}
        />

        {/* Appointments Card */}
        <StatCard
          title="Total Appointments"
          value={appointments.length}
          icon={<CalendarCheck className="h-6 w-6" />}
          color="bg-blue-100 text-blue-600"
          loading={appointmentsLoading}
        />

        {/* Users Card */}
        <StatCard
          title="Registered Users"
          value={users.length}
          icon={<Users className="h-6 w-6" />}
          color="bg-green-100 text-green-600"
          loading={usersLoading}
        />

        {/* Revenue Card */}
        <StatCard
          title="Total Revenue"
          value={`$${revenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          color="bg-amber-100 text-amber-600"
          loading={appointmentsLoading}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Appointments Overview
            </h2>
            <div className="flex space-x-2">
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
          </div>
          <ApexChart />
        </div>

        {/* Recent Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Appointments
          </h2>
          {appointmentsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded"
                >
                  <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                    <CalendarCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.date} • {appointment.time}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pending Appointments */}
        <MiniStatCard
          title="Pending Appointments"
          value={pendingAppointments}
          icon={<Clock className="h-5 w-5" />}
          color="bg-yellow-100 text-yellow-600"
        />

        {/* Available Doctors */}
        <MiniStatCard
          title="Available Doctors"
          value={doctors.filter((d) => d.status).length}
          icon={<Activity className="h-5 w-5" />}
          color="bg-green-100 text-green-600"
        />

        {/* New Patients This Month */}
        <MiniStatCard
          title="New Patients (30d)"
          value={(() => {
            const uniquePatients = new Set();
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return appointments.filter((apt) => {
              const day = parseInt(apt.date.split(" ")[1]);

              const appointmentDate = new Date(currentYear, currentMonth, day);

              if (appointmentDate > thirtyDaysAgo) {
                if (!uniquePatients.has(apt.phone)) {
                  uniquePatients.add(apt.phone);
                  return true;
                }
              }
              return false;
            }).length;
          })()}
          icon={<Users className="h-5 w-5" />}
          color="bg-blue-100 text-blue-600"
          loading={appointmentsLoading}
        />
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value, icon, color, loading = false }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {loading ? (
            <Skeleton className="h-8 w-16 mt-2" />
          ) : (
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

// Mini Stat Card Component
function MiniStatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${color} mr-3`}>{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-lg font-semibold">{value}</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
