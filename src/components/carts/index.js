const { Router } = require('express');
const cartsController = require('./cartsController/cartsController');

module.exports = (app) => {
  const router = new Router();
  app.use('/api/carts', router);
  
  router.get('/', cartsController.getCarts);
  router.post('/', cartsController.addCart);
  router.get('/:cid', cartsController.getCartProductById);
  router.post('/:cid/product/:pid', cartsController.addProductToCart);
  router.delete('/:cid', cartsController.deleteCart);
  router.delete('/:cid/product/:pid', cartsController.deleteProductFromCart);
  router.put('/:cid', cartsController.updateCart);
  router.put('/:cid/product/:pid', cartsController.updateProductQuantity);
  router.delete('/:cid/products', cartsController.deleteAllProductsFromCart);
};
