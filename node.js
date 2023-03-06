const { createTransport } = require("nodemailer")

const sendMail = async ({to,  html, subject}) => {
const transporter = createTransport({
      host: "smtp.gmail.com",
      secure: true,
      service: "gmail",
      port: 587,
      auth: {
            user: process.env.APP_MAIL,
            pass: process.env.APP_PASSWORD 
      }
})

const info = await transporter.sendMail({
      from: process.env.APP_MAIL,
      to: emails,
      subject, 
      text,
      html
})
}
module.exports = {sendMail}