import axios from "axios";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";

function InstructorProfile() {
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [Department, setDepartment] = useState("");
  const [Subjects, setSubjects] = useState("");
  const [Experience, setExperience] = useState("");
  const [LinkedIn, setLinkedIn] = useState("");
  const [preview, setPreview] = useState(null);
  const [About, setAbout] = useState("");
  const [Getdata, setdata] = useState([]);
  const [check, setcheck] = useState(false);

  const Saveprofile = async () => {
    if (
      FullName === "" &&
      Email === "" &&
      phoneNumber === "" &&
      Department === "" &&
      Subjects === "" &&
      Experience === "" &&
      LinkedIn === "" &&
      About === ""
    ) {
      alert("FILL THE FORM DETAILS");
    } else if (phoneNumber.length !== 10) {
      alert("THE PHONE NUMBER SHOULD BE 10 DIGITS");
    } else {
      const response = await axios.post("http://localhost:3000/LMS/Profile", {
        FullName,
        Email,
        preview: preview,
        phoneNumber,
        Department,
        Subjects,
        Experience,
        LinkedIn,
        About,
      });
      localStorage.setItem("Profile", response.data.message._id);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setPreview(imgUrl);
    }
  };

  useEffect(() => {
    const getdata = async () => {
      const id = localStorage.getItem("Profile");
      if (!id) {
        alert("Add Your Profile");
      } else {
        try {
          const response = await axios.get("http://localhost:3000/lms/getprofile", {
            params: { id },
          });

          setdata(response.data.message);
          setcheck(true);
          setFullName(response.data.message.FullName || "");
          setEmail(response.data.message.Email || "");
          setPhoneNumber(response.data.message.PhoneNumber || "");
          setDepartment(response.data.message.Department || "");
          setSubjects(response.data.message.Subjects || "");
          setExperience(response.data.message.Experience || "");
          setLinkedIn(response.data.message.LinkedIn || "");
          setAbout(response.data.message.About || "");
          setPreview(response.data.message.preview || null);
          
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    getdata();
  }, []);

  const Edit = async() => {
    const id = localStorage.getItem("Profile");

    const response=await axios.post("http://localhost:3000/lms/edit",{id,FullName,Email,Subjects,phoneNumber,Experience,LinkedIn,About,preview,Department})
    alert(response.data.message)
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-white shadow">
        <Navbar />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex justify-center items-start px-4 py-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h2 className="text-2xl font-semibold text-blue-700">
              Instructor Profile
            </h2>
          <div className="flex flex-col items-center mb-6">
            <img
              src={preview}
              alt={preview==null?"No Photo Added":null}
              className="w-28 h-28 rounded-full object-cover shadow mb-4"
            />
            <b className="text-red-500">{preview==null?"No Photo Added":null}</b>
         
            <div className="text-center">
  <p className="text-lg text-gray-800">
    Hello, <span className="text-blue-600 font-medium">{FullName.toUpperCase()}</span>
  </p>
</div>

            <p className="text-gray-500 text-sm text-center">
              Update your professional information
            </p>
          </div>

          <form className="grid gap-4 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                value={Department}
                onChange={(e) => setDepartment(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">Subjects Taught</label>
              <input
                type="text"
                value={Subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
              <input
                type="number"
                value={Experience}
                onChange={(e) => setExperience(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">LinkedIn</label>
              <input
                type="url"
                value={LinkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">About / Bio</label>
              <textarea
                rows={4}
                value={About}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Upload New Profile Photo
              </label>
              <input
                type="file"
                className="mt-2 w-full cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          </form>

          <div className="text-center mt-6">
            {check ? (
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                onClick={Edit}
              >
                Edit
              </button>
            ) : (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                onClick={Saveprofile}
              >
                SaveProfile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default InstructorProfile;
