
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  BookOpen,
  TrendingUp,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const API_URL = "http://localhost:5001/api/dashboard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    activeCourses: 0,
    averageGPA: 0,
  });

  const [studentTrend, setStudentTrend] = useState([
    { month: "Jan", students: 50 },
    { month: "Feb", students: 80 },
    { month: "Mar", students: 120 },
    { month: "Apr", students: 160 },
    { month: "May", students: 210 },
    { month: "Jun", students: 250 },
  ]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      if (res.data?.stats) {
        setDashboard({
          totalStudents: res.data.stats.totalStudents || 0,
          activeCourses: res.data.stats.activeCourses || 0,
          averageGPA: res.data.stats.averageGPA || 0,
        });
      }

      if (
        res.data?.studentTrend &&
        res.data.studentTrend.length > 0
      ) {
        setStudentTrend(res.data.studentTrend);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Page load ஆகும் போது மட்டும் fetch
  useEffect(() => {
    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Total Students",
      value: dashboard.totalStudents,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: dashboard.activeCourses,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Average GPA",
      value: dashboard.averageGPA,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            Student Management System Overview
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          Loading Dashboard...
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow p-6"
                >
                  <div
                    className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon
                      size={28}
                      className="text-white"
                    />
                  </div>

                  <h2 className="text-3xl font-bold mt-4">
                    {card.value}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {card.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Student Growth Graph */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Student Growth
            </h2>

            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <LineChart data={studentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


{/* Summary Card */}
<div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-700 p-8 text-white shadow-2xl">

  {/* Decorative glow */}
  <div className="absolute -top-10 -right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

  <div className="relative z-10">

    {/* Title */}
    <h2 className=" md:text-3xl font-extrabold tracking-tight mb-6">
      Dashboard Summary
    </h2>

    {/* Stats */}
    <div className="space-y-4">
      <p className="text-xl md:text-xl text-blue-100">
        <span className="font-semibold text-white">Total Students:</span>{" "}
        {dashboard.totalStudents}
      </p>

      <p className="text-xl md:text-xl text-blue-100">
        <span className="font-semibold text-white">Active Courses:</span>{" "}
        {dashboard.activeCourses}
      </p>

      <p className="text-xl md:text-xl text-blue-100">
        <span className="font-semibold text-white">Average GPA:</span>{" "}
        {dashboard.averageGPA}
      </p>
    </div>

    {/* Progress bar */}
    <div className="mt-6">
      <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
        <div
          className="h-4 rounded-full bg-gradient-to-r from-white to-blue-300 transition-all duration-700"
          style={{
            width:
              dashboard.totalStudents > 0
                ? "83%"
                : "0%",
          }}
        />
      </div>

      <p className="text-xl md:text-xl font-semibold mt-4 text-white/90">
        Overall System Performance
      </p>
    </div>

  </div>
</div>



          
        </>
      )}



    </div>
  );
}