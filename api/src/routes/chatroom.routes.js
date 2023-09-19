const { Router } = require("express");
const {
  getListChatsByUser,
  createPrivateChat,
  removePrivateChat,
  messagesByChat,
  newPrivateMessage,
  removeMessage,
  createGroup,
  editGroup,
  removeGroup,
  allGroups,
  addUserToGroup,
  editMessage,
  editUserRole,
  removeUserFromGroup,
  newGroupMessage,
  allGroupMessages,
  removeGroupMessage,
  editGroupMessage,
  userConversations,
} = require("../handlers/chatroom.handlers");
const {validateGroupOwner, validateId, validateProfileOwner, encryptMessage, idCleaner} = require("../middlewares");

const chatroomRoutes = Router();

chatroomRoutes.get("/chat/:id", validateId, getListChatsByUser);
chatroomRoutes.post("/chat", createPrivateChat);
chatroomRoutes.delete("/chat/:chatId", idCleaner, removePrivateChat);
chatroomRoutes.get("/chat/:chatId/messages", idCleaner, messagesByChat);
chatroomRoutes.post("/chat/:chatId/messages", idCleaner, encryptMessage, newPrivateMessage);
chatroomRoutes.put("/chat/:chatId/messages/:messageId", idCleaner, encryptMessage, editMessage);
chatroomRoutes.delete("/chat/:chatId/messages/:messageId", idCleaner, removeMessage);

chatroomRoutes.get("/groups", allGroups);
chatroomRoutes.post("/groups", createGroup);
chatroomRoutes.put("/groups/:groupId", idCleaner, validateGroupOwner, editGroup) 
chatroomRoutes.delete("/groups/:groupId", idCleaner, validateGroupOwner, removeGroup);

chatroomRoutes.post("/groups/:groupId/users", idCleaner, validateGroupOwner, addUserToGroup);
chatroomRoutes.patch("/groups/:groupId/users/:userId", idCleaner, validateGroupOwner, editUserRole);
chatroomRoutes.delete("/groups/:groupId/users/:userId", idCleaner, validateGroupOwner, removeUserFromGroup);

chatroomRoutes.get("/groups/:groupId/messages", idCleaner, allGroupMessages);
chatroomRoutes.post("/groups/:groupId/messages", idCleaner, encryptMessage, newGroupMessage);
chatroomRoutes.put("/groups/:groupId/messages/:messageId", idCleaner, encryptMessage, editGroupMessage);
chatroomRoutes.delete("/groups/:groupId/messages/:messageId", idCleaner, removeGroupMessage);

chatroomRoutes.get("/conversations/:id", validateId, validateProfileOwner, userConversations);

module.exports = chatroomRoutes;
