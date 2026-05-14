import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// Get all items
router.get("/", async (req, res) => {
    try {
        // console.log(user);
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Get item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json(item);
    } catch (err) {
        console.error(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(500).send("Server error");
    }
});

export default router;
