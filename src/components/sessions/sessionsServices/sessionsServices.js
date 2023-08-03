class SessionsServices {
  getUserSession = async (req, res) => {
    try {
      const userData = req.session.user || {};
      return { success: true, user: userData, title: 'Perfil', style: 'index.css' };
    } catch (error) {
      return { success: false, error: 'Error en Handlebars getUserSession' };
    }
  };
  getAdminSession = async (req, res) => {
    try {
      const userData = req.session.user || {};
      if (typeof userData === 'string') {
        userData = { email: userData };
      }
      userData.isAdmin = req.session.admin || false;
      return { success: true, user: userData, title: 'Dashboard', style: 'index.css' };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Error in Handlebars getAdminSession' };
    }
  };
  getSession = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++;
        return res.status(200).json({ success: true, message: `Se ha visitado el sitio ${req.session.counter} veces.` });
      } else {
        req.session.counter = 1;
        return res.status(200).json({ success: true, message: 'Bienvenido!' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en getSession al obtener la session' });
    }
  };
  deleteSession = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (!err) {
          return res.status(200).json({ success: true, message: 'Logout Ok!' });
        } else {
          return res.status(500).json({ success: false, error: 'Logout ERROR', body: err });
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error en deleteSession al eliminar la session' });
    }
  };
}
module.exports = new SessionsServices();
