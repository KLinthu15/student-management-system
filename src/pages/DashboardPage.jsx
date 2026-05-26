
// import { motion } from "framer-motion";

// import {
//   Users,
//   BookOpen,
//   Calendar,
//   TrendingUp,
//   Bell,
//   Clock,
//   ArrowUpRight,
//   ArrowDownRight,
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Cell,
// } from "recharts";

// /* DATA */
// const attendanceData = [
//   { date: "Mon", percentage: 92 },
//   { date: "Tue", percentage: 88 },
//   { date: "Wed", percentage: 95 },
//   { date: "Thu", percentage: 91 },
//   { date: "Fri", percentage: 87 },
//   { date: "Sat", percentage: 78 },
//   { date: "Sun", percentage: 0 },
// ];

// const gradeDistribution = [
//   { grade: "A", count: 245, color: "#10b981" },
//   { grade: "B", count: 312, color: "#3b82f6" },
//   { grade: "C", count: 189, color: "#f59e0b" },
//   { grade: "D", count: 67, color: "#f97316" },
//   { grade: "F", count: 23, color: "#ef4444" },
// ];

// const recentActivities = [
//   {
//     id: 1,
//     action: "New student enrolled",
//     details: "John Smith joined Computer Science",
//     time: "5 mins ago",
//   },
//   {
//     id: 2,
//     action: "Result published",
//     details: "CS101 Mid-term results are now available",
//     time: "1 hour ago",
//   },
//   {
//     id: 3,
//     action: "Attendance alert",
//     details: "5 students marked absent",
//     time: "2 hours ago",
//   },
// ];

// const stats = [
//   {
//     title: "Total Students",
//     value: "2,543",
//     change: "+12%",
//     trend: "up",
//     icon: Users,
//     color: "#3b82f6",
//   },
//   {
//     title: "Active Courses",
//     value: "48",
//     change: "+3",
//     trend: "up",
//     icon: BookOpen,
//     color: "#10b981",
//   },
//   {
//     title: "Avg Attendance",
//     value: "94.2%",
//     change: "-2.1%",
//     trend: "down",
//     icon: Calendar,
//     color: "#f59e0b",
//   },
//   {
//     title: "Avg GPA",
//     value: "3.42",
//     change: "+0.15",
//     trend: "up",
//     icon: TrendingUp,
//     color: "#8b5cf6",
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">
//             Dashboard  🚀
//           </h1>

//           <p className="text-slate-500">
//             Institution overview
//           </p>
//         </div>

//         <div className="flex items-center gap-2 text-sm text-slate-500">
//           <Clock className="w-4 h-4" />

//           {new Date().toLocaleTimeString()}
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white p-6 rounded-xl shadow border"
//           >
//             <div className="flex justify-between items-center">

//               <div
//                 className="w-12 h-12 rounded-lg flex items-center justify-center"
//                 style={{
//                   backgroundColor: stat.color + "20",
//                 }}
//               >
//                 <stat.icon
//                   className="w-6 h-6"
//                   style={{ color: stat.color }}
//                 />
//               </div>

//               <div
//                 className={`flex items-center text-sm ${
//                   stat.trend === "up"
//                     ? "text-green-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 {stat.trend === "up" ? (
//                   <ArrowUpRight className="w-4 h-4" />
//                 ) : (
//                   <ArrowDownRight className="w-4 h-4" />
//                 )}

//                 {stat.change}
//               </div>
//             </div>

//             <div className="mt-4">
//               <div className="text-2xl font-bold">
//                 {stat.value}
//               </div>

//               <div className="text-sm text-slate-500">
//                 {stat.title}
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* LINE CHART */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-semibold mb-4">
//             Attendance Trend
//           </h3>

//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={attendanceData}>
//               <CartesianGrid stroke="#eee" />

//               <XAxis dataKey="date" />

//               <YAxis />

//               <Tooltip />

//               <Line
//                 type="monotone"
//                 dataKey="percentage"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* BAR CHART */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h3 className="font-semibold mb-4">
//             Grade Distribution
//           </h3>

//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={gradeDistribution}>
//               <CartesianGrid stroke="#eee" />

//               <XAxis dataKey="grade" />

//               <YAxis />

//               <Tooltip />

//               <Bar dataKey="count">
//                 {gradeDistribution.map((entry, index) => (
//                   <Cell
//                     key={index}
//                     fill={entry.color}
//                   />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* ACTIVITIES */}
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h3 className="font-semibold mb-4">
//           Recent Activities
//         </h3>

//         <div className="space-y-3">
//           {recentActivities.map((a) => (
//             <div
//               key={a.id}
//               className="flex items-start gap-3"
//             >
//               <Bell className="w-5 h-5 text-slate-500 mt-1" />

//               <div>
//                 <p className="font-medium">
//                   {a.action}
//                 </p>

//                 <p className="text-sm text-slate-500">
//                   {a.details}
//                 </p>
//               </div>

