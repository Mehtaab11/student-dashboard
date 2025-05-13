import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ id, imageUrl, name, age, course, email }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    // Logic to delete the student
    console.log(id);
    e.preventDefault();
    try {
      await axios.delete(
        `https://student-api-8xt1.onrender.com/api/students/${id}`
      );
      alert("Student deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-slate-100 to-slate-50 items-center w-4/5 md:w-1/3 m-auto justify-between p-6 border-b border-gray-300 bg-gray-200  shadow-sm hover:shadow-md transition-all">
      {/* Left profile info */}
      <div className="flex items-center gap-3">
        <img src={imageUrl} alt={name} className="w-12 h-12 rounded-full" />
        <div>
          <p className="font-medium md:text-md text-sm ">{name}</p>
          <div className="flex gap-1">
            {" "}
            <p className="md:text-sm text-xs text-gray-500">{age}</p>
            <p className="md:text-sm text-xs text-gray-500">{course}</p>
          </div>
        </div>
      </div>

      {/* Middle badge */}

      {/* Right toggle / meeting info */}
      <div className="flex items-center gap-2">
        {email && <span className="text-xs text-gray-700">{email}</span>}
        <label className="inline-flex items-center cursor-pointer"></label>
      </div>

      <div onClick={handleDelete} className="text-black cursor-pointer ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-800 hover:text-red-700 transition duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default StudentCard;
