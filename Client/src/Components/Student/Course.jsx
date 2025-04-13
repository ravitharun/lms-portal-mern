import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import axios from "axios";
import Auth from "../Admin/Auth";

function Course() {
  const [Student, SetStudent] = useState("");
  const [StudentEmail, SetStudentEmail] = useState("");
  const [selectedInstructor, setInstructor] = useState("");
  const [Studentinsturactor, SetStudentinsturactor] = useState([]);

  useEffect(() => {
    const Getall = async () => {
      const response = await axios.get("http://localhost:3000/lms/emails");
      let Response = response.data.message;
      SetStudentinsturactor(Response);
    };
    Getall();
  }, []);

  return (
    <>
      <Navbar />
      <Auth />

      <div className="min-h-screen flex bg-gray-100">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white shadow-lg">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              Register Course
            </h2>
            <form className="space-y-5">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  value={Student}
                  onChange={(e) => SetStudent(e.target.value)}
                  placeholder="Enter student name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Student Email
                </label>
                <input
                  type="email"
                  value={StudentEmail}
                  onChange={(e) => SetStudentEmail(e.target.value)}
                  placeholder="Enter student email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Select Instructor Email
                </label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option disabled value="">
                    -- Select Instructor --
                  </option>
                  {Studentinsturactor.map((data, id) => (
                    <option value={data.email} key={id}>
                      {data.email}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Visual/Empty Section */}
        <div className="hidden md:block md:w-1/2 bg-blue-100 p-10">
          {/* Optional: Put an illustration or branding here */}
          <div className="h-full flex items-center justify-center">
            <img
              src="https://img.freepik.com/premium-vector/2d-vector-illustration-graduation-success-college-study-training-courses-school-educational_918459-13337.jpg"
              alt="Course Illustration"
              className="max-w-full max-h-[500px] rounded-lg"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Course;
