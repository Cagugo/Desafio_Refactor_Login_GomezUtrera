const { Router } = require('express');
const usersController = require('./usersController/usersController');

module.exports = (app) => {
  const router = new Router();
  app.use('/api/sessions/useradmin', router);
  
  router.get('/', usersController.getUsers);
  router.post('/recovery', usersController.recoveryUser);
  router.get('/:uid', usersController.getUserById);
  router.put('/:uid', usersController.updateUser);
  router.delete('/:uid', usersController.deleteUser);
};
