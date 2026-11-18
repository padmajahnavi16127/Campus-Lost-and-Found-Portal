
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: ["Lost", "Found"],
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "Claimed", "Returned"],
        default: "Available"
    },
    image: {
        type: String,
        default: ""
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
