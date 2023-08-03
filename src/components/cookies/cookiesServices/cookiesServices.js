class CookiesServices {
  setSignedCookies = async (req, res) => {
    try {
      await res.cookie('SignedCookie', 'cookie hard', { maxAge: 10000, signed: true });
      return res.status(200).json({ success: true, message: 'SignedCookie signed' });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Error setSignedCokies' });
    }
  };
  getSignedCookies = async (req, res, next) => {
    try {
      const signedCookie = req.signedCookies.SignedCookie;

      if (signedCookie) {
        return res.status(200).json({ success: true, signedCookie });
      } else {
        return res.status(404).json({ success: false, error: 'Signed cookie not found' });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: 'getSignedCookies error when getting cookie' });
    }
  };
  deleteSignedCookies = async (req, res) => {
    try {
      await res.clearCookie('SignedCookie');
      return res.status(200).json({ success: true, message: 'SignedCookie removed' });
    } catch (error) {
      return res.status(500).json({ success: false, error: 'deleteSignedCookies error when deleting signed cookie' });
    }
  };
}
module.exports = new CookiesServices();