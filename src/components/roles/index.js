const { Router } = require('express');
const rolesController = require('./rolesController/rolesController');
const { authPrivate, authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  const router = new Router();

  app.use('/api/sessions', router);
  
  router.get('/admintest', authPrivate, rolesController.getAdmin);
  router.get('/usertest', authPublic, rolesController.getUser);
};
