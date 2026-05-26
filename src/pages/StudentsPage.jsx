
import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Search,
  Edit,
  Trash2,
  UserX,
  X,
  Loader2,
} from "lucide-react";

const initialFormState = {
  student_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  date_of_birth: "",
  gender: "",
  address: "",
  profile_image_file: null,
  course: "",
  semester: 1,
  is_active: true,
  is_dropout: false,
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] =
    useState(initialFormState);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  // ====================================
  // FETCH STUDENTS
  // ====================================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5001/students"
      );

      setStudents(response.data.data || []);

    } catch (error) {
      console.log(error);

      alert("Failed to fetch students");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ====================================
  // SEARCH
  // ====================================

  const filteredStudents = useMemo(() => {

    const q =
      searchQuery.toLowerCase();

    return students.filter((student) =>
      `
      ${student.first_name}
      ${student.last_name}
      ${student.email}
      ${student.student_id}
      ${student.course}
      `
        .toLowerCase()
        .includes(q)
    );

  }, [students, searchQuery]);

  // ====================================
  // HANDLE CHANGE
  // ====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ====================================
  // SUBMIT
  // ====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      const form = new FormData();

      Object.keys(formData).forEach((key) => {

        if (
          key === "profile_image_file"
        ) {
          if (
            formData.profile_image_file
          ) {
            form.append(
              "profile_image",
              formData.profile_image_file
            );
          }
        } else {
          form.append(
            key,
            formData[key]
          );
        }
      });

      let response;

      // UPDATE
      if (editingStudent) {

        response = await axios.put(
          `http://localhost:5001/students/${editingStudent.id}`,
          form,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setStudents((prev) =>
          prev.map((student) =>
            student.id ===
            response.data.data.id
              ? response.data.data
              : student
          )
        );
      }

      // ADD
      else {

        response = await axios.post(
          "http://localhost:5001/students",
          form,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setStudents((prev) => [
          response.data.data,
          ...prev,
        ]);
      }

      alert(response.data.message);

      setFormData(
        initialFormState
      );

      setEditingStudent(null);

      setShowModal(false);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to save student"
      );

    } finally {

      setSaving(false);
    }
  };

  // ====================================
  // EDIT
  // ====================================

  const handleEdit = (student) => {

    setEditingStudent(student);

    setFormData({
      ...initialFormState,
      ...student,
    });

    setShowModal(true);
  };

  // ====================================
  // DELETE
  // ====================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this student?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5001/students/${id}`
      );

      setStudents((prev) =>
        prev.filter(
          (student) =>
            student.id !== id
        )
      );

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };

  // ====================================
  // STATUS
  // ====================================

  const toggleStatus = async (
    student
  ) => {

    try {

      const response =
        await axios.put(
          `http://localhost:5001/students/${student.id}`,
          {
            is_active:
              !student.is_active,

            is_dropout:
              student.is_active,
          }
        );

      setStudents((prev) =>
        prev.map((item) =>
          item.id === student.id
            ? response.data.data
            : item
        )
      );

    } catch (error) {

      console.log(error);

      alert("Status update failed");
    }
  };

  // ====================================
  // OPEN MODAL
  // ====================================

  const openAddModal = () => {

    setEditingStudent(null);

    setFormData(
      initialFormState
    );

    setShowModal(true);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Student Management
          </h1>

          <p className="text-slate-500">
            Manage students
          </p>

        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Plus size={18} />
          Add Student
        </button>

      </div>

      {/* SEARCH */}

      <div className="bg-white p-4 rounded-2xl shadow">

        <div className="relative">

          <Search className="absolute left-3 top-3 text-slate-400" />

          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            className="w-full border rounded-xl pl-10 pr-4 py-3"
          />

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        {loading ? (

          <div className="p-10 flex justify-center">

            <Loader2 className="animate-spin" />

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4">
                  Profile
                </th>

                <th className="p-4">
                  Student
                </th>

                <th className="p-4">
                  Course
                </th>

                <th className="p-4">
                  Semester
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.map(
                (student) => (

                  <tr
                    key={student.id}
                    className="border-t"
                  >

                    <td className="p-4">

                      <img
                        src={
                          student.profile_image_url ||
                          "https://via.placeholder.com/60"
                        }
                        alt=""
                        className="w-14 h-14 rounded-full object-cover "
                      />

                    </td>

                    <td className="p-4">

                      <p className="font-semibold">
                        {student.first_name}{" "} 
                        {student.last_name}
                      </p>

                      <p className="text-sm text-slate-500 ">
                        {student.email}
                      </p>

                      <p className="text-xs text-slate-400">
                        {student.student_id}
                      </p>

                    </td>

                    <td className="p-4 ">
                      {student.course}
                    </td>

                    <td className="p-4">
                      Semester{" "}
                      {student.semester}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          student.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.is_active
                          ? "Active"
                          : "Dropout"}
                      </span>

                    </td>

                    <td className="p-4">

                      <div className="flex gap-3">

                        <button
                          onClick={() =>
                            handleEdit(
                              student
                            )
                          }
                          className="text-blue-600"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() =>
                            toggleStatus(
                              student
                            )
                          }
                          className="text-yellow-600"
                        >
                          <UserX size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              student.id
                            )
                          }
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        )}

      </div>

      {/* MODAL */}

      <AnimatePresence>

        {showModal && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl p-6 w-full max-w-3xl"
            >

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-2xl font-bold">

                  {editingStudent
                    ? "Edit Student"
                    : "Add Student"}

                </h2>

                <button
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  <X />
                </button>

              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >

                <input
                  name="student_id"
                  placeholder="Student ID"
                  value={formData.student_id}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                  required
                />

                <input
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                  required
                />

                <input
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                  required
                />

                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                  required
                />

                <input
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

                <input
                  name="course"
                  placeholder="Course"
                  value={formData.course}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
                />

                <input
                  type="number"
                  name="semester"
                  placeholder="Semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3"
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

                <textarea
                  name="address"
                  placeholder="Address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="border rounded-xl px-4 py-3 md:col-span-2"
                />

                <button
                  type="submit"
                  disabled={saving}
                  className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                >

                  {saving && (
                    <Loader2 className="animate-spin" />
                  )}

                  {editingStudent
                    ? "Update Student"
                    : "Add Student"}

                </button>

              </form>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}