const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

const sendEmail = (options,url) => {
const config={
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
}

var mailgenerator=new Mailgen({
    theme:'default',
    product:{
        name:'levelUp'
    }
})

var email={
    body:{
        name:options.name,
        intro:"How are you doing? Have you requested for a password reset?", 
        action:{
            instructions:"Please click the button below to reset your password",
            button:{
                color:'#52489F',
                text:'Reset your password',
                link:url
            }
        }
    }
}

  let transport=nodemailer.createTransport(config)
transport.sendMail({
    to:options.to,
    from:process.env.EMAIL_FROM,
    subject:options.subject,
    html:options.text,
    
})

    

  
};

module.exports = sendEmail;