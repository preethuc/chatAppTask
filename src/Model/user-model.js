import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    contact: {
      type: String,
    },

    profile_image: {
      type: String,
    },
  },
  { versionKey: false }
);
const User = mongoose.model("Product", userSchema);

module.exports = User;
