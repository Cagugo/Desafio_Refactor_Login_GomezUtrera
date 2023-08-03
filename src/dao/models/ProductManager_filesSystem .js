const express = require('express');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const productosFilePath = './data/productos.json';

(async () => {
  try {
    await fs.access(productosFilePath);

    const productosData = await fs.readFile(productosFilePath, 'utf8');
    if (productosData.trim() === '') {
      await fs.writeFile(productosFilePath, '[]');
    }
  } catch (error) {
    await fs.writeFile(productosFilePath, '[]');
  }
})();
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const productosData = await fs.readFile(productosFilePath, 'utf8');
    const products = JSON.parse(productosData);
    const limitedProducts = limit ? products.slice(0, parseInt(limit)) : { status: 'success', payload: products };

    return res.status(200).json(limitedProducts);
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error al obtener los productos' });
  }
});
router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productosData = await fs.readFile(productosFilePath, 'utf8');
    const products = JSON.parse(productosData);
    const product = products.find((p) => p.id === pid);

    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }

    return res.status(200).json({ status: 'success', payload: product });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error al obtener el producto' });
  }
});
router.post('/', async (req, res) => {
  try {
    const { id, title, description, code, price, stock, category, thumbnails } = req.body;

    if (id) {
      return res.status(400).json({ status: 'error', error: 'No envíe el ID del producto. Se genera automáticamente para que sea único e irrepetible' });
    }

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(500).json({ status: 'error', error: 'Faltan campos obligatorios' });
    }

    const productosData = await fs.readFile(productosFilePath, 'utf8');
    const products = JSON.parse(productosData);
    const existingProduct = products.find((p) => p.code === code);

    if (existingProduct) {
      return res.status(400).json({ status: 'error', error: 'Ya existe un producto con el mismo código' });
    }
    const newProductId = 'pid' + uuidv4().substring(0, 4);
    const newProduct = {
      id: newProductId,
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || 'Sin imagen',
    };
    products.push(newProduct);

    await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

    return res.status(201).json({ status: 'created', message: 'Producto agregado correctamente' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error al agregar el producto' });
  }
});
router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const updateFields = req.body;

    if ('id' in updateFields) {
      return res.status(400).json({ status: 'error', error: 'No se puede modificar el ID del producto' });
    }

    const productosData = await fs.readFile(productosFilePath, 'utf8');
    const products = JSON.parse(productosData);
    const productIndex = products.findIndex((p) => p.id === pid);

    if (productIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    const product = products[productIndex];
    const updatedProduct = {
      ...product,
      ...updateFields,
    };

    products[productIndex] = updatedProduct;

    await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

    return res.status(200).json({ status: 'success', message: 'Producto actualizado correctamente' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error al actualizar el producto' });
  }
});
router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productosData = await fs.readFile(productosFilePath, 'utf8');
    const products = JSON.parse(productosData);
    const productIndex = products.findIndex((p) => p.id === pid);
    if (productIndex === -1) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    products.splice(productIndex, 1);

    await fs.writeFile(productosFilePath, JSON.stringify(products, null, 2));

    return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: 'Error al eliminar el producto' });
  }
});
module.exports = router;
