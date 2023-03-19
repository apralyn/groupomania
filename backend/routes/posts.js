const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/posts");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getUsers);
router.get("/:id", userCtrl.getUser);
router.put("/:id", userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;