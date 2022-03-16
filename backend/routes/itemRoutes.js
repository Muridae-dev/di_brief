const express = require("express");
const router = express.Router();
const { 
    getItem,
    setItem,
    updateItem,
    deleteItem } = require("../controllers/itemController")

const {protect} = require("../middleware/authMiddleware");

// Using protect middleware
// This will allow only users own items to appear
router.route("/").get(protect, getItem).post(protect, setItem)
router.route("/:id").put(protect, updateItem).delete(protect, deleteItem)


module.exports = router;