import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    age: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://student-api-8xt1.onrender.com/api/students",
        student
      );
      alert("Student added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Student App</h1>
        <div className="space-x-4">
          <Link
            to="/dashboard"
            className="text-indigo-600 dark:text-indigo-300 hover:underline text-sm"
          >
            Dashboard
          </Link>
      <button
            onClick={handleSignOut}
            className="bg-red-700 text-white cursor-pointer px-4 py-3 rounded-md text-sm font-semibold"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Form */}
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 dark:text-gray-100">
          Add New Student
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "course", "age", "imageUrl"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 capitalize">
                {field === "imageUrl" ? "Image URL" : field}
              </label>
              <input
                type={field === "age" ? "number" : "text"}
                name={field}
                value={student[field]}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-indigo-300"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
