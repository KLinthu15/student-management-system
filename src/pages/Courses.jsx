

import { useState, useEffect } from "react";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Video,
  X,
} from "lucide-react";

export default function CoursesPage() {

  // ================= STATES =================

  const [courses, setCourses] = useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [formData, setFormData] = useState({
    course_code: "",
    course_name: "",
    instructor: "",
    students: 0,
    subjects: "",
    pdfs: "",
    video_link: "",
    status: "Active",
  });

  // ================= FETCH COURSES =================

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5001/courses"
      );

      setCourses(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // ================= FILTER =================

  const filteredCourses = courses.filter(
    (course) =>
      course.course_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      course.course_code
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||

      course.instructor
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newCourse = {

      course_code: formData.course_code,

      course_name: formData.course_name,

      instructor: formData.instructor,

      students: Number(formData.students),

      subjects: formData.subjects
        .split(",")
        .map((s) => s.trim()),

      pdfs: formData.pdfs
        .split(",")
        .map((p) => p.trim()),

      video_link: formData.video_link,

      status: formData.status,
    };

    try {

      // ================= UPDATE =================

      if (editingCourse) {

        await axios.put(
          `http://localhost:5001/courses/${editingCourse.id}`,
          newCourse
        );

      }

      // ================= CREATE =================

      else {

        await axios.post(
          "http://localhost:5001/courses",
          newCourse
        );
      }

      // REFRESH

      fetchCourses();

      // CLOSE MODAL

      setShowModal(false);

      setEditingCourse(null);

      // RESET FORM

      setFormData({
        course_code: "",
        course_name: "",
        instructor: "",
        students: 0,
        subjects: "",
        pdfs: "",
        video_link: "",
        status: "Active",
      });

    } catch (err) {

      console.log(
        err.response?.data || err.message
      );
    }
  };

  // ================= EDIT =================

  const handleEdit = (course) => {

    setEditingCourse(course);

    setFormData({

      ...course,

      subjects:
        course.subjects?.join(", "),

      pdfs:
        course.pdfs?.join(", "),

      video_link:
        course.video_link,
    });

    setShowModal(true);
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5001/courses/${id}`
      );

      fetchCourses();

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <motion.div className="space-y-6 p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Course Management
          </h1>

          <p className="text-slate-500">
            Create and manage courses
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />

          Add Course
        </button>
      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-2xl shadow p-4">

        <div className="relative">

          <Search className="absolute left-3 top-3 text-slate-400" />

          <input
            className="w-full border rounded-xl pl-10 pr-4 py-3"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
          />
        </div>
      </div>

      {/* COURSE CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredCourses.map((course) => (

          <motion.div
            key={course.id}
            className="bg-white rounded-3xl shadow p-6 border"
          >

            <h2 className="text-xl font-bold">
              {course.course_name}
            </h2>

            <p className="text-slate-500 text-sm">
              {course.course_code}
            </p>

            <p className="text-slate-500 text-sm">
              Instructor: {course.instructor}
            </p>

            <p className="text-slate-500 text-sm">
              Students: {course.students}
            </p>

            <p className="text-slate-500 text-sm mb-2">
              Status: {course.status}
            </p>

            {/* SUBJECTS */}

            <div className="mt-3 flex flex-wrap gap-2">

              {course.subjects?.map((s, i) => (

                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* PDF */}

            <div className="mt-3">

              {course.pdfs?.map((p, i) => (

                <div
                  key={i}
                  className="flex items-center gap-2 text-sm"
                >
                  <FileText size={14} />

                  {p}
                </div>
              ))}
            </div>

            {/* VIDEO */}

            <a
              href={course.video_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-red-600 mt-3"
            >
              <Video size={18} />

              Open Lesson
            </a>

            {/* ACTION BUTTONS */}

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => handleEdit(course)}
                className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Edit size={16} />

                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(course.id)
                }
                className="flex-1 bg-red-100 text-red-700 py-2 rounded-xl flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />

                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="bg-white p-6 rounded-2xl w-[500px] max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-bold">

                  {editingCourse
                    ? "Edit Course"
                    : "Add Course"}
                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <X />
                </button>
              </div>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-3"
              >

                <input
                  className="border p-2 w-full rounded"
                  placeholder="Course Code"
                  value={formData.course_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course_code:
                        e.target.value,
                    })
                  }
                  required
                />

                <input
                  className="border p-2 w-full rounded"
                  placeholder="Course Name"
                  value={formData.course_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course_name:
                        e.target.value,
                    })
                  }
                  required
                />

                <input
                  className="border p-2 w-full rounded"
                  placeholder="Instructor"
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructor:
                        e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="number"
                  min={0}
                  className="border p-2 w-full rounded"
                  placeholder="Students"
                  value={formData.students}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      students:
                        Number(e.target.value),
                    })
                  }
                  required
                />

                <input
                  className="border p-2 w-full rounded"
                  placeholder="Subjects (comma separated)"
                  value={formData.subjects}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subjects:
                        e.target.value,
                    })
                  }
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profile_image_file:
                        e.target.files[0],
                    })
                  }
                  className="border rounded-xl px-4 py-3 md:col-span-2"
                />

                <input
                  className="border p-2 w-full rounded"
                  placeholder="Video Link"
                  value={formData.video_link}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      video_link:
                        e.target.value,
                    })
                  }
                />

                <select
                  className="border p-2 w-full rounded"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status:
                        e.target.value,
                    })
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>

                <button
                  type="submit"
                  className="bg-blue-600 text-white w-full py-2 rounded-xl"
                >
                  Save
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
