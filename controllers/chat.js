//importing encryptions
const { encrypt, decrypt } = require('./../utils/encryptions');
//importing Models

const Chat = require('./../Models/Chat');

const { sendServerError } = require('./../utils/errors/serverError');

//@desc Adding Message To Chat
//@route POST /chat/sendMessage
//@access private

exports.sendMessage = async (req, res, next) => {
  const { sender, reciever, message, type } = req.body;
  console.log(req.body);
  if (!sender || !reciever || !message) {
    return sendServerError(res, 400, 'Sender Or Reciever Or Message Missing');
  }
  const encryptedMessages = encrypt(message);
  const messages = {
    sender: sender,
    reciever: reciever,
    text: encryptedMessages,
    type: type
  };
  let result;
  const isChat = await Chat.find({
    $or: [
      { $and: [{ sender: reciever }, { reciever: sender }] },
      { $and: [{ sender: sender }, { reciever: reciever }] }
    ]
  });
  if (isChat.length > 0) {
    const chattId = isChat[0]._id;

    await Chat.findOneAndUpdate(
      { _id: chattId },
      {
        sender,
        reciever,
        lastMessageText: message,
        lastMessageTime: Date.now(),
        $push: { messages: messages }
      }
    );
    result = await Chat.find({
      $or: [
        { $and: [{ sender: reciever }, { reciever: sender }] },
        { $and: [{ sender: sender }, { reciever: reciever }] }
      ]
    });

    result[0].messages.forEach((element) => {
      element.text = decrypt(element.text);
    });
  } else {
    const chat = await Chat.create({
      sender,
      reciever,
      lastMessageText: message,
      lastMessageTime: Date.now(),
      messages: [messages]
    });
    result = chat;
  }
  return res.status(200).json({
    success: true,
    data: result
  });
};

//@desc Getting All Chats
//@route GET /chat/getAllChats
//@access private
exports.getAllChats = async (req, res, next) => {
  const user = req.user.id;
  try {
    const chat = await Chat.find({
      $or: [{ reciever: user }, { sender: user }]
    })
      .populate({
        path: 'reciever',
        select: 'displayName profile'
      })
      .populate({
        path: 'sender',
        select: 'displayName profile'
      });

    return res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};

//@desc Getting Single Chatt
//@route GET /chat/getUserChat
//@access private
exports.getUserChat = async (req, res, next) => {
  const { sender, reciever } = req.query;
  if (!sender || !reciever) {
    return sendServerError(res, 400, 'Sender Or Reciever Or Message Missing');
  }
  try {
    const chat = await Chat.find({
      $or: [
        { $and: [{ sender: reciever }, { reciever: sender }] },
        { $and: [{ sender: sender }, { reciever: reciever }] }
      ]
    }).populate({
      path: 'reciever',
      select: 'displayName profile'
    });

    chat[0].messages.forEach((element) => {
      element.text = decrypt(element.text);
    });
    return res.status(200).json({
      success: true,
      data: chat
    });
  } catch (error) {
    return sendServerError(
      res,
      500,
      'Please check all the information is filled'
    );
  }
};
