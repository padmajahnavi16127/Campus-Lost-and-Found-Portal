
const Claim = require("../models/Claim");
const Item = require("../models/Item");

// Student submits a claim
const createClaim = async (req, res) => {
    try {
        const { itemId, message, contact } = req.body;

        const item = await Item.findById(itemId);

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        if (item.type !== "Found" || item.status !== "Available") {
            return res.status(400).json({
                message: "This item cannot be claimed"
            });
        }

        const claim = new Claim({
            item: itemId,
            claimant: req.user.id,
            message: message,
            contact: contact
        });

        await claim.save();

        res.status(201).json({
            message: "Claim submitted successfully",
            claim: claim
        });

    } catch (error) {
        res.status(500).json({
            message: "Error submitting claim"
        });
    }
};

// Admin views all claims
const getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find()
            .populate("item")
            .populate("claimant", "name email");

        res.status(200).json({
            claims: claims
        });

    } catch (error) {
        res.status(500).json({
            message: "Error loading claims"
        });
    }
};

// Admin approves or rejects a claim
const updateClaimStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (status !== "Approved" && status !== "Rejected") {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const claim = await Claim.findById(req.params.id);

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        if (claim.status !== "Pending") {
            return res.status(400).json({
                message: "Claim already processed"
            });
        }

        if (status === "Approved") {
            const item = await Item.findById(claim.item);

            if (!item || item.status !== "Available") {
                return res.status(400).json({
                    message: "Item is no longer available"
                });
            }

            item.status = "Claimed";
            await item.save();
        }

        claim.status = status;
        await claim.save();

        res.status(200).json({
            message: "Claim updated successfully",
            claim: claim
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating claim"
        });
    }
};

module.exports = {
    createClaim,
    getAllClaims,
    updateClaimStatus
};
