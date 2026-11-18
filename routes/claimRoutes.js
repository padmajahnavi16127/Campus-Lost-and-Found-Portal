
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
    createClaim,
    getAllClaims,
    updateClaimStatus
} = require("../controllers/claimController");

// Student submits a claim
router.post("/", protect, createClaim);

// Admin views all claims
router.get("/", protect, adminMiddleware, getAllClaims);

// Admin updates a claim
router.put("/:id", protect, adminMiddleware, updateClaimStatus);

module.exports = router;
