const { Cart } = require('../../../models/carts');
const { Product } = require('../../../models/products');

class CartsService {
  constructor() {
    this.initializeCartCollection();
  }
  initializeCartCollection = async () => {
    try {
      const cartCount = await Cart.countDocuments();
      if (cartCount === 0) {
        await Cart.create({ products: [] });
        console.log('initialized "carts" correctly');
      }
    } catch (error) {
      console.error('Error initializing cart collection in database', error);
    }
  };
  addCart = async (res) => {
    try {
      const newCart = await Cart.create({ products: [] });
      const data = newCart;
      return res.status(201).json({ success: true, message: 'New cart created', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error creating cart' });
    }
  };
  getCartProductById = async (cid, res) => {
    try {
      const cart = await Cart.findById(cid).populate('products.productId');
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }
      const data = cart.products;
      return res.status(200).json({ success: true, payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error getting cart products' });
    }
  };
  addProductToCart = async (cid, pid, quantity, res) => {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }
      const product = await Product.findById(pid);
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product ID not found' });
      }
      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        const newProduct = {
          productId: pid,
          quantity: quantity || 1,
        };
        cart.products.push(newProduct);
      } else {
        cart.products[productIndex].quantity += quantity || 1;
      }
      await cart.save();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Product added to cart successfully', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error adding product to cart' });
    }
  };
  deleteCart = async (cid, res) => {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }
      await cart.deleteOne();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Cart successfully deleted', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error deleting cart' });
    }
  };
  deleteProductFromCart = async (cid, pid, res) => {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product not found in cart' });
      }

      cart.products.splice(productIndex, 1);
      await cart.save();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Product removed from cart successfully', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error removing product from cart' });
    }
  };
  updateCart = async (cid, products, res) => {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      cart.products = products;
      await cart.save();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Cart updated successfully', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error updating cart' });
    }
  };
  updateProductQuantity = async (cid, pid, quantity, res) => {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex((p) => p.productId.toString() === pid);
      if (productIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product not found in cart' });
      }

      cart.products[productIndex].quantity = quantity;
      await cart.save();
      const data = cart;
      return res.status(200).json({ success: true, message: 'Product Quantity Updated Successfully', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error updating the quantity of product in the cart' });
    }
  };
  deleteAllProductsFromCart = async (cid, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(cid, { $set: { products: [] } }, { new: true });
      if (!cart) {
        return res.status(404).json({ success: false, error: 'Cart not found' });
      }

      const data = cart;
      return res.status(200).json({ success: true, message: 'All products removed from cart', payload: data });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error removing all products from cart' });
    }
  };
}
module.exports = new CartsService();
