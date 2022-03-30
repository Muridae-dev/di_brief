const express = require("express");
const router = express.Router();
const {
    setTrade,
    getTrade,
    deleteTrade
} = require("../controllers/tradeController");

const {protect} = require("../middleware/authMiddleware");

router.route("/").get(protect, getTrade).post(protect, setTrade);
router.route("/:id").delete(protect, deleteTrade);

module.exports = router;