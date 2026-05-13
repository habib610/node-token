import "colors";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
    .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nodetoken")
    .then(() => {
        console.log("MongoDB Connected".cyan.underline);
        // seedData();
    })
    .catch((err) =>
        console.log(`MongoDB connection error: ${err.message}`.red.bold),
    );

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.get("/", async (req, res) => {
    await res.send("API is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});