//               <span className="ml-auto text-xs text-slate-400">
//                 {a.time}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Users,
//   BookOpen,
//   Calendar,
//   TrendingUp,
//   Bell,
//   Clock,
//   RefreshCw,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// const API_URL = "http://localhost:5001/api/dashboard";

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     activeCourses: 0,
//     attendancePercentage: 0,
//     averageGPA: 0,
//   });

//   const [attendanceTrend, setAttendanceTrend] = useState([]);
//   const [activities, setActivities] = useState([]);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(API_URL);

//       setStats(
//         res.data.stats || {
//           totalStudents: 0,
//           activeCourses: 0,
//           attendancePercentage: 0,
//           averageGPA: 0,
//         }
//       );

//       setAttendanceTrend(
//         res.data.attendanceTrend || []
//       );

//       setActivities(
//         res.data.activities || []
//       );
//     } catch (error) {
//       console.error(
//         "Dashboard Load Error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();

//     const interval = setInterval(() => {
//       loadDashboard();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const cards = [
//     {
//       title: "Students",
//       value: stats.totalStudents,
//       icon: Users,
//       color: "bg-blue-100 text-blue-600",
//     },
//     {
//       title: "Courses",
//       value: stats.activeCourses,
//       icon: BookOpen,
//       color: "bg-green-100 text-green-600",
//     },
//     {
//       title: "Attendance",
//       value: `${stats.attendancePercentage}%`,
//       icon: Calendar,
//       color: "bg-yellow-100 text-yellow-600",
//     },
//     {
//       title: "Average GPA",
//       value: stats.averageGPA,
//       icon: TrendingUp,
//       color: "bg-purple-100 text-purple-600",
//     },
//   ];

//   return (
//     <div className="p-6 space-y-6">

//       {/* Header */}

//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Dashboard
//           </h1>

//           <p className="text-gray-500">
//             Student Management System
//           </p>
//         </div>

//         <button
//           onClick={loadDashboard}
//           className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white"
//         >
//           <RefreshCw size={18} />
//           Refresh
//         </button>
//       </div>

//       {/* Loading */}

//       {loading ? (
//         <div className="bg-white rounded-xl shadow p-8 text-center">
//           Loading Dashboard...
//         </div>
//       ) : (
//         <>
//           {/* Stats */}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//             {cards.map((card, index) => {
//               const Icon = card.icon;

//               return (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl shadow p-5"
//                 >
//                   <div className="flex justify-between items-center">
//                     <div
//                       className={`p-3 rounded-lg ${card.color}`}
//                     >
//                       <Icon size={24} />
//                     </div>

//                     <Clock
//                       size={18}
//                       className="text-gray-400"
//                     />
//                   </div>

//                   <h2 className="text-3xl font-bold mt-4">
//                     {card.value}
//                   </h2>

//                   <p className="text-gray-500 mt-1">
//                     {card.title}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Attendance Chart */}

//           <div className="bg-white rounded-xl shadow p-5">
//             <h2 className="text-xl font-semibold mb-5">
//               Attendance Trend
//             </h2>

//             <ResponsiveContainer
//               width="100%"
//               height={300}
//             >
//               <LineChart
//                 data={attendanceTrend}
//               >
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                 />

//                 <XAxis dataKey="date" />

//                 <YAxis />

//                 <Tooltip />

//                 <Line
//                   type="monotone"
//                   dataKey="percentage"
//                   stroke="#2563eb"
//                   strokeWidth={3}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Activities */}

//           <div className="bg-white rounded-xl shadow p-5">
//             <h2 className="text-xl font-semibold mb-5">
//               Recent Activities
//             </h2>

//             {activities.length === 0 ? (
//               <p className="text-gray-500">
//                 No Recent Activities
//               </p>
//             ) : (
//               activities.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex items-start gap-3 border-b py-4"
//                 >
//                   <Bell
//                     size={18}
//                     className="text-blue-600 mt-1"
//                   />

//                   <div>
//                     <p className="font-medium">
//                       {item.action}
//                     </p>

//                     <p className="text-sm text-gray-500">
//                       {item.details}
//                     </p>
//                   </div>

//                   <span className="ml-auto text-xs text-gray-400">
//                     {item.time}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   Users,
//   BookOpen,
//   Calendar,
//   TrendingUp,
//   RefreshCw,
// } from "lucide-react";

// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   BarChart,
//   Bar,
// } from "recharts";

// const API_URL = "http://localhost:5001/api/dashboard";

