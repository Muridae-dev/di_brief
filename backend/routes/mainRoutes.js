const express = require("express");
const router = express.Router();
const { 
    getAllItem} = require("../controllers/itemController")

const {protect} = require("../middleware/authMiddleware");

// Using protect middleware
// This will allow only users own items to appear
router.route("/").get(protect, getAllItem)


module.exports = router;