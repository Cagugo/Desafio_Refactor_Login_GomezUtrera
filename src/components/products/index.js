const { Router } = require('express');
const productsController = require('./productsController/productsController');
const upload = require('../../utils/multer/multer');

module.exports = (app) => {
  const router = new Router();
  app.use('/api/products', router);

  router.get('/', productsController.getAllProducts);
  router.get('/:pid', productsController.getProductById);
  router.put('/:pid', productsController.updateProduct);
  router.delete('/:pid', productsController.deleteProduct);
  router.post('/', upload.array('image', 3), productsController.addProduct);
};
