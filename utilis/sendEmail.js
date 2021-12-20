const nodemailer = require("nodemailer");
const sendgridTransport=require("nodemailer-sendgrid-transport")

const sendEmail = (options) => {


    const transport=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
transport.sendMail({
    to:options.to,
    from:process.env.EMAIL_FROM,
    subject:options.subject,
    html:options.text,
    
})

    

  
};

module.exports = sendEmail;