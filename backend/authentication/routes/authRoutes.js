const router = require('express').Router();
const {
  startLogin,
  handleCallback,
  logout,
    loginSuccess
} = require('../controllers/authController');

router.get('/login', startLogin);

router.get('/callback', handleCallback);

router.get('/logout', logout);

router.get('/success', loginSuccess);

module.exports = router;
