const { compare } = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const { sendMail } = require("../node");
dotenv.config();
const registerUser = (req, res) =>{
const {firstname, lastname, email, password} = req.body;
// console.log(firstname, lastname, email, password);
User.find({email}, (err, mss) =>{err? console.log(err):
User.create({firstname, lastname, email, password}, async(err, data) =>{
      console.log(data);
      if(err){
            res.status(500).json({
                  success:false,
                  message: err
            })
      }else{
            try{
                 await sendMail({
                  to: email,
                  subject: "Registration successfull",
                  html: `
                  <div className="text">
                        <h3 className="text" style="font-size: 20px">Welcome</h3>
                        <p className="text">You're welcome ${firstname} to node class</p>
                  </div>
                  `
                 })
            }catch(err){
                  console.log("Error occured when sending an email");
            }
            res.json({
                  success: true,
                  message: "User registration successful",
                  data
            })
      }
})
})
}

const loginUser = (req, res) =>{
      const {email, password} = req.body;
      User.findOne({email}).select("+password").exec(async(err, data) =>{
            if(err){
                  res.status(500).json({
                        success: false,
                        message: err
                  })
            }else{
                  if(data){
                        const validPassword = await compare(password, data.password);
                        if(validPassword){
                              const token = jwt.sign({email:data.email, id:data._d}, process.env.JWT_SECRET, {expiresIn: 60})
                              data.password = "";
                              res.json({
                                    token,
                                    success: true,
                                    message: "Login successful",
                                    data:{firstname:data.firstname, lastname:data.lastname},
                                    // data
                              })
                        }else{
                              res.status(400).json({
                                    success: false,
                                    message: err
                              })
                        }
                  }else{
                        res.status(400).json({
                              success: false,
                              message: "Email dies nit match any details"
                        })
                  }
                  // res.send(data)
            }
      })
}

const getUser =  (req, res) =>{
res.send("User is here");
User.findOne(req.user._id, (err, data) =>{
      if(err){
            res.status(500).json({
                  success: false,
                  data,
                  message: "An error occurred while fetching user profile",
            })
      }
      else{
            sendMail(email)
            res.json({
                  success: true,
                  message: "User profile fetched"
            })
      }
})
}


module.exports = {registerUser, loginUser, getUser}