
import { motion } from "framer-motion";

import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  Bell,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

/* DATA */
const attendanceData = [
  { date: "Mon", percentage: 92 },
  { date: "Tue", percentage: 88 },
  { date: "Wed", percentage: 95 },
  { date: "Thu", percentage: 91 },
  { date: "Fri", percentage: 87 },
  { date: "Sat", percentage: 78 },
  { date: "Sun", percentage: 0 },
];

const gradeDistribution = [
  { grade: "A", count: 245, color: "#10b981" },
  { grade: "B", count: 312, color: "#3b82f6" },
  { grade: "C", count: 189, color: "#f59e0b" },
  { grade: "D", count: 67, color: "#f97316" },
  { grade: "F", count: 23, color: "#ef4444" },
];

const recentActivities = [
  {
    id: 1,
    action: "New student enrolled",
    details: "John Smith joined Computer Science",
    time: "5 mins ago",
  },
  {
    id: 2,
    action: "Result published",
    details: "CS101 Mid-term results are now available",
    time: "1 hour ago",
  },
  {
    id: 3,
    action: "Attendance alert",
    details: "5 students marked absent",
    time: "2 hours ago",
  },
];

const stats = [
  {
    title: "Total Students",
    value: "2,543",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "#3b82f6",
  },
  {
    title: "Active Courses",
    value: "48",
    change: "+3",
    trend: "up",
    icon: BookOpen,
    color: "#10b981",
  },
  {
    title: "Avg Attendance",
    value: "94.2%",
    change: "-2.1%",
    trend: "down",
    icon: Calendar,
    color: "#f59e0b",
  },
  {
    title: "Avg GPA",
    value: "3.42",
    change: "+0.15",
    trend: "up",
    icon: TrendingUp,
    color: "#8b5cf6",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard  🚀
          </h1>

          <p className="text-slate-500">
            Institution overview
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />

          {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow border"
          >
            <div className="flex justify-between items-center">

              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: stat.color + "20",
                }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: stat.color }}
                />
              </div>

              <div
                className={`flex items-center text-sm ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}

                {stat.change}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-bold">
                {stat.value}
              </div>

              <div className="text-sm text-slate-500">
                {stat.title}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Attendance Trend
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceData}>
              <CartesianGrid stroke="#eee" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">
            Grade Distribution
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid stroke="#eee" />

              <XAxis dataKey="grade" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="count">
                {gradeDistribution.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ACTIVITIES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold mb-4">
          Recent Activities
        </h3>

        <div className="space-y-3">
          {recentActivities.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3"
            >
              <Bell className="w-5 h-5 text-slate-500 mt-1" />

              <div>
                <p className="font-medium">
                  {a.action}
                </p>

                <p className="text-sm text-slate-500">
                  {a.details}
                </p>
              </div>

              <span className="ml-auto text-xs text-slate-400">
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}