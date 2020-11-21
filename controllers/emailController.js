const nodemailer = require("nodemailer");
const EmailMessage =  {};



EmailMessage.sendMessage = function(req, res){
    const sender = req.body.sender,
          message = req.body.message,
          subject = req.body.subject;

          async function main(sender, subject, message) {

            let transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true, // true for 465, false for other ports
              auth: {
                user: "adenusidamilola5@gmail.com", 
                pass: "08100897169gmail.com", 
              },
            });
          
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: sender,
              to: "adenusidamilola5@gmail.com", 
              subject: subject,
              text: message
            }, (error, info)=>{
              if(error){
                res.send({Messagesent: null});  
              }else{
                res.send({Messagesent: info.messageId});  
              }
            });
        }
        
        main(sender, subject, message);

}

module.exports = EmailMessage;