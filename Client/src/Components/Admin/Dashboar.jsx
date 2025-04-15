import axios from "axios";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import Navbar from "../Navbar";
import  { Toaster } from 'react-hot-toast';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [Showstudents, setStudentsShow] = useState([]);
  const [Name, setname] = useState("");
  const [Markall, setCheckattandance] = useState(false);

  // const notify = () => 


  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get("http://localhost:3000/GetAll");
        const updatedStudents = response.data.map((student) => ({
          ...student,
          checked: false,
        }));
        setStudents(updatedStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    getAll();
  }, []);

  useEffect(() => {
    const getName = async () => {
      let id = localStorage.getItem("Id");
      const response = await axios.post("http://localhost:3000/LMS/name", {
        id: id,
      });
      setname(response.data.message);
    };
    getName();
  }, []);

  const Getdetails = async (studentname) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/LMS/GetStudent",
        { studentname }
      );
      setStudentsShow(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const Check = () => {
    const updated = students.map((student) => ({
      ...student,
      checked: !Markall,
    }));
    setCheckattandance(!Markall);
    setStudents(updated);
  };

  const handleCheckboxChange = (index) => {
    const updatedItems = [...students];
    updatedItems[index].checked = !updatedItems[index].checked;
    setStudents(updatedItems);
  };

  return (
    <>
    <Navbar/>
      <Auth />
      <div className="max-w-6xl mx-auto my-10 bg-white p-8 rounded-3xl shadow-2xl space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">
            📅 Attendance Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Welcome, <span className="text-blue-600 font-semibold">{Name}</span>
          </p>
        </div>
        {/* <button onClick={notify}>Make me a toast</button> */}
        <Toaster />
        {/* Date and Time Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time</label>
            <input
              type="time"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          <label className="text-gray-700 text-sm">✅ Present All</label>
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer"
            onChange={Check}
            checked={Markall}
          />
        </div>

        {/* Students Table */}
        {students.length === 0 ? (
          <p className="text-center text-gray-500">No students found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Student Name</th>
                  <th className="p-4 text-center">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="border-b hover:bg-gray-100 transition-all"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">
                      <button
                        onClick={() => Getdetails(student.name)}
                        className="text-blue-600 hover:underline"
                      >
                        {student.name}
                      </button>
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-600"
                        onChange={() => handleCheckboxChange(index)}
                        checked={student.checked}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md">
          <p className="text-lg font-medium text-gray-800">
            📊 Attendance Summary
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <p className="text-green-600 font-semibold">
              ✅ Present: {students.filter((s) => s.checked).length}
            </p>
            <p className="text-red-500 font-semibold">
              ❌ Absent: {students.filter((s) => !s.checked).length}
            </p>
            <p className="text-blue-600 font-semibold">
              👥 Total: {students.length}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-xl transition-all">
            Submit Attendance
          </button>
        </div>
      </div>

    </>
  );
}

export default Dashboard;
