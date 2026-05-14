import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    tokenHash: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false },
    replacedByToken: String,
    createdAt: { type: Date, default: Date.now },
});
// Auto delete expired token
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", RefreshTokenSchema);
