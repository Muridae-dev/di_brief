const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    username: {
        type: String,
        required: [true, "no username"]
    },
    text: {
        type: String,
        required: [true, "please add a text value"]
    },
    picture: {
        type: String,
        required: [true, "please add a picture"]
    },
    color: {
        type: String,
        required: false,
    },
    tags: [{
        type: String,
        required: false,
    }]
}, {
    timestamps: true,
})

module.exports = mongoose.model("Item", itemSchema)