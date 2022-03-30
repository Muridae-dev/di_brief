const mongoose = require("mongoose");

const tradeSchema = mongoose.Schema({
    itemId: {
        type: String,
        required: true,
    },
    seller: {
        type: String,
        required: true,
    },
    buyer: {
        type: String,
        required: true,
    },
    buyername: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Trade", tradeSchema);