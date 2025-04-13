import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");
  const [Role, setrole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const add = async () => {
      const res = await axios.get("http://localhost:3000/addStudent");
      console.log(res);
    };
    add();
  }, []);

  const send = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/LMS/login", {
        email,
        password,
        Role,
      });
      if (response.data.message.role === "Student") {
        toast.success("Welcome back! You’re now logged in as Student.");
        localStorage.setItem("Role", response.data.message.role);
        localStorage.setItem("Id", response.data.message._id);
        localStorage.setItem("Faculty", response.data.message.email);
        navigate("/LMS/Home");
      } else if (response.data.message.role === "Faculty") {
        localStorage.setItem("Role", response.data.message.role);
        localStorage.setItem("Id", response.data.message._id);
        localStorage.setItem("Faculty", response.data.message.email);
        navigate("/");
      } else if (response.data.message === "User not Found !") {
        toast.error("User Not Found !");
      } else {
        toast.error("Something went wrong !");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed!");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen flex">
        {/* Left Form Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
          <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
              Login
            </h2>

            {/* Email Input */}
            <label className="block text-gray-700 font-medium mt-4">Email</label>
            <input
              type="email"
              onChange={(event) => Setemail(event.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />

            {/* Password Input */}
            <label className="block text-gray-700 font-medium mt-4">Password</label>
            <input
              type="password"
              onChange={(event) => Setpassword(event.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />

            {/* Role Selection */}
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Role</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    onChange={() => setrole("Student")}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Student</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    onChange={() => setrole("Faculty")}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Faculty</span>
                </label>
              </div>
            </div>

            {/* Sign up Link */}
            <Link to="/LMS/Create">
              <p className="text-center text-blue-500 mt-4 hover:underline">
                Don’t have an account?
              </p>
            </Link>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 mt-6 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={send}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Side Visual (Optional) */}
        <div className="hidden md:flex md:w-1/2 bg-blue-100 items-center justify-center p-10">
          <img
            src="https://img.freepik.com/premium-vector/campus-collage-university-education-logo-design-template_7492-59.jpg?w=2000"
            alt="Login Visual"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
