import React, { useEffect, useState } from "react";
import Navbar from "../Navbar"; // Assuming Navbar component is correctly imported
import Footer from "./Footer";
import axios from "axios";
import Auth from "../Admin/Auth";
import toast, { Toaster } from "react-hot-toast";
import { ReceiptRefundIcon } from "@heroicons/react/24/outline";

function Course() {
  const [Student, SetStudent] = useState("");
  const [StudentEmail, SetStudentEmail] = useState("");
  const [selectedInstructor, setInstructor] = useState("");
  const [StudentInstructors, SetStudentInstructors] = useState([]);
  const [Course, Setcourse] = useState([]);
  const [Selected, SetSelected] = useState(true);

  useEffect(() => {
    const GetAllInstructors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/lms/emails");
        SetStudentInstructors(response.data.GetInstructorName);
      } catch (error) {
        toast.error("Error fetching instructors");
        console.error(error);
      }
    };
    GetAllInstructors();
  }, []);

  const SendData = async (event) => {
    event.preventDefault();
    const data = { Student, StudentEmail, selectedInstructor };

    if (Student === "" || StudentEmail === "" || selectedInstructor === "") {
      toast.error("Fill The Required Form Details");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/LMS/AssignCourse",
        {
          data,
        }
      );
      Setcourse(response.data.data);
      localStorage.setItem("CourseId", response.data.message._id);
      localStorage.setItem("Course", response.data.message.selectedInstructor);
      localStorage.setItem("Student", "true");

      toast.success("Course Assigned Successfully");
      SetSelected(false);

      // Optional: Reset form
      SetStudent("");
      SetStudentEmail("");
      setInstructor("");
    } catch (error) {
      toast.error("Failed to assign course");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const Course = localStorage.getItem("Course");

      try {
        const response = await axios.get(
          "http://localhost:3000/LMS/AssignedCourse",
          {
            params: { Course },
          }
        );

        Setcourse(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.error("Failed to fetch assigned course:", error);
      }
    };

    fetch();
  }, []);

  const isCourseFilled = localStorage.getItem("Student") === "true";

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      <Auth />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="min-h-screen flex flex-col bg-gray-100">
        {!isCourseFilled ? (
          <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white shadow-lg mx-auto my-10 rounded-xl">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
                Register Course
              </h2>
              <form className="space-y-5" onSubmit={SendData}>
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
                    {StudentInstructors.map((data, id) => (
                      <option value={data.InstructorName} key={id}>
                        {data.InstructorName}
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
        ) : (
          <div className="w-full flex flex-wrap gap-6 justify-start px-6 py-6">
            <div className="w-full text-center mb-8">
              <h2 className="text-2xl font-bold text-blue-700">
                Total Courses: {Course.length}
              </h2>
            </div>
            {Course.map((data, id) => (
              <div
                key={id}
                className="bg-white shadow-lg rounded-lg overflow-hidden w-72 sm:w-80 md:w-96 hover:scale-105 transition-transform duration-300 transform"
              >
                <img
                  src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?ga=GA1.1.1870812209.1738312432&semt=ais_hybrid&w=740" // Replace with real image URL
                  alt="Course"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {data.Department}
                  </h3>
                  <p className="text-gray-700 mt-2">
                    Instructor: {data.InstructorName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Course Name: {data.CourseName}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Course;
