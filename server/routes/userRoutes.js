const express = require("express");
const router = express.Router();
const { registerUser,loginUser,profileController } = require("../controllers/userController");
const authMiddleware= require("../middlewares/authmiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, profileController);

module.exports = router;