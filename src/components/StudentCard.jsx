import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentCard = ({
  setIsDeleted,
  id,
  imageUrl,
  name,
  age,
  course,
  email,
}) => {
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
      setIsDeleted(true);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-slate-100 to-slate-50 items-center w-[80%] md:w-[70%] lg:w-2/5 m-auto justify-between p-6 border-b border-gray-300 bg-gray-200  shadow-sm ">
      {/* Left profile info */}
      <div className="flex flex-1 items-center ">
        <img
          src={imageUrl}
          alt={name}
          className="w-12 mr-3 h-12 rounded-full"
        />
        <div className="flex flex-col justify-between md:flex-row ">
          <div>
            {" "}
            <p className="font-medium md:text-md text-sm ">{name}</p>
            <div className="flex gap-1">
              {" "}
              <p className="md:text-sm text-xs text-gray-500">{age}</p>
              <p className="md:text-sm text-xs text-gray-500">{course}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={handleDelete}
        className="text-black  flex items-center w-fit cursor-pointer "
      >
        <div className="md:flex  hidden  items-center gap-2">
          {email && <span className="text-xs text-gray-700">{email}</span>}
          <label className="inline-flex items-center cursor-pointer"></label>
        </div>
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
