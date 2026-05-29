


// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { GraduationCap, ArrowRight } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">

//       {/* COLOR BACKGROUND BLOBS */}
//       <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-pink-400 blur-3xl opacity-30 rounded-full animate-pulse"></div>
//       <div className="absolute top-[200px] right-[-120px] w-96 h-96 bg-blue-400 blur-3xl opacity-30 rounded-full animate-pulse"></div>
//       <div className="absolute bottom-[-120px] left-[30%] w-96 h-96 bg-purple-400 blur-3xl opacity-20 rounded-full animate-pulse"></div>

//       {/* NAVBAR */}
//       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur border-b border-white/40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//           {/* LOGO */}
//           <motion.div
//             initial={{ x: -30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="flex items-center gap-3"
//           >
//             <div className="w-11 h-11 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
//               <GraduationCap className="w-6 h-6 text-white" />
//             </div>

//             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               EduAdmin
//             </h1>
//           </motion.div>

//         </div>
//       </nav>

//       {/* HERO */}
//       <section className="pt-40 px-6 flex items-center justify-center min-h-screen">

//         <div className="text-center max-w-4xl">

//           {/* TITLE */}
//           <motion.h1
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-5xl md:text-6xl font-extrabold leading-tight"
//           >
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
//               Smart Student
//             </span>{" "}
//             <span className="text-slate-900">
//               Management System
//             </span>
//           </motion.h1>

//           {/* DESCRIPTION */}
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto"
//           >
//             A modern colorful platform to manage students, attendance,
//             courses, results, and analytics with a beautiful UI experience.
//           </motion.p>

//           {/* BUTTON */}
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="mt-10"
//           >
//             <Link
//               to="/admin/login"
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white text-lg font-semibold shadow-xl
//               bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500
//               hover:scale-105 transition transform"
//             >
//               Get Started
//               <ArrowRight className="w-5 h-5" />
//             </Link>
//           </motion.div>

//         </div>

//       </section>

//     </div>
//   );
// }




import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Users,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#312e81,transparent_35%),radial-gradient(circle_at_bottom_left,#0f766e,transparent_30%)]"></div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* FLOATING BLOBS */}
      <div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] bg-pink-500/30 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* LOGO */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              EduAdmin
            </h1>
          </motion.div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            {/* SMALL BADGE */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              Next Generation Education Platform
            </div>

            {/* TITLE */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Smart
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                {" "}
                Student{" "}
              </span>
              Management
            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-slate-300 text-lg leading-relaxed max-w-2xl">
              Powerful AI-ready student management platform with attendance,
              analytics, results, course tracking, and modern dashboard
              experience built for future education systems.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/admin/login"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-cyan-500/30"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>

            </div>

            {/* STATS */}
            <div className="flex gap-10 mt-14 flex-wrap">

              <div>
                <h2 className="text-3xl font-bold text-cyan-400">10K+</h2>
                <p className="text-slate-400 mt-1">Students Managed</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-purple-400">99%</h2>
                <p className="text-slate-400 mt-1">System Accuracy</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-pink-400">24/7</h2>
                <p className="text-slate-400 mt-1">Cloud Access</p>
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div className="relative rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 shadow-2xl">

              {/* TOP CARD */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold">
                  Education Analytics
                </h3>

                <p className="text-white/80 mt-2">
                  AI Powered Dashboard
                </p>

                <div className="mt-8 flex items-end gap-3 h-40">
                  <div className="w-10 bg-white/80 rounded-xl h-20"></div>
                  <div className="w-10 bg-white rounded-xl h-32"></div>
                  <div className="w-10 bg-white/70 rounded-xl h-24"></div>
                  <div className="w-10 bg-white rounded-xl h-40"></div>
                  <div className="w-10 bg-white/80 rounded-xl h-28"></div>
                </div>
              </div>

              {/* FEATURE GRID */}
              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <Users className="text-cyan-400 w-8 h-8 mb-3" />
                  <h4 className="font-semibold">Student Control</h4>
                  <p className="text-sm text-slate-400 mt-2">
                    Manage all students easily
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <BarChart3 className="text-purple-400 w-8 h-8 mb-3" />
                  <h4 className="font-semibold">Analytics</h4>
                  <p className="text-sm text-slate-400 mt-2">
                    Real-time insights & reports
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <ShieldCheck className="text-pink-400 w-8 h-8 mb-3" />
                  <h4 className="font-semibold">Secure System</h4>
                  <p className="text-sm text-slate-400 mt-2">
                    Advanced cloud protection
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <Sparkles className="text-yellow-400 w-8 h-8 mb-3" />
                  <h4 className="font-semibold">Modern UI</h4>
                  <p className="text-sm text-slate-400 mt-2">
                    Smooth futuristic experience
                  </p>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
}