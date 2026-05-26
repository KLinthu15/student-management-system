import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function AttendancePage() {
  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [attendanceData,
    setAttendanceData] =
    useState({});

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // ======================================
  // FETCH STUDENTS
  // ======================================

  const fetchStudents =
    async () => {
      try {
        setLoading(true);

        const response =
          await axios.get(
            "http://localhost:5001/attendance/students"
          );

        setStudents(
          response.data.data || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ======================================
  // HANDLE ATTENDANCE CHANGE
  // ======================================

  const handleAttendanceChange =
    (
      studentId,
      value
    ) => {
      setAttendanceData(
        (prev) => ({
          ...prev,
          [studentId]:
            value,
        })
      );
    };

  // ======================================
  // SAVE ATTENDANCE
  // ======================================

  const saveAttendance =
    async (
      student_id
    ) => {
      try {
        const response =
          await axios.post(
            "http://localhost:5001/attendance",
            {
              student_id,

              attendance:
                attendanceData[
                  student_id
                ] ||
                "Present",

              attendance_date:
                today,
            }
          );

        alert(
          response.data.message
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed To Save Attendance"
        );
      }
    };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">
        Attendance Management
      </h1>

      <p className="mb-5 font-medium">
        Date : {today}
      </p>

      {loading ? (
        <p>
          Loading Students...
        </p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">
                Student ID
              </th>

              <th className="border p-3">
                Name
              </th>

              <th className="border p-3">
                Course
              </th>

              <th className="border p-3">
                Semester
              </th>

              <th className="border p-3">
                Attendance
              </th>

              <th className="border p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map(
              (
                student
              ) => (
                <tr
                  key={
                    student.id
                  }
                >
                  <td className="border p-3">
                    {
                      student.student_id
                    }
                  </td>

                  <td className="border p-3">
                    {
                      student.first_name
                    }{" "}
                    {
                      student.last_name
                    }
                  </td>

                  <td className="border p-3">
                    {
                      student.course
                    }
                  </td>

                  <td className="border p-3">
                    {
                      student.semester
                    }
                  </td>

                  <td className="border p-3">
                    <select
                      value={
                        attendanceData[
                          student
                            .student_id
                        ] ||
                        "Present"
                      }
                      onChange={(
                        e
                      ) =>
                        handleAttendanceChange(
                          student.student_id,
                          e.target
                            .value
                        )
                      }
                      className="border p-2 rounded"
                    >
                      <option value="Present">
                        Present
                      </option>

                      <option value="Absent">
                        Absent
                      </option>
                    </select>
                  </td>

                  <td className="border p-3">
                    <button
                      onClick={() =>
                        saveAttendance(
                          student.student_id
                        )
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}