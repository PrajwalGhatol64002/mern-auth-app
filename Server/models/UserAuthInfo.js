import mongoose from "mongoose";

const UserAuthInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    fullName: {
      type: String,
    },
    profilePic: {
      type: String,
      default: "https://www.pngwing.com/en/free-png-zlrqq",
    },
  },
  { timestamps: true }
);

const UserAuthInfo = mongoose.model("UserAuthInfo", UserAuthInfoSchema);

export default UserAuthInfo;
