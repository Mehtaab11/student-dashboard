import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentCard from "../components/StudentCard";
import { signOut } from "firebase/auth";
import { auth } from "../configs/firebase";

const Dashboard = () => {
  const [response, setResponse] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState("all"); // Track selected course filter
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://student-api-8xt1.onrender.com/api/students"
        );
        setResponse(res.data);
        setStudents(res.data);
        setFilteredStudents(res.data); // Initially show all students
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Apply filter whenever courseFilter or students change
  useEffect(() => {
    if (courseFilter === "all") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) => student.course === courseFilter
      );
      setFilteredStudents(filtered);
    }
  }, [courseFilter, students]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
    console.log("Sign out");
  };

  const addStudentHandler = () => {
    navigate("/add-student");
  };

  // Extract unique courses from students for filter options
  const getUniqueCourses = () => {
    const courses = students.map((student) => student.course);
    return ["all", ...new Set(courses)]; // Add "all" option and remove duplicates
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-slate-900 min-h-screen">
      <div className="flex items-center justify-between px-10 py-6 text-white">
        <h1 className="text-2xl text-white font-semibold">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={addStudentHandler}
            className="bg-yellow-700 cursor-pointer px-4 py-3 rounded-md text-sm font-semibold"
          >
            Add Student
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-700 cursor-pointer px-4 py-3 rounded-md text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-10 py-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-white font-medium mb-2">Filter by Course</h2>
          <div className="flex flex-wrap gap-2">
            {getUniqueCourses().map((course) => (
              <button
                key={course}
                onClick={() => setCourseFilter(course)}
                className={`px-4 py-2 rounded-md text-sm font-semibold ${
                  courseFilter === course
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-200 hover:bg-gray-500"
                }`}
              >
                {course === "all" ? "All Students" : course}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((e) => (
            <StudentCard
              key={e.id}
              id={e.id}
              imageUrl={e.imageUrl}
              name={e.name}
              age={e.age}
              course={e.course}
              email={e.email}
              isBooked={false}
            />
          ))
        ) : (
          <div className="text-center text-white py-10">
            <p>No students found matching the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;