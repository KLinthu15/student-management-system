
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, CalendarCheck,
  FileBarChart2, Bell, Settings, LogOut,
  Menu, X, GraduationCap, Moon, Sun,
} from "lucide-react";


export default function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // ✅ LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  // ✅ MENU ITEMS
  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { title: "Students", icon: Users, path: "/admin/students" },
    { title: "Courses", icon: BookOpen, path: "/admin/courses" },
    { title: "Attendance", icon: CalendarCheck, path: "/admin/attendance" },
    { title: "Results", icon: FileBarChart2, path: "/admin/results" },
    { title: "Settings", icon: Settings, path: "/admin/settings" }
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f1f5f9",
        transition: "0.3s",
      }}
    >

      {/* ================= SIDEBAR ================= */}
      <div
        style={{
          width: sidebarOpen ? "260px" : "80px",
          background: darkMode ? "#1e293b" : "#ffffff",
          borderRight: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
        }}
      >

        {/* LOGO */}
        <div
          style={{
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 15px",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <GraduationCap size={28} color="#2563eb" />
            {sidebarOpen && (
              <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
                EduManage
              </h2>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MENU */}
        <div style={{ flex: 1, padding: "10px" }}>
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                margin: "6px 0",
                borderRadius: "10px",
                textDecoration: "none",
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#fff" : darkMode ? "#cbd5e1" : "#64748b",
                fontWeight: "500",
              })}
            >
              <item.icon size={20} />
              {sidebarOpen && item.title}
            </NavLink>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ padding: "10px" }}>

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              border: "none",
              borderRadius: "8px",
              background: darkMode ? "#334155" : "#e2e8f0",
              color: darkMode ? "#fff" : "#000",
              cursor: "pointer",
            }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}{" "}
            {sidebarOpen && (darkMode ? "Light Mode" : "Dark Mode")}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <LogOut size={18} />
            {sidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: darkMode ? "#0f172a" : "#f1f5f9",
            transition: "0.3s",
          }}
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}