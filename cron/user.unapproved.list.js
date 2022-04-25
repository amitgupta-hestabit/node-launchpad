var cron = require('node-cron');
const {unapprovedUserList} = require("../api/users/user.service");
const transport = require("../config/mailer");
let task = cron.schedule('0 0 * * *', () => {
    unapprovedUserList((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if(results){

            // const userList = results.map(function(element){
            //     return element.name + " | " + element.email + " | " + element.user_type;

            // });
            let ulist='User Name | User Email | User Type <Br>';
            for(let i=0;i<results.length;i++){
                ulist += results[i].name + " | " + results[i].email + " | " + results[i].user_type+"<BR>";
            }
            //console.log(ulist);
            const mailData = {
                from: process.env.SMTP_USER, // sender address
                to: process.env.ADMIN_MAIL, // admin mail receivers
                subject:  "UnApproved User List", 
                html: "<h2>Hi admin,</h2><br><p>UnApproved User List.</p>"+ulist+"<p>Thanks,<BR>Hestabit </p>", // plain text body
            }

           // send mail with defined transport object
            transport.sendMail(mailData,function(error,info){
              if(error){
                console.log(error);
              }else{
                console.log('Email has been sent successfully'+ info.response)
              }
            });
        }
    });
});
module.exports=task;