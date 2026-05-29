

import {
  useState,
  useEffect,
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { Mail } from "lucide-react";

export default function ResultSheetPage() {

  const [results, setResults] =
    useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // FETCH STUDENTS
  // =====================================

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const response =
        await axios.get(
          "http://localhost:5001/results"
        );

      const students =
        response.data.data || [];
const formatted = students.map(
  (student) => ({
    ...student,

    name:
      `${student.first_name} ${student.last_name}`,

    marks:
      student.results?.[0]?.marks || "",

    gpa:
      student.results?.[0]?.gpa || "",

    result:
      student.results?.[0]?.result || "",
  })
);

      setResults(formatted);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to fetch students"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // =====================================
  // SEARCH
  // =====================================

  const filteredResults =
    results.filter((student) =>
      student.name
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
    );

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = (
    id,
    field,
    value
  ) => {

    setResults((prev) =>
      prev.map((student) =>
        student.id === id
          ? {
              ...student,
              [field]: value,
            }
          : student
      )
    );
  };

  // =====================================
  // SAVE RESULT
  // =====================================

  const saveResult = async (
    student
  ) => {

    try {

      await axios.post(
        "http://localhost:5001/results",
        {
          student_id: student.id,

          marks: student.marks,

          gpa: student.gpa,

          result: student.result,
        }
      );

      alert("Result Saved Successfully ✅ ");

    } catch (error) {

      console.log(error);

      alert(
        "Failed to save result"
      );
    }
  };

  // =====================================
  // SEND EMAIL
  // =====================================

  const sendEmail = async (
    student
  ) => {

    try {

      await axios.post(
        "http://localhost:5001/results/send-email",
        {
          email: student.email,

          name: student.name,

          student_id:
            student.student_id,

          course: student.course,

          batch:
            student.batch,

          marks: student.marks,

          gpa: student.gpa,

          result: student.result,
        }
      );

      alert("Email Sent Successfully ✅ ");

    } catch (error) {

      console.log(error);

      alert(
        "Email sending failed"
      );
    }
  };

  // =====================================
  // SUMMARY
  // =====================================

  const total = results.length;

  const passed =
    results.filter(
      (r) => r.result === "Pass"
    ).length;

  const failed =
    results.filter(
      (r) => r.result === "Fail"
    ).length;

  return (

    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold">
          Result Management
        </h1>

        <p className="text-slate-500">
          Manage Student Results
        </p>

      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search Student..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(
            e.target.value
          )
        }
        className="w-full border rounded-xl p-3"
      />

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        {loading ? (

          <div className="p-6">
            Loading...
          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-3">
                  Student ID
                </th>

                <th>Name</th>

                <th>Course</th>

                <th>Batch</th>

                <th>Marks</th>

                <th>GPA</th>

                <th>Result</th>

                <th>Save</th>

                <th>Email</th>

              </tr>

            </thead>

            <tbody>

              {filteredResults.map(
                (student) => (

                  <tr
                    key={student.id}
                    className="border-t"
                  >

                    <td className="p-3">
                      {
                        student.student_id
                      }
                    </td>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.course}
                    </td>

                    <td>
                      {
                        student.batch
                      }
                    </td>

                    <td>

                      <input
                        type="number"
                        value={
                          student.marks
                        }
                        onChange={(e) =>
                          handleChange(
                            student.id,
                            "marks",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded w-24"
                      />

                    </td>

                    <td>

                      <input
                        type="number"
                        value={
                          student.gpa
                        }
                        onChange={(e) =>
                          handleChange(
                            student.id,
                            "gpa",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded w-24"
                      />

                    </td>

                    <td>

                      <select
                        value={
                          student.result
                        }
                        onChange={(e) =>
                          handleChange(
                            student.id,
                            "result",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                      >

                        <option value="">
                          Select
                        </option>

                        <option value="Pass">
                          Pass
                        </option>

                        <option value="Fail">
                          Fail
                        </option>

                      </select>

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          saveResult(
                            student
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>

                    </td>

                    <td>

                      <button
                        onClick={() =>
                          sendEmail(
                            student
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
                      >

                        <Mail size={14} />

                        Send

                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>
        )}

      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-4 rounded-xl">
          Total: {total}
        </div>

        <div className="bg-white p-4 rounded-xl text-green-600">
          Passed: {passed}
        </div>

        <div className="bg-white p-4 rounded-xl text-red-600">
          Failed: {failed}
        </div>

      </div>

    </motion.div>
  );
}