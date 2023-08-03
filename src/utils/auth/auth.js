const authPrivate = (req, res, next) => {
  try {
    if (req.session?.user?.role === 'admin') {
      return next();
    } else {
      res.redirect('/api/sessions/user');
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error de autorización', message: error.message });
  }
};
const authPublic = (req, res, next) => {
  try {
    if (req.session?.user?.role === 'user') {
      return next();
    } else {
      res.redirect('/');
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Error de autorización', message: error.message });
  }
};
module.exports = { authPrivate, authPublic };
