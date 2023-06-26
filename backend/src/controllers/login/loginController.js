const { login } = require('../../../models');
const ethers = require('ethers');
const jwt = require('jsonwebtoken');

const getLoginData = async (req, res) => {
  try {
    const { address } = req.body;
    const data = await login.findOne({
      where: { address: address },
    });
    res.status(200).json(data);
  } catch (e) {
    console.log('controller error');
    res.status(400).json(e);
  }
};

const addLoginData = async (req, res) => {
  try {
    const { address, nounce } = req.body;
    const data = await login.create({
      address,
      nounce,
    });
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

const verifySignature = async (req, res) => {
  try {
    let { signature, message, address } = req.body;
    let recoveredaddress = ethers.utils.verifyMessage(message, signature);
    if (recoveredaddress.toLowerCase() == address.toLowerCase())
      res.status(200).json({ status: true });
    //generate jwt token
    else res.status(200).json({ status: false });
  } catch (e) {
    res.status(400).json(e);
  }
};

const generateNewAccessToken = (req, res) => {
  const { secretkey, account } = req.body;
  const accsessToken = jwt.sign({ account }, secretkey, {
    expiresIn: '86400s',
  });
  // res.cookie("accsessToken", accsessToken)
  res.status(200).json({ accsessToken: accsessToken });
};

const verifyResult = (req, res) => {
  try {
    res.status(200).json({ verify: true });
  } catch (e) {
    res.statur(400).json({ error: e });
  }
};

module.exports = {
  getLoginData,
  addLoginData,
  verifySignature,
  generateNewAccessToken,
  verifyResult,
};
