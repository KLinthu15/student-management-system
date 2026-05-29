
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/courses";

const INITIAL_FORM = {
  course_code: "",
  course_name: "",
  level: "Beginner",
  instructor: "",
  duration: "",
  fee: "",
  students: 0,
  status: "Active",
};

// ─── Stat Card ───────────────────────────────────────────────

function StatCard({ label, value, color }) {
  const colors = {
    blue: { bg: "#EBF4FF", text: "#1565C0", accent: "#1976D2" },
    green: { bg: "#E8F5E9", text: "#2E7D32", accent: "#388E3C" },
    amber: { bg: "#FFF8E1", text: "#E65100", accent: "#F57C00" },
    purple: { bg: "#F3E5F5", text: "#6A1B9A", accent: "#7B1FA2" },
  };
  const c = colors[color] || colors.blue;
  return (
    <div
      style={{
        background: c.bg,
        borderRadius: 16,
        padding: "20px 24px",
        borderLeft: `4px solid ${c.accent}`,
      }}
    >
      <p style={{ fontSize: 13, color: c.text, margin: 0, fontWeight: 500 }}>
        {label}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, margin: "6px 0 0", color: c.text }}>
        {value}
      </p>
    </div>
  );
}

// ─── Badge ───────────────────────────────────────────────────

