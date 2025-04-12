import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "./Footer";
import axios from "axios";

function Course() {
  // const [Getcourse, Setcourse] = useState({});
  const [Student, SetStudent] = useState("");
  const [StudentEmail, SetStudentEmail] = useState("");
  const [Studentinsturactor, SetStudentinsturactor] = useState([]);
  //   "https://img.freepik.com/premium-vector/2d-vector-illustration-graduation-success-college-study-training-courses-school-educational_918459-13337.jpg?ga=GA1.1.1870812209.1738312432&semt=ais_hybrid&w=740";
  useEffect(() => {
    const Getall = async () => {
      const response = await axios.get(
        "http://localhost:3000/lms/emails"
      );
      let Response=response.data.message
      SetStudentinsturactor(Response);
      // console.log()

      
    };
    Getall();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Footer></Footer>
      {/* Student Name (Input)

Student Email (Input)

Select Instructor Email (Dropdown) */}
      <div>
        <form>
          <label htmlFor=""> Student Name</label>
          <input type="text" onChange={() => SetStudent(event.target.value)} />
          <label htmlFor=""> Student Email</label>
          <input
            type="text"
            onChange={() => SetStudentEmail(event.target.value)}
          />
          <select name="" id="">
            {Studentinsturactor.map((data, id) => (
              <option value="" key={id}>
                {data.email}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}

export default Course;
