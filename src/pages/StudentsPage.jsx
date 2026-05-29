
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit, Trash2, UserX, X, Loader2 } from "lucide-react";

const initialFormState = {
  student_id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",

  father_name: "",
  mother_name: "",
  age: "",
  parent_tp: "",
  nic: "",

  job: "",
  gender: "",
  address: "",

  al_school: "",
  al_results: "",

  ol_school: "",
  ol_results: "",

  profile_image_file: null,

  course: "",
  batch: 1,

  is_active: true,
  is_dropout: false,
  dropout_reason: "",
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // FETCH
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5001/students");
        setStudents(res.data.data || []);
      } catch {
        alert("Failed to load students");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // SEARCH
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter((s) =>
      `${s.first_name} ${s.last_name} ${s.email} ${s.student_id} ${s.course}`
        .toLowerCase()
        .includes(q)
    );
  }, [students, search]);

  // CHANGE
  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData();

      Object.keys(formData).forEach((k) => {
        if (k === "profile_image_file") {
          if (formData[k]) form.append("profile_image", formData[k]);
        } else {
          form.append(k, formData[k]);
        }
      });

      let res;

      if (edit) {
        res = await axios.put(
          `http://localhost:5001/students/${edit.id}`,
          form
        );

        setStudents((prev) =>
          prev.map((s) => (s.id === edit.id ? res.data.data : s))
        );
      } else {
        res = await axios.post("http://localhost:5001/students", form);
        setStudents((prev) => [res.data.data, ...prev]);
      }

      setFormData(initialFormState);
      setEdit(null);
      setOpen(false);
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // EDIT

  const handleEdit = (student) => {
    setEdit(student);

    setFormData({
      ...initialFormState,
      ...student,
    });

    setOpen(true);
  };

  // ======================================================
  // DELETE
  // ======================================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5001/students/${id}`
      );

      setStudents((prev) =>
        prev.filter((s) => s.id !== id)
      );

      alert("Student deleted");
    } catch {
      alert("Delete failed");
    }
  };

  // ======================================================
  // DROPOUT / ACTIVE TOGGLE
  // ======================================================

  const toggleStatus = async (student) => {
    try {
      let reason = "";

      // ACTIVE -> DROPOUT
      if (student.is_active) {
        reason = prompt(
          "Enter Dropout Reason"
        );

        if (!reason) return;
      }

      // DROPOUT -> ACTIVE
      else {
        reason = prompt(
          "Reason for re-activating student?"
        );

        if (!reason) return;
      }

      const payload = {
        is_active: !student.is_active,
        is_dropout: student.is_active,
        dropout_reason:
          !student.is_active
            ? ""
            : reason,
      };

      const res = await axios.put(
        `http://localhost:5001/students/${student.id}`,
        payload
      );

      setStudents((prev) =>
        prev.map((s) =>
          s.id === student.id
            ? res.data.data
            : s
        )
      );

      alert(
        student.is_active
          ? "Student marked as dropout"
          : "Student activated again"
      );
    } catch (err) {
      console.log(err);
      alert("Status update failed");
    }
  };





  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Portal</h1>
          <p className="text-gray-500">Manage full student records</p>
        </div>

        <button
          onClick={() => {
            setEdit(null);
            setFormData(initialFormState);
            setOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600
             hover:from-blue-700 hover:to-indigo-700
             text-white px-5 py-3 rounded-xl
             flex items-center gap-2 shadow-lg"
        >
          <Plus size={18} />
          New Students Appication
        </button>

      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <div className="flex gap-2 items-center">
          <Search />
          <input
            className="w-full outline-none"
            placeholder="Search students..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* STUDENT CARDS (REAL PROFILE UI) */}
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >

              {/* PROFILE HEADER */}
              <div className="flex gap-3 items-center">
                <img
                  src={s.profile_image_url || "https://via.placeholder.com/80"}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h2 className="font-bold">
                    {s.first_name} {s.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">{s.course}</p>
                  <p className="text-xs text-gray-400">{s.student_id}</p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-3 text-sm space-y-1">
                <p>📧 {s.email}</p>
                <p>📞 {s.phone}</p>
                <p>🎓 Batch {s.batch}</p>
              </div>

              {/* STATUS */}
              <div className="mt-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${s.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {s.is_active ? "Active" : "Dropout"}
                </span>
              </div>

              {/* ACTIONS */}

              <div className="flex justify-between items-center mt-5">

                {/* EDIT */}

                <button
                  onClick={() =>
                    handleEdit(s)
                  }
                  className="
                  bg-blue-100
                  hover:bg-blue-200
                  text-blue-600
                  p-2
                  rounded-xl
                  transition
                  "
                >
                  <Edit size={18} />
                </button>

                {/* ACTIVE / DROPOUT */}

                <button
                  onClick={() =>
                    toggleStatus(s)
                  }
                  className={`
                  p-2
                  rounded-xl
                  transition
                  ${s.is_active
                      ? "bg-red-100 hover:bg-red-200 text-red-600"
                      : "bg-green-100 hover:bg-green-200 text-green-600"
                    }
                  `}
                >
                  {s.is_active ? (
                    <UserX size={18} />
                  ) : (
                    <UserCheck size={18} />
                  )}
                </button>

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDelete(s.id)
                  }
                  className="
                  bg-gray-100
                  hover:bg-gray-200
                  text-gray-700
                  p-2
                  rounded-xl
                  transition
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}<AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden"
            >

              {/* Header */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    {edit ? "Edit Student" : "Add New Student"}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    Student Information Management
                  </p>
                </div>


                <button
                  onClick={() => setOpen(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-xl"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="p-6 max-h-[80vh] overflow-y-auto"
              >


                {/* Personal Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">
                    👤 Personal Informations
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">

                    <input
                      name="student_id"
                      placeholder="Student ID"
                      value={formData.student_id}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      name="first_name"
                      placeholder="First Name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      name="last_name"
                      placeholder="Last Name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                      name="nic"
                      placeholder="NIC Number"
                      value={formData.nic}
                      onChange={handleChange}
                      className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
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
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />


                  </div>
                </div>

                {/* Parent Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">
                    👨‍👩‍👧 Parent Information
                  </h3>

                  <div className="grid md:grid-cols-3 gap-4">

                    <input
                      name="father_name"
                      placeholder="Father Name"
                      value={formData.father_name}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <input
                      name="mother_name"
                      placeholder="Mother Name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <input
                      name="parent_tp"
                      placeholder="Parent Contact"
                      value={formData.parent_tp}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <input
                      name="job"
                      placeholder="Father Job / Occupation"
                      value={formData.job}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                  </div>
                </div>

                {/* Academic Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">
                    🎓 Academic Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      name="al_school"
                      placeholder="A/L School"
                      value={formData.al_school}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <input
                      name="ol_school"
                      placeholder="O/L School"
                      value={formData.ol_school}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <textarea
                      name="al_results"
                      placeholder="A/L Results"
                      value={formData.al_results}
                      onChange={handleChange}
                      rows="4"
                      className="border rounded-xl p-3"
                    />

                    <textarea
                      name="ol_results"
                      placeholder="O/L Results"
                      value={formData.ol_results}
                      onChange={handleChange}
                      rows="4"
                      className="border rounded-xl p-3"
                    />

                  </div>
                </div>

                {/* Course */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">
                    📚 Course Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">

                    <input
                      name="course"
                      placeholder="Course Name"
                      value={formData.course}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                    <input
                      type="number"
                      name="batch"
                      placeholder="Batch"
                      value={formData.batch}
                      onChange={handleChange}
                      className="border rounded-xl p-3"
                    />

                  </div>
                </div>

                {/* Address & Upload */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold mb-4 border-b pb-2 text-slate-700">
                    📍 Additional Information
                  </h3>

                  <div className="space-y-4">

                    <textarea
                      name="address"
                      placeholder="Address"
                      rows="4"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border rounded-xl p-3"
                    />

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          profile_image_file: e.target.files[0],
                        })
                      }
                      className="w-full border rounded-xl p-3"
                    />

                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg"
                  >
                    {saving ? "Saving..." : edit ? "Update Student" : "Save Student"}
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}