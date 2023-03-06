const express = require('express');
const { createPost, newPostProfile, createDelete, savePost } = require('./controllers/postController');
const Post = require('./models/postModel');
const multer = require("multer");
const { registerUser, loginUser, getUser } = require('./controllers/userController');
const { storage } = require('./upload');
const { verifyUsers } = require('./middleWear/authMiddleWear');
const router = express.Router();
router.use(express.json())
// const cors = require("cors");
// router.use(express.static(path.join(__dirname, 'asset/postImage')))
// const upload = multer({dest:"asset/postImages"});
const upload = multer({storage});
// router.use(cors())
router.get('/', (req, res) =>{    
      res.render("index");
})

router.get("/new-post", (req, res) =>{
res.render("newpost");
})

router.get("/display-blog", (req, res) =>{
Post.find((err, result) =>{
                  if(err){
                        console.log("Error Occurs while fetching data");
                  }else{
                        res.send(result);
                  }
            })
})

router.post("/new-post", upload.single("file"), createPost);
router.post("/new-post/profiles/:index",newPostProfile )
router.post('/delete-post/:_id', createDelete);
router.post('/save-post/:_id',savePost);
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', verifyUsers, getUser)
      
router.get("/edit-post/:_id", (req, res) =>{
      const {_id} = req.params;
      Post.findById(_id, (err, message) =>{
            if(err){
                  console.log(err);
                  res.send("There us an error");
            }
            else if(message){
                  res.render("edit-post", {found:message})
            }
            else{
                  res.redirect("/displayData");
            }
      });
})

      module.exports = router;