import Auth from "./Auth";
import Navbar from "../Navbar";
import { useState } from "react";
import { UploadCloud } from "react-feather";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function UploadCourse() {
  const [course, setCourse] = useState("");
  const [coursecode, setCourseCode] = useState("");
  const [InstructorName, setInstructorName] = useState("");
  const [Department, setDepartment] = useState("");
  const [semester, SetSemester] = useState("");
  const [Description, SetDescription] = useState("");
  const [File, setFile] = useState("");
  const navigate = useNavigate("");
  const departments = [
    { code: "CSE", name: "Computer Science & Engineering" },
    { code: "ECE", name: "Electronics & Communication Engineering" },
    { code: "EEE", name: "Electrical & Electronics Engineering" },
    { code: "ME", name: "Mechanical Engineering" },
    { code: "CE", name: "Civil Engineering" },
    { code: "IT", name: "Information Technology" },
  ];
  const date = Date.now();
  const semesters = [
    { year: "1" },
    { year: "2" },
    { year: "3" },
    { year: "4" },
    { year: "5" },
    { year: "6" },
    { year: "7" },
    { year: "8" },
  ];

  const handleDropdownChange = () => {
    SetSemester(event.target.value);
  };
  let Faculty = localStorage.getItem("Faculty");
  const filechange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file.name);
    }
  };
  const handleDepartment = () => {
    setDepartment(event.target.value);
  };
  let email = localStorage.getItem("Faculty");
  const SendData = async () => {
    event.preventDefault();
    if (
      course == "" ||
      coursecode == "" ||
      InstructorName == "" ||
      Department == "" ||
      semester == "" ||
      File == ""
    ) {
      console.log("fill the required details");
    } else {
      const data = {
        course,
        coursecode,
        InstructorName,
        Department,
        semester,
        Description,
        File,
        Faculty,
        date,
        email,
      };
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/LMS/UploadCourse",
        { data }
      );
      console.log(response.data.message);
      if (response.data.message == "Course Uploaded!") {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/LMS/MyCourses");
        }, 3500);
      } else {
        toast.error(response.data.message);
      }
    }
  };
  return (
    <>
      <Navbar />
      <Auth />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Upload Course
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <div>
            <label className="block text-gray-600 font-medium">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Course Title"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCourse(e.target.value)}
            />
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-gray-600 font-medium">
              Course Code
            </label>
            <input
              type="text"
              placeholder="(e.g., CS101, ME202)"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={() => setCourseCode(event.target.value)}
            />
          </div>

          {/* Instructor Name */}
          <div>
            <label className="block text-gray-600 font-medium">
              Instructor Name
            </label>
            <input
              type="text"
              placeholder="Instructor Name"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={() => {
                setInstructorName(event.target.value);
              }}
            />
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Department
            </label>
            <select
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleDepartment}
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept.code} value={dept.code}>
                  {dept.code} - {dept.name}
                </option>
              ))}
            </select>
          </div>
          {/* Semester Dropdown */}
          <div>
            <label className="block text-gray-600 font-medium">
              Select Semester
            </label>
            <select
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleDropdownChange}
            >
              <option value="">-- Select Semester --</option>
              {semesters.map((sem, index) => (
                <option key={index} value={sem.year}>
                  Semester {sem.year}
                </option>
              ))}
            </select>
          </div>

          {/* Course Description (Full Width) */}
          <div className="md:col-span-2">
            <label className="block text-gray-600 font-medium">
              Course Description
            </label>
            <textarea
              placeholder="Enter Course Description"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={() => SetDescription(event.target.value)}
            />
          </div>

          <div className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <label className="cursor-pointer flex flex-col items-center">
              <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
              <span className="text-gray-700 font-medium"></span>
              <input type="file" className="hidden" onChange={filechange} />
            </label>
            {File ? (
              <b className="text-green-500">{File}</b>
            ) : (
              <b className="text-red-500">No file Selected</b>
            )}
          </div>

          {/* Submit Button (Full Width) */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              onClick={SendData}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Submit Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UploadCourse;
