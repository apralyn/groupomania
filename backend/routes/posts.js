const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const postsCtrl = require("../controllers/posts");

router.post("/addpost", auth, multer, postsCtrl.addPost);
router.get("/feed", auth, postsCtrl.getAllPosts);
router.get("/viewpost/:id", auth, postsCtrl.viewPost);
router.put("/viewpost/:id/read", auth, postsCtrl.readPost);

// router.put("/mod/:id", multer, postsCtrl.modifyPost);
// router.delete("/delete/:id", postsCtrl.deletePost);

module.exports = router;
