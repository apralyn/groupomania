const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postsCtrl = require("../controllers/posts");

router.post("/addpost", multer, postsCtrl.addPost);
router.get("/feed", postsCtrl.getAllPosts);
router.get("/viewpost/:id", postsCtrl.viewPost);
// router.put("/mod/:id", multer, postsCtrl.modifyPost);
router.post("/read/:id", postsCtrl.readPost);
// router.delete("/delete/:id", postsCtrl.deletePost);

module.exports = router;
