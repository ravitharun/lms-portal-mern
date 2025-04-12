import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Auth from "./Auth";
import axios from "axios";

function MyCourses() {
  const [getall, Setall] = useState([]);
  const [loading, setLoading] = useState(true);
  let Faculty=localStorage.getItem("Faculty")
  useEffect(() => {
    const display = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/lms/basedemail/course",{Faculty})
          Setall(response.data.message)
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    display();
  }, []);



 

  return (
    <>
      <Navbar />
      <Auth />
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">
              📘 Uploaded Course Details
            </h1>
            <center> Total Course Uploaded {getall.length}</center>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <span className="loader"></span>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                
                <thead className="bg-blue-600 text-white uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">File</th>
                    <th className="px-6 py-3 text-left">Instructor</th>
                    <th className="px-6 py-3 text-left">Course</th>
                    <th className="px-6 py-3 text-left">Code</th>
                    <th className="px-6 py-3 text-left">Semester</th>
                    <th className="px-6 py-3 text-left">Options</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getall.length > 0 ? (
                    getall.map((data, id) => (
                      <tr
                        key={id}
                        className="hover:bg-blue-50 transition-all duration-150"
                      >
                        <td className="px-6 py-4 text-gray-700">
                          {data.Department}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {data.Description}
                        </td>
                        <td className="px-6 py-4 text-blue-600 hover:underline truncate max-w-xs">
                          <a
                            href={`http://localhost:3000/uploads/${data.File}`}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {data.File}
                          </a>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {data.InstructorName}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {data.course}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {data.coursecode}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {data.semester}
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-md shadow-sm transition-all duration-200">
                            Delete
                          </button>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          <p>{new Date(data.date).toLocaleString()}</p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No course data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourses;
