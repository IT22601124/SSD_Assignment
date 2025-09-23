const router = require('express').Router();
const {
  startLogin,
  handleCallback,
  logout,
  loginSuccess,
  getProfile,
  testSession,
  getAuthResult,
  getPendingUser,
  completeProfile
} = require('../controllers/authController');

router.get('/login', startLogin);

router.get('/callback', handleCallback);

router.get('/logout', logout);

router.get('/success', loginSuccess);

router.get('/profile', getProfile);

router.get('/auth-result/:key', getAuthResult);

router.get('/pending-user', getPendingUser);

router.post('/complete-profile', completeProfile);

module.exports = router;
