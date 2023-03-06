const Post = require("../models/postModel");
let userData = [];

const createPost = (req, res) =>{
            const {title, more} = req.body;
            const {filename, path} = req.file;
            console.log(req.file);
            // let filename = "";
            // if(req.file){
            //       console.log(req.file);
            //       filename = req.file.filename;
            // }
            // console.log(req.file);
            // userData.push({title, more, file:filename});
             Post.create({title, more, filename, fileLink:path}, (err, messg) => {
                  err?  res.json({
                        success:false, 
                        message:"Error occurred", 
                        status:500}): 
                        // res.json({
                        //       success:true, 
                        //       messg, 
                        //       statuscode:200});
                        res.send({messg});
            })
      }

const newPostProfile = (req, res) =>{
            const {index} = req.params;
            let certainData = userData[index];
            res.render('itemsRoutes', {certainData, index})
      }

const createDelete = (req, res) => {
            const {_id} = req.params;
            // let {index} = req.params;
            Post.deleteOne({_id}, (err, mss) => {
                  if(err){
                        console.log("Error Encounterred");
                        res.status(500).json({success:false, message:"Error occur", status:(failed)})
                  }
                  else{
                        res.json({success:true, mss})
                        // res.redirect('/displayData');
                  }
            });
        }

const savePost = (req, res) => {
            const{ _id} = req.params;
            const {title, more} = req.body;
            Post.findByIdAndUpdate(_id, {title, more}, (err, mss) =>{
                  if(err){
                        console.log(err);
                        res.send("There is an error");
                  }else{
                        // res.redirect("/displayData");
                  }
            })
            // let date = new Date().toLocaleTimeString("en");
            // userData[index] = {title, more, date};
            // // console.log(userData);
        }


module.exports = {createPost, newPostProfile, createDelete, savePost}