const express = require("express");
const router = express.Router();
const { 
    registerUser,
    loginUser,
    getMe,
} = require("../controllers/userController")
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser)
router.post("/login", loginUser)
// Goes through authMiddleware
// Checks if there is an active token
router.get("/me", protect, getMe)

module.exports = router;