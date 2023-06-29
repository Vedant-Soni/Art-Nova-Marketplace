const express = require('express');
const {
  getLoginData,
  addLoginData,
  verifySignature,
  generateNewAccessToken,
  verifyResult,
} = require('../../controllers/login/loginController');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = express.Router();

router.post('/login', getLoginData);
router.post('/newLogin', addLoginData);
router.post('/authenticate', verifySignature);
router.post('/jwtauth', generateNewAccessToken);
router.post('/verifyJWT', verifyToken, verifyResult);

module.exports = router;
