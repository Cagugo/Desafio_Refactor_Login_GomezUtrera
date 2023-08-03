const { Router } = require('express');
const sessionsController = require('./sessionsController/sessionsController');
const { authPrivate, authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  
  const router = new Router();
  app.use('/api/sessions', router);
  
  router.get('/admin', authPrivate, sessionsController.getAdminSession);
  router.get('/user', authPublic, sessionsController.getUserSession);
  router.get('/session', sessionsController.getSession);
  router.get('/deletesession', sessionsController.deleteSession);
};
