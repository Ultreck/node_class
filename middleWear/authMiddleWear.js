const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyUsers = (req, res, next) =>{
      console.log(req.headers.authorization);

      jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET,
            (err, data) => {
                  if(err){
                        console.log(err)
                        res.status(401).json({
                              success: false,
                              message: "Invalid token"
                        })
                  }
                  else{
                        req.user = data
                        next();
                  }
            }
      )
}
module.exports = {verifyUsers};