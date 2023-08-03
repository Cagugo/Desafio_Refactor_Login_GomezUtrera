const { connection } = require('../../../config/mongo');
const ProductsServices = require('../../products/productsServices/productsServices');
const { Cart } = require('../../../models/carts');
const { User } = require('../../../models/users');
const Handlebars = require('handlebars');

Handlebars.registerHelper('ifNotNull', function (value, options) {
  if (value !== null && value !== undefined) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
class HandlebarsServices {
  getCollectionData = async (collectionName, res) => {
    try {
      const database = connection;
      const collection = database.collection(collectionName);
      const data = await collection.find().toArray();
      return data;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getProductServices' });
    }
  };
  getHome = async (res) => {
    try {
      const products = await this.getCollectionData('products');
      return { success: true, title: 'Productos en Tiempo Real', products, style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getHome' });
    }
  };
  getRealTimeProducts = async (res) => {
    try {
      const products = await this.getCollectionData('products');
      return { success: true, title: 'Productos en Tiempo Real', products, style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars' });
    }
  };
  getChat = async (res) => {
    try {
      return { success: true, title: 'Chat', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getChat' });
    }
  };
  getProducts = async (limit, page, sort, query, res, sessionUser) => {
    try {
      const products = await ProductsServices.getProducts(limit, page, sort, query, res);
      const user = await User.findById(sessionUser._id).populate('cart');
      let totalCartProducts = 0;
      if (user && user.cart && user.cart.products) {
        totalCartProducts = user.cart.products.reduce((total, item) => total + item.quantity, 0);
      }
      const context = {
        success: true,
        title: 'Productos',
        products: products.products,
        style: 'index.css',
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        totalPages: products.totalPages,
        currentPage: products.currentPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink,
        sessionUser: sessionUser,
        totalCartProducts: totalCartProducts,
      };
      return context;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getProducts' });
    }
  };
  getCartProductById = async (cid, res, sessionUser) => {
    try {
      const cart = await Cart.findById(cid).populate('products.productId', '-__v');
      const formattedCart = {
        _id: cart._id,
        products: cart.products.map((item) => ({
          productId: {
            _id: item.productId._id,
            title: item.productId.title,
            description: item.productId.description,
            code: item.productId.code,
            price: item.productId.price,
            stock: item.productId.stock,
            category: item.productId.category,
          },
          quantity: item.quantity,
        })),
      };
      const context = {
        success: true,
        title: 'Carts',
        carts: [formattedCart],
        cartId: cid,
        style: 'index.css',
        sessionUser: sessionUser,
      };
      return context;
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getCartProductById' });
    }
  };
  getLogin = async (res) => {
    try {
      return { success: true, title: 'Login', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getLogin' });
    }
  };
  getRegister = async (res) => {
    try {
      return { success: true, title: 'Register', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getRegister' });
    }
  };
  getRecovery = async (res) => {
    try {
      return { success: true, title: 'Recovery', style: 'index.css' };
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error Handlebars getRecovery' });
    }
  };
}
module.exports = new HandlebarsServices();
