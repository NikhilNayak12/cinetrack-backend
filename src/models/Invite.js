import mongoose from "mongoose";
import crypto from "crypto";

const inviteSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["judge"],
      default: "judge"
    },
    expiresAt: {
      type: Date,
      required: true
    },
    used: {
      type: Boolean,
      default: false
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

inviteSchema.index({ token: 1 });

export const generateInviteToken = () =>
  crypto.randomBytes(32).toString("hex");

const Invite = mongoose.model("Invite", inviteSchema);
export default Invite;
