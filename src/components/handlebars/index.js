const { Router } = require('express');
const handlebarsController = require('./handlebarsController/handlebarsController');
const { authPublic } = require('../../utils/auth/auth');

module.exports = (app) => {
  const router = new Router();
  app.use('/', router);
  
  router.get('/products', authPublic, handlebarsController.getProducts);
  router.get('/carts/:cid', authPublic, handlebarsController.getCartProductById);
  router.get('/home', handlebarsController.getHome);
  router.get('/realtimeproducts', handlebarsController.getRealTimeProducts);
  router.get('/chat', handlebarsController.getChat);
  router.get('/', handlebarsController.getLogin);
  router.get('/register', handlebarsController.getRegister);
  router.get('/recovery', handlebarsController.getRecovery);
};
