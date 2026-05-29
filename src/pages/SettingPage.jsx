
// ======================================================
// MODERN SETTINGS PAGE WITH EMAIL CHANGE
// FILE: SettingsPage.jsx
// ======================================================

import { useState } from "react";

import { motion } from "framer-motion";

import axios from "axios";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Save,
  UserCog,
} from "lucide-react";

import {
  successToast,
  errorToast,
} from "../untils/toast.js";

export default function SettingsPage() {

  // ==========================================
  // STATES
  // ==========================================

  const [email, setEmail] =
    useState(
      localStorage.getItem(
        "adminEmail"
      ) || "admin@gmail.com"
    );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // HANDLE SAVE
  // ==========================================

  const handleSave = async (e) => {

    e.preventDefault();

    const savedPassword =
      localStorage.getItem(
        "adminPassword"
      ) || "123456";

    // CHECK CURRENT PASSWORD

    if (
      currentPassword !== savedPassword
    ) {
      errorToast(
        "Current password is incorrect"
      );
      return;
    }

    // CHECK PASSWORD MATCH

    if (
      newPassword !== confirmPassword
    ) {
      errorToast(
        "Passwords do not match"
      );
      return;
    }

    // CHECK PASSWORD LENGTH

    if (newPassword.length < 6) {
      errorToast(
        "Minimum 6 characters required"
      );
      return;
    }

    setLoading(true);

    try {

      // ======================================
      // SAVE TO LOCAL STORAGE
      // ======================================

      localStorage.setItem(
        "adminEmail",
        email
      );

      localStorage.setItem(
        "adminPassword",
        newPassword
      );

      // ======================================
      // OPTIONAL BACKEND API
      // ======================================

      /*
      await axios.put(
        "http://localhost:5001/admin/settings",
        {
          email,
          password: newPassword,
        }
      );
      */

      successToast(
        "Email & Password Updated Successfully ✅"
      );

      // CLEAR FIELDS

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {

      errorToast(
        "Failed to update settings"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-6">

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="w-full max-w-2xl"

      >

        {/* CARD */}

        <div className="bg-white rounded-[35px] shadow-2xl border border-slate-200 overflow-hidden">

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">

            <div className="flex items-center gap-5">

              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-lg">

                <UserCog className="w-10 h-10 text-white" />

              </div>

              <div>

                <h1 className="text-4xl font-bold text-white">
                  Security Settings
                </h1>

                <p className="text-blue-100 mt-2">
                  Update admin email & password
                </p>

              </div>

            </div>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSave}
            className="p-8 space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Admin Email
              </label>

              <div className="relative">

                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter admin email"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

              </div>

            </div>

            {/* CURRENT PASSWORD */}

            <div>

              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Current Password
              </label>

              <div className="relative">

                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showCurrent
                      ? "text"
                      : "password"
                  }
                  required
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(
                      e.target.value
                    )
                  }
                  placeholder="Current password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrent(
                      !showCurrent
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showCurrent ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

            </div>

            {/* NEW PASSWORD */}

            <div>

              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                New Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showNew
                      ? "text"
                      : "password"
                  }
                  required
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  placeholder="New password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNew(
                      !showNew
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showNew ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="text-sm font-semibold text-slate-700 mb-3 block">
                Confirm Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showConfirm
                      ? "text"
                      : "password"
                  }
                  required
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(
                      !showConfirm
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showConfirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

            </div>

            {/* SAVE BUTTON */}

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              type="submit"

              disabled={loading}

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 shadow-lg transition"

            >

              {loading ? (

                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />

              ) : (

                <>
                  <Save className="w-5 h-5" />
                  Save Settings
                </>

              )}

            </motion.button>

          </form>

        </div>

      </motion.div>

    </div>

  );

}