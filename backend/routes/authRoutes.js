import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../helpers/tokenHelpers.js";
import User from "../models/User.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email);

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
        });

        res.status(201).json({ token, user: { id: user.id, username, email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 100000,
        });

        res.json({
            accessToken,
            user: { id: user.id, username: user.username, email },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        const payload = { user: { id: user.id } };
        const newAccessToken = generateAccessToken(payload);
        res.json({ accessToken: newAccessToken });
    });
});

router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
});

export default router;
