import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Components/Student/Home';
import Login from './Components/Student/Login';
import NewAccount from './Components/Student/NewAccount';
import MyCourses from './Components/Admin/MyCourses';
import UploadCourse from './Components/Admin/UploadCourse';
import Profile from './Components/Admin/Profile';
import Studentindi from './Components/Admin/Studentindi';
import Course from './Components/Student/Course';
import Dashboard from './Components/Admin/Dashboar';
import CourseDisply from './Components/Student/CourseDisply';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/LMS/Home" element={<Home />} />
    <Route path="/LMS/MyCourses" element={<MyCourses />} />
    <Route path="/LMS/CreateCourse" element={<UploadCourse />} />
    <Route path="/CourseDisply" element={<CourseDisply />} />
    <Route path="/LMS/Login" element={<Login />} />
    <Route path="/LMS/Create" element={<NewAccount />} />
    <Route path="/LMS/Profile" element={<Profile />} />
    <Route path="/lms/student" element={<Studentindi />} />
    <Route path="/LMS/Course" element={<Course />} />
  </Routes>
</BrowserRouter>
)
