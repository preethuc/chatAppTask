import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    contact:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    }],

    profile_image: {
      type: String,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
