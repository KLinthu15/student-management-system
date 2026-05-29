
import { useState, useEffect } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import {
  successToast,
  errorToast,
} from "../untils/toast";

export default function AdminLoginPage() {

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // =========================
  // GET SAVED SETTINGS
  // =========================

  useEffect(() => {

    // DEFAULT VALUES
    if (
      !localStorage.getItem(
        "adminEmail"
      )
    ) {

      localStorage.setItem(
        "adminEmail",
        "admin@gmail.com"
      );

    }

    if (
      !localStorage.getItem(
        "adminPassword"
      )
    ) {

      localStorage.setItem(
        "adminPassword",
        "123456"
      );

    }

  }, []);

  // =========================
  // LOGIN SUBMIT
  // =========================

  const handleSubmit = (e) => {

    e.preventDefault();

    const savedEmail =
      localStorage.getItem(
        "adminEmail"
      );

    const savedPassword =
      localStorage.getItem(
        "adminPassword"
      );

    // CHECK LOGIN
    if (
      email === savedEmail &&
      password === savedPassword
    ) {

      setLoading(true);

      setTimeout(() => {

        localStorage.setItem(
          "adminAuth",
          "true"
        );

        successToast(
          "Login Successful ✅"
        );

        setLoading(false);

        navigate(
          "/admin/dashboard"
        );

      }, 1200);

    } else {

      errorToast(
        "Invalid Email or Password"
      );

    }

  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

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
          duration: 0.4,
        }}
        className="w-full max-w-md"
      >

        {/* LOGO */}

        <div className="text-center mb-8">

          <div className="inline-flex items-center gap-3">

            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">

              <GraduationCap className="w-8 h-8 text-white" />

            </div>

            <div className="text-left">

              <h1 className="text-2xl font-bold text-slate-800">
                EduManage
              </h1>

              <p className="text-sm text-slate-500">
                Admin Portal
              </p>

            </div>

          </div>

        </div>

        {/* CARD */}

        <motion.div
          initial={{
            scale: 0.95,
          }}
          animate={{
            scale: 1,
          }}
          className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8"
        >

          {/* HEADER */}

          <div className="text-center mb-6">

            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Login to continue
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* EMAIL */}

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter Email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Enter password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* SHOW PASSWORD */}

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                >

                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

              {/* FORGOT PASSWORD */}

              <div className="flex justify-end mt-2">

                <Link
                  to="/admin/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition"
                >
                  Forgot Password?
                </Link>

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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >

              {loading ? (

                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

              ) : (

                <>
                  Sign In

                  <ArrowRight className="w-4 h-4" />
                </>

              )}

            </motion.button>

          </form>

        </motion.div>

      </motion.div>

    </div>
  );
}