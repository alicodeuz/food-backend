var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/AuthController');

router.post('/login', AuthController.login);
router.post('/sign-up', AuthController.signUp);

module.exports = router;
