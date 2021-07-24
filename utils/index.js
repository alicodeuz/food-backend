const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'dfshfdskjhfjksd kfhdskjhf skdjhf ksdjbfjsdk bgsd knhf sczkjfbsdjn foewujiy';
const Users = require('../models/UserModel');

function deleteImage(fileName) {
  const currentFileName = path.join(__dirname, '../public', fileName);
  const isFileExist = fs.existsSync(currentFileName);
  console.log(isFileExist);
  console.log(currentFileName)
  if (isFileExist) {
    return fs.unlinkSync(currentFileName);
  }
}


const createToken = ({ userId }) => {
  return jwt.sign({ _id: userId }, SECRET_KEY, { expiresIn: '10h' });
};

const validateToken = token => {
  try {
    return jwt.verify(token, SECRET_KEY);
  }
  catch (err) {
    return {};
  }
}

const currentUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const validToken = token ? validateToken(token) : {};
  console.log(validToken)
  if (validToken._id) {

    try {
      const user = await Users.findById(validToken._id);
      if (user) {
        req.locals = { ...req.locals, _id: user._id };
        next();
      } else {
        res.status(403).json({ success: false, error: 'You are not authorized' });
      }

    } catch (error) {
      console.log(error)
      res.status(401).json({ success: false, error: 'You are not authenticated' });
    }
  } else {
    res.status(401).json({ success: false, error: 'You are not authenticated' });
  }
}

const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  const validToken = token ? this.validateToken(token) : {};
  if (validToken._id) {
    try {
      const admin = await Users.findById(validToken._id);
      if (admin) {
        req.locals = { ...req.locals, _id: admin._id, role: 'admin' };
        next();
      } else {
        res.status(403).json({ success: false, error: 'You are not authorized' });
      }

    } catch (error) {
      console.log(error)
      res.status(401).json({ success: false, error: 'You are not authenticated' });
    }
  } else {
    res.status(401).json({ success: false, error: 'You are not authenticated' });
  }

}

module.exports = {
  deleteImage,
  isAdmin,
  createToken,
  validateToken,
  currentUser,
}