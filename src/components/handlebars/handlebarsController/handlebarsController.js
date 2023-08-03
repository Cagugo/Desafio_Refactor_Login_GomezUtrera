const HandlebarsServices = require('../handlebarsServices/handlebarsServices');

class HandlebarsController {
  getHome = async (req, res) => {
    const data = await HandlebarsServices.getHome(res);
    return res.render('home', data);
  };
  getRealTimeProducts = async (req, res) => {
    const data = await HandlebarsServices.getRealTimeProducts(res);
    return res.render('realTimeProducts', data);
  };
  getChat = async (req, res) => {
    const data = await HandlebarsServices.getChat(res);
    return res.render('chat', data);
  };
  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query;
    const sessionUser = req.session.user;
    const data = await HandlebarsServices.getProducts(limit, page, sort, query, res, sessionUser);
    return res.render('products', data);
  };
  getCartProductById = async (req, res) => {
    const { cid } = req.params;
    const cartId = cid;
    const user = req.session.user;
    const data = await HandlebarsServices.getCartProductById(cartId, res, user);
    return res.render('carts', data);
  };
  getLogin = async (req, res) => {
    const data = await HandlebarsServices.getLogin(res);
    return res.render('login', data);
  };
  getRegister = async (req, res) => {
    const data = await HandlebarsServices.getRegister(res);
    return res.render('register', data);
  };
  getRecovery = async (req, res) => {
    const data = await HandlebarsServices.getRegister(res);
    return res.render('recovery', data);
  };
}
module.exports = new HandlebarsController();
