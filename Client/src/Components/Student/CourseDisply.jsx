import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

function CourseDisplay() {
  const location = useLocation();
  const courseData = location.state;

  // Assuming courseData is an array, so we access the first element
  const course = courseData && courseData[0];

  

  if (!course) {
    return (
      <div className="text-red-500 text-center mt-10">
        No course data provided.
      </div>
    );
  }

  return (
    <>
    
    <Navbar/>
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg max-w-5xl mx-auto mt-10 ">
      <table class="min-w-full table-auto">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Department
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Description
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Instructor Name
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">File</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">
              Course Code
            </th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Date</th>
            <th class="px-6 py-3 text-left text-sm font-semibold">Semester</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr class="border-t border-gray-200 hover:bg-blue-50 transition duration-200">
            <td class="px-6 py-4 text-sm">{course.Department}</td>
            <td class="px-6 py-4 text-sm">{course.Description}</td>
            <td class="px-6 py-4 text-sm">{course.InstructorName}</td>
            <td class="px-6 py-4 text-sm">{course.File}</td>
            <td class="px-6 py-4 text-sm">{course.coursecode}</td>
            <td class="px-6 py-4 text-sm">{course.date}</td>
            <td class="px-6 py-4 text-sm">{course.semester}</td>
          </tr>
          {/* <!-- Add more rows as needed --> */}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default CourseDisplay;
