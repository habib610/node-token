import crypto from "crypto";
import jwt from "jsonwebtoken";
export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString("hex");
};

export const hashToken = (token) => {
    crypto.createHash("sha256").update(token).digest("hex");
};

export const authenticateAccessToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
    });
};
