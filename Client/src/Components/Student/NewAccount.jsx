import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";

function NewAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [profile, setProfile] = useState("");
  const [Mobile, setMobile] = useState("");
  const [ParentMobile, setParentMobile] = useState("");
  const [CurrentSemester, setCurrentSemester] = useState("");
  const [CurrentProgarm, setProgram] = useState("");
  const [CurrentDepatment, setDepartment] = useState("");

  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile(url);
    }
  };

  const Semester = [
    "1-Semester",
    "2-Semester",
    "3-Semester",
    "4-Semester",
    "5-Semester",
    "6-Semester",
    "7-Semester",
    "8-Semester",
  ];
  const Program = ["B.Tech", "M.Tech"];
  const Department = [
    "CSE",
    "MECH",
    "EEE",
    "ECE",
    "CIVIL",
    "CSE-AI&ML",
    "CSE-CST",
    "CSE-CY",
    "CSE-DS",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 5) {
      toast.error("Password must be at least 5 characters.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/LMS/new", {
        name,
        email,
        password,
        confirmPassword,
        role,
        profile,
        Mobile,
        ParentMobile,
        CurrentSemester,
        CurrentProgarm,
        CurrentDepatment,
      });
      toast.success(response.data.message);
      let email=localStorage.setItem("Faculty",response.data.message.email)
      navigate("/LMS/login");
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Create Account
          </h2>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Mobile & Parent Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Mobile</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-md"
                value={Mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Parent's Mobile</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border rounded-md"
                value={ParentMobile}
                onChange={(e) => setParentMobile(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Semester & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Select Semester</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={CurrentSemester}
                onChange={(e) => setCurrentSemester(e.target.value)}
              >
                <option value="">-- Select Semester --</option>
                {Semester.map((sem, id) => (
                  <option value={sem} key={id}>{sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Select Department</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={CurrentDepatment}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">-- Select Department --</option>
                {Department.map((dep, id) => (
                  <option value={dep} key={id}>{dep}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Program & Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Select Program</label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={CurrentProgarm}
                onChange={(e) => setProgram(e.target.value)}
              >
                <option value="">-- Select Program --</option>
                {Program.map((prog, id) => (
                  <option value={prog} key={id}>{prog}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Profile Picture</label>
              <input type="file" className="w-full" onChange={handleProfileChange} />
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block font-medium text-gray-700 mb-2">Select Role</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Student"
                  onChange={() => setRole("Student")}
                />
                Student
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="Faculty"
                  onChange={() => setRole("Faculty")}
                />
                Faculty
              </label>
            </div>
          </div>

          {/* Link + Submit */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/LMS/Login" className="text-sm text-blue-600 hover:underline">
              Already have an account?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewAccount;
