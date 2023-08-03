const { Router } = require('express');
const authController = require('./authController/authController');

module.exports = (app) => {
  const router = new Router();
  app.use('/api/sessions/auth', router);
  
  router.post('/register', authController.register, authController.registerSuccess);
  router.get('/failregister', authController.failRegister);
  router.post('/login', authController.login);
  router.get('/logout', authController.logout);
  router.get('/github', authController.githubLogin);
  router.get('/githubcallback', authController.githubCallback, authController.githubCallbackRedirect);
};
