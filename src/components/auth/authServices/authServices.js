class AuthServices {
  logout = async (req, res) => {
    try {
      await new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            const response = { success: false, error: err };
            req.logoutResult = response;
            reject(response);
          } else {
            const response = { success: true, message: 'successful logout' };
            req.logoutResult = response;
            resolve(response);
          }
          console.log('successful logout');
        });
      });
      return req.logoutResult;
    } catch (err) {
      const response = { success: false, error: 'Error during logout' };
      req.logoutResult = response;
      return response;
    }
  };
}
module.exports = new AuthServices();
