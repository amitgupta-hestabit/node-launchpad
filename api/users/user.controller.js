const {
  createStudent,
  createTeacher,
  getUserByUserEmail,
  getUserByUserId,
  getUsers,
  updateStudent,
  updateTeacher,
  updatePassword,
  teacherAssignedToStudent,
  approvedStudentOrTeacher,
  deleteUser
} = require("./user.service");

const transport = require("../../config/mailer");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createStudent: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  createTeacher: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createTeacher(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  },
  getUserByUserId: (req, res) => {
    const id = req.params.id;
    getUserByUserId(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found"
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  updateStudent: (req, res) => {
    const body = req.body;
    updateStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  updateTeacher: (req, res) => {
    const body = req.body;
    updateTeacher(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      // if (!results) {
      //   console.log(results[0]);
      //   return res.json({
      //     success: 0,
      //     message: "Record Not Found"
      //   });
      // }
      return res.json({
        success: 1,
        message: "user deleted successfully"
      });
    });
  },
  
  updatePassword: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updatePassword(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "updated successfully"
      });
    });
  },
  teacherAssignedToStudent: (req, res) => {
    const body = req.body;
    const t_id = req.body.teacher_id;
    teacherAssignedToStudent(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      // Get teacher user details
      getUserByUserId(t_id, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!result) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        result.password = undefined;
      
        // send mail with defined transport object
        transport.sendMail({
          from: 'amit.testg@gmail', // sender address
          to: result.email, // list of receivers
          subject:  "You have assigned a student", 
          html: "<h2>Hi "+ result.user_type+",</h2><br><p>You have assigned a student  by admin.</p><p>Thanks,<BR>Hestabit </p>", // plain text body
        },function(error,info){
            if(error){
              console.log(error);
            }else{
              console.log('Email has been sent successfully'+ info.response)
            }
        });
    
        return res.json({
          success: 1,
          message: "Teacher assigned to student successfully"
        });
      });
    });
  },
  
  approvedStudentOrTeacher: (req, res) => {
    const body = req.body;
    const id = req.body.id;
    approvedStudentOrTeacher(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      // Get user details
      getUserByUserId(id, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!result) {
          return res.json({
            success: 0,
            message: "Record not Found"
          });
        }
        result.password = undefined;
      // send mail with defined transport object
      transport.sendMail({
        from: 'amit.testg@gmail', // sender address
        to: result.email, // list of receivers
        subject:  "Your account have been approved", 
        html: "<h2>Hi "+ result.user_type+",</h2><br><p>You has been approved by admin.</p><p>Thanks,<BR>Hestabit </p>", // plain text body
      },function(error,info){
          if(error){
            console.log(error);
          }else{
            console.log('Email has been sent successfully'+ info.response)
          }
      });
      
      return res.json({
        success: 1,
        message: "Successfully approved",
        result:results
      });
    });
    });
  }

};
