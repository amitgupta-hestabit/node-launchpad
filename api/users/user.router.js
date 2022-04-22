const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createStudent,
  createTeacher,
  login,
  getUserByUserId,
  getUsers,
  updateStudent,
  updateTeacher,
  updatePassword,
  teacherAssignedToStudent,
  approvedStudentOrTeacher,
  deleteUser
} = require("./user.controller");
router.get("/", checkToken, getUsers);
router.post("/createStudent", createStudent);
router.post("/createTeacher", createTeacher);
router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
router.patch("/updateStudent", checkToken, updateStudent);
router.patch("/updateTeacher", checkToken, updateTeacher);
router.patch("/updatePassword", checkToken, updatePassword);
router.patch("/teacherAssignedToStudent", checkToken, teacherAssignedToStudent);
router.patch("/approvedStudentOrTeacher", checkToken, approvedStudentOrTeacher);
router.delete("/", checkToken, deleteUser);

module.exports = router;
