
const Item = require("../models/Item");

// Create a new item
const createItem = async (req, res) => {
    try {
        const {
            itemName,
            category,
            description,
            location,
            date,
            type
        } = req.body;

        const item = new Item({
            itemName,
            category,
            description,
            location,
            date,
            type,
            postedBy: req.user.id,
            image: req.file ? "/uploads/" + req.file.filename : ""
        });

        await item.save();

        res.status(201).json({
            message: "Item reported successfully",
            item
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating item",
            error: error.message
        });
    }
};

// Get all items
const getAllItems = async (req, res) => {
    try {
        const { type, category, location } = req.query;

        let filter = {};

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        const items = await Item.find(filter)
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            items
        });

    } catch (error) {
        res.status(500).json({
            message: "Error loading items"
        });
    }
};

// Get one item by ID
const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
            .populate("postedBy", "name email");

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            item
        });

    } catch (error) {
        res.status(500).json({
            message: "Error loading item"
        });
    }
};

module.exports = {
    createItem,
    getAllItems,
    getItemById
};
