const mongoose = require("mongoose");

const  postSchma = mongoose.Schema({
      title:{
            type: String,
            require: true
      },
      more:{
            type: String,
            require: true
      },
      time:{
            type: Date,
           default:Date.now()
      },
      filename:{
            type: String,
      },
      fileLink:{
            type: String,
      }
});


// const Post = mongoose.model("user's table", postSchma)
 const Post = mongoose.model("post", postSchma);
 module.exports = Post;