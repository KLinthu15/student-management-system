
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import AdminLoginPage from "../pages/AdminLoginPage";

import AdminLayout from "../layout/AdminLayout";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import DashboardPage from "../pages/DashboardPage";
import StudentsPage from "../pages/StudentsPage";
import Courses from "../pages/Courses";
import AttendancePage from "../pages/Attendancepage";
import ResultSheetPage from "../pages/ResultSheetPage";
import SettingsPage from "../pages/SettingPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<LandingPage />} />

      <Route
        path="/admin/login"
        element={<AdminLoginPage />}
      />

      {/* ADMIN */}
      <Route path="/admin" element={<AdminLayout />}>


        <Route
          path="dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="students"
          element={<StudentsPage />}
        />

        <Route
          path="courses"
          element={<Courses />}
        />

        <Route
          path="attendance"
          element={<AttendancePage />}
        />

        <Route
          path="results"
          element={<ResultSheetPage />}
        />


        <Route
          path="settings"
          element={<SettingsPage />}
        />
  <Route
      path="/admin/forgot-password"
      element={<ResetPasswordPage />}
    />





      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}