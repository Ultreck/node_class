const { genSalt, hash } = require("bcrypt");
const mongoose = require("mongoose");

const  userSchema = mongoose.Schema({
      firstname: String,
      lastname: String,
      email: {
            type:String,
            unique: true,
            require: true
      },
      password: {
            type: String,
            select: false,
            require: true
      }
      
});

userSchema.pre("save", async function (){
      const {password} = this;
      try{
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            this.password = hashedPassword;

      }catch(err){
            console.log(err);
      }
})

const User = mongoose.model("User", userSchema)
module.exports = User;