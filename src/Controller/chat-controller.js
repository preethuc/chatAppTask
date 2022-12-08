import Chat from "./../Model/chat-model";
import User from "./../Model/user-model";
//POST - create Chat
export const createChat = async (req, res) => {
  try {
    const data = await Chat.create(req.body);
    return res.status(201).json({
      status: "Success",
      message: "Chat created",
      Data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Error",
      error: err.message,
    });
  }
};

//GET - all Chat
export const getAllChat = async (req, res) => {
  try {
    const data = await Chat.find();
    return res.status(201).json({
      status: "Success",
      result: data.length,

      message: "All Chats",
      Data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Error",
      error: err.message,
    });
  }
};

// GET by ID - Last Message and Delivered Message count
export const getLastMessageList = async (req, res) => {
  try {
    let _id = req.params.id;
    const userData = await User.findById(_id);
    const contacts = userData.contact;
    // console.log(contacts);
    let userChat = [];
    contacts.forEach(async (anotherUserDetails, index) => {
      // console.log(anotherUserDetails);
      let lastChat = {};
      const chatData = await Chat.find({
        $or: [
          { sender: _id, receiver: anotherUserDetails },
          { sender: anotherUserDetails, receiver: _id },
        ],
      });
      const lastChatDatas = chatData.length - 1;
      const finalChat = chatData[lastChatDatas];
      // console.log(chatData[lastChatDatas]);
      const countMessageType = await Chat.find({
        $or: [
          { sender: finalChat.sender, receiver: finalChat.receiver },
          { sender: finalChat.receiver, receiver: finalChat.sender },
        ],
      });
      let statusCount = [];
      countMessageType.forEach(async (element, index, array) => {
        if (element.message_status === "Delivered") {
          statusCount.push(1);
        }
        if (index === array.length - 1) {
          if (finalChat.sender === _id) {
            let anotherUser = await User.findById(finalChat.receiver);
            lastChat.name = anotherUser.name;
            lastChat.message = finalChat.message;
            lastChat.unreadMessage_count = statusCount.length;
            userChat.push(lastChat);
          }
          if (finalChat.receiver === _id) {
            let anotherUser = await User.findById(finalChat.sender);
            lastChat.name = anotherUser.name;
            lastChat.message = finalChat.message;
            lastChat.unreadMessage_count = statusCount.length;
            userChat.push(lastChat);
          }

          if (userChat.length === contacts.length) {
            res.status(200).json({
              status: "success",
              message: "Last Message of User",
              Message: userChat,
            });
          }
        }
      });
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Error",
      error: err.message,
    });
  }
};
