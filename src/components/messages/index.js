const { Router } = require('express');
const messagesController = require('./messagesController/messagesController');

module.exports = (app) => {
  const router = new Router();
  app.use('/api/chat', router);

  router.get('/', messagesController.getAllMessages);
  router.post('/', messagesController.addUserMessage);
  router.delete('/:mid', messagesController.deleteUserMessage);
};
