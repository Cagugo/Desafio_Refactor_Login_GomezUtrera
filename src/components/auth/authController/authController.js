const authServices = require('../authServices/authServices');
const passport = require('passport');

class AuthController {
  register = (req, res, next) => {
    passport.authenticate('register', { failureRedirect: '/failregister' })(req, res, next);
  };
  registerSuccess = (req, res) => {
    res.send({ status: 'success', message: 'Registered user' });
  };
  failRegister = async (req, res) => {
    console.log('Failed Strategy');
    res.send({ error: 'Failed Register' });
  };
  login = (req, res, next) => {
    passport.authenticate('login', (err, user) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Error during login' });
      }
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid Credentials' });
      }
      if (user.admin) {
        res.cookie('username', user.email, { maxAge: 20000, httpOnly: true, signed: true });
        req.session.user = user;
        req.session.admin = true;
        return res.status(200).json({ success: true, message: 'login successful', userType: 'admin' });
      } else {
        res.cookie('username', user.email, { maxAge: 20000, httpOnly: true, signed: true });
        req.session.user = user;
        if (req.session.hasOwnProperty('admin')) {
          delete req.session.admin;
        }
        return res.status(200).json({ success: true, message: 'login successful', userType: 'user', user });
      }
    })(req, res, next);
  };
  logout = async (req, res) => {
    const logoutResult = await authServices.logout(req, res);
    if (logoutResult.success) {
      return res.redirect('/');
    } else {
      return res.status(401).json(logoutResult);
    }
  };
  githubLogin = (req, res, next) => {
    passport.authenticate('github', { scope: ['user_email'] })(req, res, next);
  };
  githubCallback = (req, res, next) => {
    passport.authenticate('github', { failureRedirect: '/login' })(req, res, next);
  };
  githubCallbackRedirect = (req, res) => {
    req.session.user = req.user;
    res.redirect('/products');
  };
}
module.exports = new AuthController();
