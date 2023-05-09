const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

const sendEmail = (user,url) => {
    console.log("user ops",user)
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
        name:'levelUp',
        link:'https://levelup.com'

    }
})

var email={
    body:{
        name:user.name,
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
    let mail = mailgenerator.generate(email);
  let transport=nodemailer.createTransport(config)
transport.sendMail({
    to:user.email,
    from:process.env.EMAIL_FROM,
    subject:"password reset",
    html:mail,
    
})

    

  
};

module.exports = sendEmail;