import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import {
    generateAccessToken,
    generateRefreshToken,
    hashToken,
} from "../helpers/tokenHelpers.js";
import RefreshToken from "../models/RefreshToken.js";
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
            id: user.id,
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        RefreshToken.create({
            tokenHash: hashToken(refreshToken),
            user: user._id,
            expiresAt: new Date(
                Date.now() + process.env.REFRESH_TOKEN_DAYS * 86400000,
            ),
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
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

    const tokenHash = hashToken(refreshToken);
    const stored = await RefreshToken.findOne({ tokenHash });

    if (!stored || stored.revoked || stored.expiresAt < new Date()) {
        if (stored) {
            await RefreshToken.updateMany(
                { user: stored.user },
                { revoked: true }
            );
        }
        return res.sendStatus(403);
    }

    // Rotate
    stored.revoked = true;
    const newRefreshToken = generateRefreshToken();
    stored.replacedByToken = hashToken(newRefreshToken);
    await stored.saved()


    await RefreshToken.create({
        tokenHash: hashToken(newRefreshToken),
        user: stored.user,
        expiresAt: new Date(
            Date.now() + process.env.REFRESH_EXPIRES_DAYS * 86400000
        )
    })

    const accessToken = generateAccessToken({ id: stored.user });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false
    });

    res.json({ accessToken });


});

router.post("/logout", (req, res) => {
    const token = req.cookies.refreshToken;
    if (token) {
        await RefreshToken.findOneAndUpdate(
            { tokenHash: hashToken(token) },
            { revoked: true }
        );
    }
    res.clearCookie("refreshToken");
    res.sendStatus(204);
});

export default router;
