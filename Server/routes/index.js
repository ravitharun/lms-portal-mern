var express = require('express');
var router = express.Router();
var cors = require('cors')
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require("gridfs-stream");
const { user, StudentAttendance, UploadCourse, conn, mongoURI, profile, Course } = require("../bin/database")
router.use(cors())
const mongoose = require('mongoose');

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads"); // Collection name in MongoDB
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = { filename, bucketName: "uploads" };
      resolve(fileInfo);
    });
  },
});
const upload = multer({ storage });

router.post("/LMS/new", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role, profile, Mobile,
      ParentMobile, CurrentSemester,
      CurrentProgarm,
      CurrentDepatment, } = req.body
    // checking the password and confirm password

    
    if (password != confirmPassword) {
      res.json({ message: "Password is incorrect" })

    }

    // validating the from data
    if (name == "" || email == "" || password == "" || confirmPassword == "" || role == "" || profile == "") {
      res.json({ message: "FILL THE REQUIRED DETAILS" })

    }
    else {
      const User = new user({
        name: name, email: email, password: password, confirmPassword: confirmPassword, role: role, profile: profile, CurrentSemester: CurrentSemester,
        CurrentProgarm: CurrentProgarm,
        CurrentDepatment: CurrentDepatment,

        Mobile: Mobile,
        ParentMobile: ParentMobile,
      })
      console.log(user)
      await User.save()
      res.json({ message: "Created account ".toUpperCase() })
    }
  } catch (error) {
    console.log(error)
  }
})

router.post("/LMS/login", async (req, res) => {
  const { email, password, Role } = req.body
 
  
  const check_user = await user.findOne({ email: email, password: password, role: Role })

  

  if (check_user == null) {
    res.json({ message: "User not Found !" })
  }

  else (
    res.json({ message: check_user })
  )

})

router.get("/lms/emails", async (req, res) => {
  try {
    const GetInstructorName = await UploadCourse.find({}).select("InstructorName")
 
    
    res.json({GetInstructorName})


  } catch (error) {

  }
})
// user logout
router.post("/LMS/logout", (req, res) => {

  res.json({ message: "Logout Done !" })
})
// getting all students data
router.get("/GetAll", async (req, res) => {
  try {
    const info = await user.find({ role: "Student" })
    res.json(info)
  }
  catch (err) {
    res.json({ message: err })
  }
})
// getting inivusal data from student
router.post("/LMS/GetStudent", async (req, res) => {
  try {
    const { studentname } = req.body
    const info = await user.find({ name: studentname })
    res.json({ message: info })
  } catch (error) {
    res.json({ message: error })
  }
})



// getting name based on role to display ;
router.post("/LMS/name", async (req, res) => {
  const { id } = req.body
  if (id == null) {
    console.log("null id is ")
  }
  else {

    try {
      const Name = await user.findById({ _id: id })
      res.json({ message: Name.name })
    } catch (error) {
      console.log(error)
    }
  }
})


// inserting the login  student's
let rollnum = 1;
router.get("/addStudent", async (req, res) => {
  const add = await user.find({ role: "Student" })
  for (let i = 0; i < add.length; i++) {
    const insert = new StudentAttendance({
      studentID: add[i]._id,
      name: add[i].name,
      roll: rollnum++
    });
    await insert.save()
  }
})


// uploading the course

router.post("/LMS/UploadCourse", upload.single("File"), async (req, res) => {

  try {
    const { data } = req.body
    const Newcourse = new UploadCourse({
      email: data.email,
      course: data.course,
      coursecode: data.coursecode,
      Description: data.Description,
      semester: data.semester,
      InstructorName: data.InstructorName,
      File: data.File,
      Department: data.Department,
      date: Date.now()  // Directly assign Date.now() for current timestamp
    });
    await Newcourse.save();
    res.json({ message: "Course Uploaded!" })
  } catch (error) {
    console.log(error)
  }
})
router.post("/lms/basedemail/course", async (req, res) => {

  const { Faculty } = req.body
  try {
    const response = await UploadCourse.find({ email: Faculty })
    res.json({ message: response })
  } catch (error) {
    console.log(error)
  }
})

// getting the  all course data
router.get("/LMS/UploadCourse", async (req, res) => {
  const { Faculty } = req.body
  try {

    const response = await UploadCourse.find({})
    res.json({ message: response })
  } catch (error) {

  }
})
// adding profile part 
router.post("/LMS/Profile", async (req, res) => {
  const { id, FullName, Email, preview, phoneNumber, Department, Subjects, Experience, LinkedIn, About } = req.body;
  try {
    const AddProfile = new profile({
      FullName: FullName,
      Email: Email,
      preview: preview,
      phoneNumber: phoneNumber,
      Department: Department,
      Subjects: Subjects,
      Experience: Experience,
      LinkedIn: LinkedIn,
      About: About
    })
    await AddProfile.save()
    res.json({ message: AddProfile })
  }
  catch (err) {
    console.log(err)
  }

})
// getting prfile
router.get("/lms/getprofile", async (req, res) => {
  try {
    const id = req.query.id;
    const user = await profile.findById(id);
    res.json({ message: user, data: user })
  } catch (error) {
    console.log(error)
  }
})
router.post("/LMS/User", async (req, res) => {
  try {
    const { id } = req.body;
    const response = await user.findById(id)
    res.json({ message: response })

  } catch (error) {
    console.log(error)
  }
})


// getting editin thre prfile
router.post("/lms/edit", async (req, res) => {
  try {
    const { id, FullName, Email, preview, phoneNumber, Department, Subjects, Experience, LinkedIn, About } = req.body;
    // const  = req.body;
    const edttied = await profile.findByIdAndUpdate(
      id,
      {
        FullName,
        Email,
        Subjects,
        phoneNumber: phoneNumber,
        Experience,
        LinkedIn,
        About,
        preview,
        Department,
      },
      { new: true } // optional: returns the updated document
    );

  

    res.json({ message: edttied })
  }
  catch (err) {
    console.log(err)
  }
})
// assging the course to the student
router.post("/LMS/AssignCourse", async (req, res) => {
  try {
    const { data } = req.body
    const AssignCourse = new Course({
      Student: data.Student,
      StudentEmail: data.StudentEmail,
      selectedInstructor: data.selectedInstructor
    })
    
    const response = await UploadCourse.find({ InstructorName: AssignCourse.selectedInstructor })
    res.json({ message:  AssignCourse })

    await AssignCourse.save()
  } catch (error) {
    console.log(error)
  }
})

// getting data 
router.get("/LMS/AssignedCourse", async (req, res) => {
  try {
    const { Course } = req.query; // ✅ read from query, not body
    const response = await UploadCourse.find({ InstructorName: Course });

    console.log("Fetched Assigned Course");

    res.json({ message: response });
  } catch (error) {
    console.log("Error fetching assigned course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
  

module.exports = router;
