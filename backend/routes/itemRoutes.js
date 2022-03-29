const express = require("express");
const router = express.Router();
const { 
    getItem,
    setItem,
    updateItem,
    deleteItem, 
    } = require("../controllers/itemController")

const {protect} = require("../middleware/authMiddleware");
const {upload} = require("../middleware/itemMiddleware");

// Using protect middleware
// This will allow only users own items to appear
router.route("/").get(protect, getItem).post(protect, upload.single("picture"), setItem);
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem);


module.exports = router;