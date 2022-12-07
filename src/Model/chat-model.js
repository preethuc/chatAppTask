import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    message: {
      type: String,
    },
    message_status: {
        type: String,
        enum:["Send","Read","Delivered"]
    },
  },
  { versionKey: false }
);
const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
