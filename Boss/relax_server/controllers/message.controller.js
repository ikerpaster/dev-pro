import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";


export const createMessage = async (req, res, next) => {
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.userId,
    desc: req.body.desc,
  });

  try {
    const savedMessage = await newMessage.save();

    // Emit a socket event to the conversation room
    const io = req.app.get('socketio'); // Get the reference to io from the app
    io.to(req.body.conversationId).emit('new-message', savedMessage);

    await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readByAgent: req.isAgent,
          readByClient: !req.isAgent,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(savedMessage);
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};

