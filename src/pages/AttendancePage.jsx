

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Search,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AttendancePage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [attendanceData, setAttendanceData] =
    useState({});

  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] =
    useState("");
  const [batchFilter, setBatchFilter] =
    useState("");
  const [statusFilter, setStatusFilter] =
    useState("");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  // ===============================
  // FETCH STUDENTS
  // ===============================

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:5001/attendance/students"
      );

      setStudents(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/attendance"
      );

      const attendanceMap = {};

      res.data.data.forEach((item) => {
        attendanceMap[item.student_id] =
          item.attendance;
      });

      setAttendanceData(attendanceMap);
    } catch (error) {
      console.log(error);
    }
  };
  // ===============================
  // HANDLE ATTENDANCE
  // ===============================

  const handleAttendanceChange = (
    studentId,
    value
  ) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  // ===============================
  // SAVE
  // ===============================

  const saveAttendance = async (
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
              ] || "Present",
            attendance_date: today,
          }
        );

      await fetchAttendance();

      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
        "Failed To Save"
      );
    }
  };

  // ===============================
  // FILTER DATA
  // ===============================

  const filteredStudents =
    useMemo(() => {
      return students.filter(
        (student) => {

          const status =
            attendanceData[
            student.student_id
            ] || "Present";

          return (
            `${student.first_name} ${student.last_name}`
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) &&
            (courseFilter
              ? student.course ===
              courseFilter
              : true) &&
            (batchFilter
              ? student.batch ===
              batchFilter
              : true) &&
            (statusFilter
              ? status ===
              statusFilter
              : true)
          );
        }
      );
    }, [
      students,
      search,
      courseFilter,
      batchFilter,
      statusFilter,
      attendanceData,
    ]);

  const courses = [
    ...new Set(
      students.map(
        (s) => s.course
      )
    ),
  ];

  const batches = [
    ...new Set(
      students.map(
        (s) => s.batch
      )
    ),
  ];
  const absentCount =
    students.filter(
      (student) =>
        attendanceData[
        student.student_id
        ] === "Absent"
    ).length;

  const presentCount =
    students.filter(
      (student) =>
        attendanceData[
        student.student_id
        ] === "Present"
    ).length;

    
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Attendance Management
        </h1>

        <p className="text-gray-500">
          Date : {today}
        </p>
      </div>

      {/* SUMMARY */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <Users />
            <div>
              <p>Total Students</p>
              <h2 className="text-2xl font-bold">
                {students.length}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-green-100 p-5 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <CheckCircle />
            <div>
              <p>Present</p>
              <h2 className="text-2xl font-bold">
                {presentCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-red-100 p-5 rounded-xl shadow">
          <div className="flex items-center gap-3">
            <XCircle />
            <div>
              <p>Absent</p>
              <h2 className="text-2xl font-bold">
                {absentCount}
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* FILTERS */}

      <div className="bg-white p-4 rounded-xl shadow mb-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="relative">
            <Search
              className="absolute left-3 top-3"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Student..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full border pl-10 p-2 rounded-lg"
            />
          </div>

          <select
            value={courseFilter}
            onChange={(e) =>
              setCourseFilter(
                e.target.value
              )
            }
            className="border p-2 rounded-lg"
          >
            <option value="">
              All Courses
            </option>

            {courses.map(
              (course) => (
                <option
                  key={course}
                  value={course}
                >
                  {course}
                </option>
              )
            )}
          </select>

          <select
            value={batchFilter}
            onChange={(e) =>
              setBatchFilter(
                e.target.value
              )
            }
            className="border p-2 rounded-lg"
          >
            <option value="">
              All Batches
            </option>

            {batches.map(
              (batch) => (
                <option
                  key={batch}
                  value={batch}
                >
                  {batch}
                </option>
              )
            )}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border p-2 rounded-lg"
          >
            <option value="">
              All Status
            </option>

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>
          </select>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white ">
            <tr>
              <th className="p-4 ">
                Student ID
              </th>
              <th >Name</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredStudents.map(
              (student) => (
                <tr
                  key={
                    student.id
                  }
                  className="border-b hover:bg-gray-50 "
                >
                  <td className="p-4">
                    {
                      student.student_id
                    }
                  </td>

                  <td>
                    {
                      student.first_name
                    }{" "}
                    {
                      student.last_name
                    }
                  </td>

                  <td>
                    {
                      student.course
                    }
                  </td>

                  <td>
                    {
                      student.batch
                    }
                  </td>

                  <td>
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
                      className={`px-3 py-2 rounded-lg font-medium ${(
                        attendanceData[
                        student
                          .student_id
                        ] ||
                        "Present"
                      ) ===
                        "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      <option value="Present">
                        Present
                      </option>

                      <option value="Absent">
                        Absent
                      </option>
                    </select>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        saveAttendance(
                          student.student_id
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}