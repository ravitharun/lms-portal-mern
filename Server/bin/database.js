const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/Lms";
mongoose.connect(mongoURI)
    .then((result) => {
        console.log('connected to Mongodb');
    }).catch((err) => {
        console.error(err);
    });

const conn = mongoose.connection;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    profile: { type: String, required: true },
    Mobile: { type: Number, required: true },
    ParentMobile: { type: Number, required: true },
    CurrentSemester: { type: String, required: true },
    CurrentProgarm: { type: String, required: true },
    CurrentDepatment: { type: String, required: true },
    role: { type: String, required: true, default: "student" }
});
const Attendance = new mongoose.Schema({
    studentID: { type: String },
    name: { type: String },
    date: { type: String },
    roll: { type: Number }

})

const Profile = new mongoose.Schema({
    FullName: { type: String },
    Email: { type: String },
    preview: { type: String },
    phoneNumber: { type: Number },
    Department: { type: String },
    Subjects: { type: String },
    Experience: { type: Number },
    LinkedIn: { type: String },
    About: { type: String },
});

const course = new mongoose.Schema({
    course: { type: String },
    coursecode: { type: String }, email: { type: String }, Description: { type: String }, semester: { type: String }, InstructorName: { type: String }, File: { type: String }, Department: { type: String }, date: {
        type: Date,
        default: Date.now, // Correct way to set default date
    },

})

const CourseAssignment = new mongoose.Schema({ Student: { type: String }, StudentEmail: { type: String }, selectedInstructor: { type: String } })
const user = mongoose.model('UserSchema', UserSchema);
const StudentAttendance = mongoose.model('Attendance', Attendance);
const UploadCourse = mongoose.model('UploadCourse', course);
const profile = mongoose.model("Profile", Profile);
const Course = mongoose.model("CourseAssignment", CourseAssignment);
module.exports = { user, StudentAttendance, UploadCourse, conn, mongoURI, profile,Course };