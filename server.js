
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploaded images accessible
app.use("/uploads", express.static("uploads"));

// Test routes
app.get("/test", (req, res) => {
    res.send("Correct server is running!");
});

app.get("/api/test", (req, res) => {
    res.json({
        message: "API is working successfully!"
    });
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const adminRoutes = require("./routes/adminRoutes");
const claimRoutes = require("./routes/claimRoutes");

// Main routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/claims", claimRoutes);

// Frontend
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();