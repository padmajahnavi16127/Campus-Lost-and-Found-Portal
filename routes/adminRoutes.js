
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const Item = require("../models/Item");

// Get all reported items (admin only)
router.get("/items", protect, adminMiddleware, async (req, res) => {
    try {
        const items = await Item.find()
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: items.length,
            items: items
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch items",
            error: error.message
        });
    }
});

module.exports = router;