// export default function DashboardPage() {
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState({
//     totalStudents: 0,
//     activeCourses: 0,
//     attendancePercentage: 0,
//     averageGPA: 0,
//   });

//   const [studentTrend, setStudentTrend] = useState([]);
//   const [courseTrend, setCourseTrend] = useState([]);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(API_URL);

//       setStats(
//         data.stats || {
//           totalStudents: 0,
//           activeCourses: 0,
//           attendancePercentage: 0,
//           averageGPA: 0,
//         }
//       );

//       setStudentTrend(data.studentTrend || []);
//       setCourseTrend(data.courseTrend || []);
//     } catch (error) {
//       console.error("Dashboard Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();

//     const interval = setInterval(() => {
//       loadDashboard();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   const cards = [
//     {
//       title: "Total Students",
//       value: stats.totalStudents,
//       icon: Users,
//       bg: "bg-blue-100",
//       text: "text-blue-600",
//     },
//     {
//       title: "Active Courses",
//       value: stats.activeCourses,
//       icon: BookOpen,
//       bg: "bg-green-100",
//       text: "text-green-600",
//     },
//     {
//       title: "Attendance",
//       value: `${stats.attendancePercentage}%`,
//       icon: Calendar,
//       bg: "bg-yellow-100",
//       text: "text-yellow-600",
//     },
//     {
//       title: "Average GPA",
//       value: stats.averageGPA,
//       icon: TrendingUp,
//       bg: "bg-purple-100",
//       text: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-3xl font-bold">
//             Dashboard
//           </h1>

//           <p className="text-gray-500">
//             Student Management System
//           </p>
//         </div>

//         <button
//           onClick={loadDashboard}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           <RefreshCw size={18} />
//           Refresh
//         </button>
//       </div>

//       {loading ? (
//         <div className="bg-white rounded-xl p-10 shadow text-center">
//           Loading Dashboard...
//         </div>
//       ) : (
//         <>
//           {/* Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             {cards.map((card, index) => {
//               const Icon = card.icon;

//               return (
//                 <div
//                   key={index}
//                   className="bg-white rounded-xl shadow p-6"
//                 >
//                   <div
//                     className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bg}`}
//                   >
//                     <Icon
//                       className={card.text}
//                       size={24}
//                     />
//                   </div>

//                   <h2 className="text-3xl font-bold mt-4">
//                     {card.value}
//                   </h2>

//                   <p className="text-gray-500 mt-1">
//                     {card.title}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Graph Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//             {/* Student Graph */}
//             <div className="bg-white rounded-xl shadow p-5">
//               <h2 className="text-xl font-semibold mb-4">
//                 Student Growth
//               </h2>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >
//                 <LineChart data={studentTrend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />

//                   <Line
//                     type="monotone"
//                     dataKey="students"
//                     stroke="#2563eb"
//                     strokeWidth={3}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             {/* Course Graph */}
//             <div className="bg-white rounded-xl shadow p-5">
//               <h2 className="text-xl font-semibold mb-4">
//                 Course Statistics
//               </h2>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >
//                 <BarChart data={courseTrend}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="course" />
//                   <YAxis />
//                   <Tooltip />

//                   <Bar
//                     dataKey="students"
//                     fill="#10b981"
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//           </div>
//         </>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const API_URL = "http://localhost:5001/api/dashboard";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    activeCourses: 0,
    attendancePercentage: 0,
    averageGPA: 0,
  });

  // Default Graph Data
  const [studentTrend, setStudentTrend] = useState([
    { month: "Jan", students: 50 },
    { month: "Feb", students: 80 },
    { month: "Mar", students: 120 },
    { month: "Apr", students: 160 },
    { month: "May", students: 210 },
    { month: "Jun", students: 250 },
  ]);

  const [courseTrend, setCourseTrend] = useState([
    { course: "IT", students: 80 },
    { course: "CS", students: 65 },
    { course: "SE", students: 55 },
    { course: "HNDA", students: 50 },
  ]);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);

      if (res.data?.stats) {
        setDashboard({
          totalStudents:
            res.data.stats.totalStudents || 0,
          activeCourses:
            res.data.stats.activeCourses || 0,
          attendancePercentage:
            res.data.stats.attendancePercentage || 0,
          averageGPA:
            res.data.stats.averageGPA || 0,
        });
      }

      if (
        res.data?.studentTrend &&
        res.data.studentTrend.length > 0
      ) {
        setStudentTrend(
          res.data.studentTrend
        );
      }

      if (
        res.data?.courseTrend &&
        res.data.courseTrend.length > 0
      ) {
        setCourseTrend(
          res.data.courseTrend
        );
      }
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 10000);

    return () => clearInterval(interval);
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
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw size={18} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          {/* Graph Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Student Growth Graph */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                Student Growth
              </h2>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <LineChart
                  data={studentTrend}
                >
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



            {/* Dashboard Summary */}
            <div className="mt-6 bg-gradient-to-r from-blue-900 to-indigo-600 rounded-xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">
                Dashboard Summary
              </h2>

              <p className="text-blue-100">
                Total Students: {dashboard.totalStudents} |
                Active Courses: {dashboard.activeCourses} |
                GPA: {dashboard.averageGPA}
              </p>

              <div className="mt-4 w-full bg-blue-800 rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full"
                  style={{
                    width: `${dashboard.totalStudents > 0 ? 85 : 0}%`,
                  }}
                />
              </div>

              <p className="text-sm mt-2">
                Overall System Performance
              </p>
            </div>


            <div className="bg-white rounded-xl shadow p-6">
  <h2 className="text-xl font-semibold mb-4">
    Recent Activities
  </h2>

  <ul className="space-y-3">
    <li>✅ New Student Registered</li>
    <li>📚 New Course Added</li>
    <li>📝 Results Published</li>
    <li>📅 Attendance Updated</li>
  </ul>
</div>






          </div>
        </>
      )}
    </div>
  );
}