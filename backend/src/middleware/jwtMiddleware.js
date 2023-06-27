const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const accsessToken = req.headers.authorization?.split(' ')[1];
    const secretkey = process.env.JWT_SECRET_KEY;
    jwt.verify(accsessToken, secretkey, (err, decode) => {
      if (err) {
        console.log('middleware error : ', err);
        res.status(400).json({ verify: false });
      } else {
        next();
      }
    });
  } catch (e) {
    console.log('middleware error', e);
    res.status(400).json({ error: e });
  }
};

module.exports = {
  verifyToken,
};
