import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, createUserWithEmailAndPassword } from "../configs/firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  if (user) {
    navigate("/dashboard");
    return null; // Prevent rendering the signup page if user is already logged in
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-slate-100 to-slate-300 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome 👋
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Please Sign up 
        </p>

        <div className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="email"
              name="email"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="password"
              name="password"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleSignup}
            className="mt-4 w-full cursor-pointer rounded-md bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition-all duration-200"
          >
        Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
