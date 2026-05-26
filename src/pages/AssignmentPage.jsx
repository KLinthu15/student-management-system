import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Edit, Trash2, X } from "lucide-react";

export default function AssignmentPage() {
  const [assignments, setAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    course: "",
    semester: "",
    due_date: "",
    total_marks: "",
    status: "Active",
    description: "",
    file_url: "",
  });

  // =====================================
  // GET ASSIGNMENTS
  // =====================================

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/assignments"
      );

      setAssignments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // =====================================
  // CREATE / UPDATE
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAssignment) {
        await axios.put(
          `http://localhost:5001/api/assignments/${editingAssignment.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5001/api/assignments",
          formData
        );
      }

      fetchAssignments();

      setShowModal(false);

      setEditingAssignment(null);

      setFormData({
        title: "",
        course: "",
        semester: "",
        due_date: "",
        total_marks: "",
        status: "Active",
        description: "",
        file_url: "",
      });
    } catch (error) {
      console.log(error);
      alert("Error saving assignment");
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Assignment?")) return;

    try {
      await axios.delete(
        `http://localhost:5001/api/assignments/${id}`
      );

      fetchAssignments();
    } catch (error) {
      console.log(error);
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);

    setFormData({
      title: assignment.title || "",
      course: assignment.course || "",
      semester: assignment.semester || "",
      due_date: assignment.due_date || "",
      total_marks: assignment.total_marks || "",
      status: assignment.status || "Active",
      description: assignment.description || "",
      file_url: assignment.file_url || "",
    });

    setShowModal(true);
  };

  // =====================================
  // FILTER
  // =====================================

  const filteredAssignments = assignments.filter(
    (item) =>
      item.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.course
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 ">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-5 ">
        <h1 className="text-3xl font-bold">
          Assignment Management
        </h1>

        <button
          onClick={() => {
            setEditingAssignment(null);

            setFormData({
              title: "",
              course: "",
              semester: "",
              due_date: "",
              total_marks: "",
              status: "Active",
              description: "",
              file_url: "",
            });

            setShowModal(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 "
        >
          <Plus size={18} />
          Add Assignment
        </button>
      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        className="w-full border p-3 rounded-lg mb-5"
      />

      {/* TABLE */}

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Course</th>
              <th className="p-3">Semester</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Marks</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-3">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.course}
                </td>

                <td className="p-3">
                  {item.semester}
                </td>

                <td className="p-3">
                  {item.due_date}
                </td>

                <td className="p-3">
                  {item.total_marks}
                </td>

                <td className="p-3">
                  {item.status}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      handleEdit(item)
                    }
                  >
                    <Edit
                      size={18}
                      className="text-blue-600"
                    />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    <Trash2
                      size={18}
                      className="text-red-600"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center ">

          <div className="bg-white p-6 rounded-xl w-full max-w-2xl">

            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">
                {editingAssignment
                  ? "Edit Assignment"
                  : "Add Assignment"}
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
              className="grid gap-3 "
            >
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="border p-3 rounded"
                required
              />

              <input
                type="text"
                placeholder="Course"
                value={formData.course}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    course: e.target.value,
                  })
                }
                className="border p-3 rounded"
                required
              />

              <input
                type="number"
                placeholder="Semester"
                value={formData.semester}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    semester: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <input
                type="date"
                value={formData.due_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    due_date: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <input
                type="number"
                placeholder="Total Marks"
                value={formData.total_marks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_marks: e.target.value,
                  })
                }
                className="border p-3 rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className="border p-3 rounded"
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

              <button
                type="submit"
                className="bg-indigo-600 text-white py-3 rounded-lg"
              >
                {editingAssignment
                  ? "Update Assignment"
                  : "Create Assignment"}
              </button>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}