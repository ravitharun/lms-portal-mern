import {  useEffect, useState } from "react";
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
  const add=async()=>{
    const res=await axios.get("http://localhost:3000/addStudent")
    console.log(res)
  }
  add()
}, [])



    
  const send = async () => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/LMS/login", {
        email,
        password,
        Role,
      });
      console.log(" response.data.message.role"+ response.data.message.role)
      if (
        response.data.message.role == "Student"
      ) {
        toast.success(
          "Welcome back! You’re now logged in." + response.data.message.role
        );
        localStorage.setItem("Role", response.data.message.role);
        localStorage.setItem("Id", response.data.message._id);
        localStorage.setItem("Faculty",response.data.message.email)
        navigate("/LMS/Home");
      } 
      else if(response.data.message.role == "Faculty"){
        localStorage.setItem("Role", response.data.message.role);
        localStorage.setItem("Id", response.data.message._id);
        localStorage.setItem("Faculty",response.data.message.email)
          navigate("/");
        }
      else if (response.data.message == "User not Found !") {
        toast.error("User Not Found !");
      } else {
        toast.error("Some thing went wrong !");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>

          {/* Email Input */}
          <label className="block text-gray-600 font-medium mt-4">Email</label>
          <input
            type="email"
            onChange={(event) => Setemail(event.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />

          {/* Password Input */}
          <label className="block text-gray-600 font-medium mt-4">
            Password
          </label>
          <input
            type="password"
            onChange={(event) => Setpassword(event.target.value)}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
          <div className="mt-4">
            <label className="block text-gray-600 font-medium mb-2">Role</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  onChange={() => setrole("Student")}
                  className="w-5 h-5 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 font-medium">Student</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  onChange={() => setrole("Faculty")}
                  className="w-5 h-5 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-gray-700 font-medium">Faculty</span>
              </label>
            </div>
          </div>
          <Link to="/LMS/Create">
            <a className="block text-center text-blue-500 font-medium mt-4 hover:underline hover:text-blue-600 transition duration-300">
              Don't have an account?
            </a>
          </Link>

          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 mt-6 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={send}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