function Badge({ status }) {
  const style =
    status === "Active"
      ? { bg: "#E8F5E9", text: "#2E7D32" }
      : { bg: "#FFEBEE", text: "#C62828" };
  return (
    <span
      style={{
        background: style.bg,
        color: style.text,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

// ─── Course Card ─────────────────────────────────────────────

function CourseCard({ course, onEdit, onDelete }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.13)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative" }}>
        <img
          src={course.thumbnail || "https://www.shutterstock.com/image-photo/digital-education-concept-graduation-cap-260nw-2724840779.jpg"}
          alt={course.course_name}
          style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
          onError={(e) => {
            e.target.src = "https://www.shutterstock.com/image-photo/digital-education-concept-graduation-cap-260nw-2724840779.jpg";
          }}
        />
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <Badge status={course.status} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            background: "rgba(0,0,0,0.55)",
            color: "#fff",
            fontSize: 11,
            padding: "3px 10px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {course.level}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px", flexGrow: 1 }}>
        <p style={{ fontSize: 11, color: "#6B7280", margin: "0 0 4px", fontWeight: 500 }}>
          {course.course_code} · {course.category}
        </p>
        <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px", color: "#111827", lineHeight: 1.3 }}>
          {course.course_name}
        </h2>
        <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 14px", lineHeight: 1.5 }}>
          {course.description?.slice(0, 80)}{course.description?.length > 80 ? "…" : ""}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px 16px",
            fontSize: 13,
          }}
        >
          {[
            { label: "Instructor", val: course.instructor },
            { label: "Duration", val: course.duration },
            { label: "Fee", val: `Rs. ${course.fee}` },
            { label: "Students", val: course.students },
          ].map(({ label, val }) => (
            <div key={label}>
              <p style={{ fontSize: 11, color: "#9CA3AF", margin: "0 0 2px" }}>{label}</p>
              <p style={{ margin: 0, fontWeight: 600, color: "#374151" }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "12px 20px",
          borderTop: "1px solid #F3F4F6",
        }}
      >
        <button
          onClick={() => onEdit(course)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 10,
            border: "1.5px solid #3B82F6",
            background: "#EFF6FF",
            color: "#1D4ED8",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(course.id)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 10,
            border: "1.5px solid #EF4444",
            background: "#FEF2F2",
            color: "#DC2626",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

// ─── Modal Form ───────────────────────────────────────────────

function CourseModal({ show, onClose, onSubmit, editingCourse, formData, setFormData }) {
  if (!show) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fields = [
    { name: "course_code", label: "Course Code", type: "text", col: 1 },
    { name: "course_name", label: "Course Name", type: "text", col: 2 },
    { name: "instructor", label: "Instructor", type: "text", col: 1 },
    { name: "duration", label: "Duration", type: "text", col: 1 },
    { name: "fee", label: "Fee (Rs.)", type: "number", col: 1 },
    { name: "students", label: "Students", type: "number", col: 1 },
    { name: "pdfs", label: "Upload PDF", type: "file", col: 2 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 700,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 28px",
            borderBottom: "1px solid #F3F4F6",
            position: "sticky",
            top: 0,
            background: "#fff",
            borderRadius: "24px 24px 0 0",
            zIndex: 1,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#111827" }}>
            {editingCourse ? "✏️ Edit Course" : "➕ Add New Course"}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "#F3F4F6",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "24px 28px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}
          >
            {fields.map((f) => (
              <div
                key={f.name}
                style={{ gridColumn: f.col === 2 ? "1 / -1" : "auto" }}
              >
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#6B7280",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  name={f.name}
                  onChange={handleChange}
                  {...(f.type !== "file"
                    ? { value: formData[f.name] }
                    : {})}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "1.5px solid #E5E7EB",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}

            {/* Level */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#6B7280",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #E5E7EB",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={onSubmit}
            style={{
              marginTop: 24,
              width: "100%",
              padding: "14px 0",
              background: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.02em",
            }}
          >
            {editingCourse ? "💾 Update Course" : "🚀 Add Course"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openAdd = () => {
    setEditingCourse(null);
    setFormData(INITIAL_FORM);
    setShowModal(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setFormData({ ...INITIAL_FORM, ...course });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (editingCourse) {
        await axios.put(`${API_URL}/${editingCourse.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      fetchCourses();
      setShowModal(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      c.course_name?.toLowerCase().includes(search.toLowerCase()) ||
      c.course_code?.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalRevenue = courses.reduce(
    (a, b) => a + Number(b.fee || 0) * Number(b.students || 0),
    0
  );
  const totalStudents = courses.reduce((a, b) => a + Number(b.students || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgb(246, 247, 250) 0%, #ffffff 100%)",
          padding: "28px 32px",
          color: "#272424",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>
              📚 Course Management System
            </h1>
            <p style={{ margin: "6px 0 0", opacity: 0.75, fontSize: 20 }}>
              Manage all your courses in one place
            </p>
          </div>
          <button
            onClick={openAdd}
            style={{
              background: "#072896ab",
              color: "#fdfdff",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}
          >
            ➕ Add New Course
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 24px" }}>
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <StatCard label="Total Courses" value={courses.length} color="blue" />
          <StatCard
            label="Active Courses"
            value={courses.filter((c) => c.status === "Active").length}
            color="green"
          />
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 24,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", flexGrow: 1, minWidth: 220 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 16,
                color: "#9CA3AF",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, code or instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 14px 11px 40px",
                border: "1.5px solid #E5E7EB",
                borderRadius: 12,
                fontSize: 14,
                outline: "none",
                background: "#fff",
                boxSizing: "border-box",
              }}
            />
          </div>

          {["All", "Active", "Inactive"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                border: "1.5px solid",
                borderColor: filterStatus === s ? "#3B82F6" : "#E5E7EB",
                background: filterStatus === s ? "#EFF6FF" : "#fff",
                color: filterStatus === s ? "#1D4ED8" : "#6B7280",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}

          <span style={{ fontSize: 13, color: "#9CA3AF", marginLeft: "auto" }}>
            {filteredCourses.length} courses found
          </span>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p style={{ fontSize: 40 }}>⏳</p>
            <p>Loading courses...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
            <p style={{ fontSize: 48 }}>📭</p>
            <p style={{ fontSize: 16, fontWeight: 600 }}>No courses found</p>
            <p style={{ fontSize: 14 }}>Try a different search or add a new course</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <CourseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        editingCourse={editingCourse}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}




