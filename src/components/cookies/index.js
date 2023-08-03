const { Router } = require('express');
const cookiesController = require('./cookiesController/cookiesController');

module.exports = (app) => {
  const router = new Router();

  app.use('/api/sessions', router);
  
  router.get('/setsignedcookies', cookiesController.setSignedCookies);
  router.get('/getsignedcookies', cookiesController.getSignedCookies);
  router.get('/deletesignedcookies', cookiesController.deleteSignedCookies);
};
