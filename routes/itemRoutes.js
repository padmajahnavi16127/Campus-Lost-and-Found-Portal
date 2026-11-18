
const express = require("express");
const router = express.Router();

const {
    createItem,
    getAllItems,
    getItemById
} = require("../controllers/itemController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Get all items
router.get("/", getAllItems);

// Get one item
router.get("/:id", getItemById);

// Create item with optional image
router.post("/", protect, upload.single("image"), createItem);

module.exports = router;
