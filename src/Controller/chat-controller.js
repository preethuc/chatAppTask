import Chat from "./../Model/chat-model";

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

export const getAllChat = async (req, res) => {
    try {
      const data = await Chat.find();
      return res.status(201).json({
        status: "Success",
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
  