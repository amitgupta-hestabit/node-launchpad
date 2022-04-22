const pool = require("../../config/database");

module.exports = {
  createStudent: (data, callBack) => {
    pool.query(
      `insert into users(name, email, password, user_type,address,current_school,previous_school,parent_details,profile_picture) 
                values(?,?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.password,
        data.user_type,
        data.address,
        data.current_school,
        data.previous_school,
        data.parent_details,
        data.profile_picture
        
       ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createTeacher: (data, callBack) => {
    pool.query(
      `insert into users(name, email, password, user_type,address,current_school,previous_school,experience,expertise_in_subjects,profile_picture,created_at) 
                values(?,?,?,?,?,?,?,?,?,?,now())`,
      [
        data.name,
        data.email,
        data.password,
        data.user_type,
        data.address,
        data.current_school,
        data.previous_school,
        data.experience,
        data.expertise_in_subjects,
        data.profile_picture
        
       ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `select * from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `select * from users`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateStudent: (data, callBack) => {
    pool.query(
      `update users set name=?,user_type=?,address=?,current_school=?,previous_school=?,parent_details=?,profile_picture=?,updated_at=now() where id = ?`,
      [
        data.name,
        data.user_type,
        data.address,
        data.current_school,
        data.previous_school,
        data.parent_details,
        data.profile_picture,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateTeacher: (data, callBack) => {
    pool.query(
      `update users set name=?,address=?,current_school=?,previous_school=?,experience=?,expertise_in_subjects=?,profile_picture=?,updated_at=now() where id = ?`,
      [
        data.name,
        data.address,
        data.current_school,
        data.previous_school,
        data.experience,
        data.expertise_in_subjects,
        data.profile_picture,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from users where id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updatePassword: (data, callBack) => {
    pool.query(
      `update users set password=?, where id = ?`,
      [
        data.password,
        data.id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  teacherAssignedToStudent: (data, callBack) => {
    pool.query(
      `update users set assigned_teacher=? where id = ?`,
      [
        data.teacher_id,
        data.student_id
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  approvedStudentOrTeacher: (body, callBack) => {
    pool.query(
      `update users set is_approved=1,approved_date_time=now() where id = ?`,
      [body.id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }
};
