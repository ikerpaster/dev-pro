import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const createConversation = async (req, res, next) => {
   try {

    const newConversation = new Conversation({
      id: req.isAgent ? req.userId + req.body.to : req.body.to + req.userId,
      agentId: req.isAgent ? req.userId : req.body.to,
      clientId: req.isAgent ? req.body.to : req.userId,
      readByAgent: req.isAgent,
      readByClient: !req.isAgent,
    });


    // check if conversion is exist 
    const isConvExist = await Conversation.findOne({id:newConversation.id});
    if(isConvExist) return next(createError(404,"Conversation is Already Exist!!"));

    // check if the users are real /
    const user1 = await User.findById(req.userId);
    if(!user1) return next(createError(404,"Sender User notFound"));
    
    const user2 = await User.findById(req.body.to);
    if(!user2) return next(createError(404,"Receiver User notFound"));
    

    // check and push the conv to the user 
    // const agent = await userModel.findById(agentId);
    const savedConversation = await newConversation.save();

    user1.conversation.push(savedConversation._id);
    await user1.save();
    user2.conversation.push(savedConversation._id);
    await user2.save();


    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
    console.log(err);
    // return next(createError(404,"Samething goes wrong!!"));
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isAgent ? { readByAgent: true } : { readByClient: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};

export const getConversations = async (req, res, next) => {

  try {

    // check if the usser is agent or client 
const user = await User.findById(req.userId);
if(!user) return next(createError(404,"User notFound "));

let isAgent = true;
if(user.role === 'isClient'){
  isAgent = false;
}

    const conversations = await Conversation.find(
      isAgent ? { agentId: req.userId } : { clientId: req.userId }
    ).sort({ updatedAt: -1 }).populate('agentId').populate('clientId');

    if(!conversations) return next(createError(404,"samething happens now!!!"));
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
