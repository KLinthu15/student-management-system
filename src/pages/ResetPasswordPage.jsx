// ======================================================
// BLUR RESET PASSWORD MODAL PAGE
// FILE: ResetPasswordPage.jsx
// ======================================================

import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  successToast,
  errorToast,
} from "../untils/toast.js";

export default function ResetPasswordPage() {

  const navigate = useNavigate();

  // ==========================================
  // STATES
  // ==========================================

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const handleResetPassword = (e) => {

    e.preventDefault();

    // PASSWORD LENGTH

    if (newPassword.length < 6) {

      errorToast(
        "Password must be at least 6 characters"
      );

      return;
    }

    // PASSWORD MATCH

    if (
      newPassword !== confirmPassword
    ) {

      errorToast(
        "Passwords do not match"
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {

      // SAVE PASSWORD

      localStorage.setItem(
        "adminPassword",
        newPassword
      );

      successToast(
        "Password Reset Successful ✅"
      );

      setLoading(false);

      navigate("/admin-login");

    }, 1200);

  };

  return (

    // ==========================================
    // BLUR BACKGROUND
    // ==========================================

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-6">

      {/* MODAL CARD */}

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9,
          y: 30,
        }}

        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}

        transition={{
          duration: 0.35,
        }}

        className="relative w-full max-w-md"

      >

        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">

          {/* CLOSE BUTTON */}

          <button
            onClick={() =>
              navigate("/admin-login")
            }
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          {/* HEADER */}

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-lg mb-5">

              <ShieldCheck className="w-10 h-10" />

            </div>

            <h2 className="text-3xl font-bold">
              Reset Password
            </h2>

            <p className="text-blue-100 mt-2">
              Create your new secure password
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleResetPassword}
            className="p-8 space-y-6"
          >

            {/* NEW PASSWORD */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                New Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showPassword
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
                  placeholder="Enter new password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showPassword ? (

                    <EyeOff className="w-5 h-5" />

                  ) : (

                    <Eye className="w-5 h-5" />

                  )}

                </button>

              </div>

            </div>

            {/* CONFIRM PASSWORD */}

            <div>

              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Confirm Password
              </label>

              <div className="relative">

                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showPassword
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* BUTTON */}

            <motion.button

              whileHover={{
                scale: 1.02,
              }}

              whileTap={{
                scale: 0.98,
              }}

              type="submit"

              disabled={loading}

              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 text-white py-4 rounded-2xl font-semibold shadow-lg"

            >

              {loading ? (

                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />

              ) : (

                "Reset Password"

              )}

            </motion.button>

          </form>

        </div>

      </motion.div>

    </div>

  );

}