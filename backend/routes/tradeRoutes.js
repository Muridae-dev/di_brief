const express = require("express");
const router = express.Router();
const {
    setTrade,
    getTrade,
} = require("../controllers/tradeController");

const {protect} = require("../middleware/authMiddleware");

router.route("/").get(protect, getTrade).post(protect, setTrade);

module.exports = router;