import Navbar from "../Navbar";
import Dashboar from "../Admin/Dashboar";
import Auth from "../Admin/Auth";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

function Home() {
  const [GetUser, Setuser] = useState("");
  const id = localStorage.getItem("Id");

  useEffect(() => {
    const Get = async () => {
      const response = await axios.post("http://localhost:3000/LMS/User", {
        id,
      });
      Setuser(response.data.message);
    };
    Get();
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      <Auth />
      <div className="min-h-screen bg-gray-100 py-10 px-6">
     

        <div className="mb-6 px-6">
     
          <h3 className="text-xl font-semibold text-gray-800">
          Dashboard, {GetUser.name} 👋
          </h3>
          <p className="text-sm text-gray-600">
            Welcome back to your LMS dashboard.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Left profile card */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg">
            <div className="flex flex-col items-center">
              <img
                src={GetUser.profile}
                alt={GetUser.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-300 mb-4"
              />
              {/* Added Semester/Dept/Program UI */}
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold text-gray-700 mb-1 border-b pb-2 border-gray-300">
                  {GetUser.name}
                </h3>
                <div className="text-l font-medium text-gray-700 border-b border-gray-400 pb-2">
                  {GetUser.CurrentSemester} - {GetUser.CurrentDepatment} -{" "}
                  {GetUser.CurrentProgarm}
                </div>
                <p className="text-sm text-gray-700 mt-1 border-b border-gray-400 pb-2">
                  {GetUser.CurrentSemester} - {GetUser.CurrentDepatment}
                </p>
              </div>
            </div>
            {/* Table below */}
            <div className="mt-6">
              <table className="w-full text-sm text-left text-gray-700">
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Email : </td>
                    <td className="py-2" title="Student Email">
                      {GetUser.email}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Role : </td>
                    <td className="py-2" title={GetUser.role}>
                      {GetUser.role}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Mobile : </td>
                    <td className="py-2" title="Student Mobile">
                      {GetUser.Mobile}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 font-medium">Parent Mobile : </td>
                    <td className="py-2" title="ParentMobile">
                      {GetUser.ParentMobile}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full md:w-2/3">
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-600">
              <p className="text-lg">
                Welcome to your LMS portal, {GetUser.name}!
              </p>
              <p className="mt-2">
                You can view your enrolled courses, track progress, and manage
                your profile here.
              </p>
              <h3>Notification</h3>
            </div>
          </div>
        </div>

        {/* Quick Overview Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 border-b border-gray-300 pb-2 mb-3">
              Quick Overview
            </h3>

            <div className="flex items-center justify-between mb-3 text-sm text-gray-700">
              <span className="font-medium">Attendance</span>
              <span className="text-green-600 font-semibold"><b>92%</b></span>
            </div>

            <div className="flex items-center justify-between mb-3 text-sm text-gray-700">
              <span className="font-medium">CGPA</span>
              <span className="text-blue-600 font-semibold"><b>8.3</b></span>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-500 mb-1">
                Today's Tasks
              </h4>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                <li>Revise Unit 3 (AI)</li>
                <li>Complete DS Assignment</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-600 border-b border-gray-300 pb-2 mb-3">
              Pending Assignment
            </h3>

            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr>
                  <th className="py-2 font-medium" style={{ width: "10%" }}>
                    SI No.
                  </th>
                  <th className="py-2 font-medium" style={{ width: "30%" }}>
                    Subject
                  </th>
                  <th className="py-2 font-medium" style={{ width: "25%" }}>
                    Due Date
                  </th>
                  <th className="py-2 font-medium" style={{ width: "25%" }}>
                    Submit Date
                  </th>
                  <th className="py-2 font-medium" style={{ width: "10%" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">1</td>
                  <td className="py-2">Artificial Intelligence</td>
                  <td className="py-2">2025-04-20</td>
                  <td className="py-2">2025-04-18</td>
                  <td className="py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Submit
                    </button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">2</td>
                  <td className="py-2">Data Structures</td>
                  <td className="py-2">2025-04-25</td>
                  <td className="py-2">2025-04-22</td>
                  <td className="py-2">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                      Submit
                    </button>
                  </td>
                </tr>
                {/* Add more rows as necessary */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
