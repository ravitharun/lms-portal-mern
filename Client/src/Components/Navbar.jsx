import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

function Navbar() {
  const [role, setRole] = useState(localStorage.getItem("Role") || ""); // Track role state
  const [isLogin, setIsLogin] = useState(!!role); // Convert role presence into boolean
  const [ProfileImg, SetProfileimg] = useState("");
  const [UserName, SetUserName] = useState("");
  localStorage.setItem("isLogin", isLogin);
  const StudentNavigation = [
    { name: "Home", href: "/LMS/Home", current: true },
    { name: "Courses", href: "/LMS/Course", current: false },
    { name: "Assignments", href: "/LMS/About", current: false },
    { name: "Timetable  ", href: "/LMS/Contact", current: false },
    { name: " Attendance  ", href: "/LMS/ Attendance ", current: false },
    { name: "  Results   ", href: "/LMS/ Exams ", current: false },
    { name: " Submissions    ", href: "/LMS/ Exams ", current: false },
    { name: "Announcements    ", href: "/LMS/ Exams ", current: false },
  ];

  const InstructorNavigation = [
    { name: "Dashboard", href: "/", current: true },
    { name: "My Courses", href: "/LMS/MyCourses", current: false },
    { name: "Create Course", href: "/LMS/CreateCourse", current: false },
    { name: "Assignments", href: "/LMS/Assignments", current: false },
    { name: "Student Progress", href: "/LMS/StudentProgress", current: false },
  ];

  useEffect(() => {
    // Listen for changes in localStorage
    const handleStorageChange = () => {
      const newRole = localStorage.getItem("Role") || "";
      setRole(newRole);
      setIsLogin(!!newRole);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const Signout = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post("http://localhost:3000/LMS/logout");
      console.log(response.data.message);
      if (response.data.message == "Logout Done !") {
        localStorage.removeItem("Role"); // Clear role from storage
        localStorage.removeItem("Id"); // Clear role from storage
        localStorage.removeItem("Profile"); // Clear role from storage
        localStorage.removeItem("Faculty"); // Clear role from storage
        localStorage.removeItem("isLogin"); // Clear role from storage
        localStorage.removeItem("CourseId"); // Clear role from storage
        localStorage.removeItem("Course"); // Clear role from storage
        window.location.reload();
        setRole(""); // Reset role in state
      }
      setIsLogin(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  useEffect(() => {
    const getimg = async () => {
      const id = localStorage.getItem("Profile");
      const response = await axios.get("http://localhost:3000/lms/getprofile", {
        params: { id },
      });
      SetProfileimg(response.data.data);
      SetUserName(response.data.data.FullName);
    };
    getimg();
  }, []);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <img
              alt="Your Company"
              src="https://img.freepik.com/premium-vector/campus-collage-university-education-logo-design-template_7492-59.jpg?w=2000"
              className="h-8 w-auto"
            />
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {(role === "Faculty"
                  ? InstructorNavigation
                  : StudentNavigation
                ).map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    } rounded-md px-3 py-2 text-sm font-medium`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications & Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
            >
              <BellIcon className="size-6" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none">
                  <img
                    alt=""
                    title={UserName.toUpperCase()}
                    src={ProfileImg}
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition">
                <MenuItem>
                  {role == "Faculty" ? (
                    <a
                      // href="/LMS/Profile"
                      // href="/LMS/StudentProfile"
                      href="/LMS/Profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  ) : (
                    <a
                      href="/LMS/StudentProfile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {isLogin ? (
                    <button
                      onClick={Signout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  ) : (
                    <a
                      href="/LMS/Login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </a>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {(role === "Student" ? StudentNavigation : InstructorNavigation).map(
            (item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className={`${
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                } block rounded-md px-3 py-2 text-base font-medium`}
              >
                {item.name}
              </DisclosureButton>
            )
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Navbar;
