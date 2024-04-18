const nodemailer = require('nodemailer');


const sendEmail = async (req, res, next) => {
    const email = req.body.email


    const emailTransport = nodemailer.createTransport({
        service: "Gmail",

        auth: {
            user: "manideepvita@gmail.com",
            pass: "ovzw xoio bsge yeqv"
        }
    });

    let emailData = {
        from: "manideepvita@gmail.com",
        to: email,
        subject: "Reset Password",
        text: "908908"
    }

    emailTransport.sendMail(emailData, async (err, data) => {
        if (err) {
            console.log(err, "email not sent");
        } else {
            console.log("Email sent successfully");
        }
    })
}


module.exports = sendEmail;