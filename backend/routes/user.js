const express = require("express");
const router = express.Router();
// const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// router.get("/",  auth, userCtrl.getUsers);
router.get("/:id", userCtrl.getUser);
// router.put("/:id",  userCtrl.modifyUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
