const sessionsServices = require('../sessionsServices/sessionsServices');

class SessionsController {
  getUserSession = async (req, res) => {
    const userData = await sessionsServices.getUserSession(req, res);
    return res.render('profile', userData);
  };
  getAdminSession = async (req, res) => {
    const userData = await sessionsServices.getAdminSession(req, res);
    return res.render('dashboard', userData);
  };
  getSession = async (req, res) => {
    return await sessionsServices.getSession(req, res);
  };
  deleteSession = async (req, res) => {
    return await sessionsServices.deleteSession(req, res);
  };
}
module.exports = new SessionsController();
