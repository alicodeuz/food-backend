var express = require('express');
var router = express.Router();
const categoryRoutes = require('./CategoryRoutes');
const usersRoutes = require('./UserRoutes');
const ordersRoutes = require('./OrderRoutes');
const productsRoutes = require('./ProductRoutes');
const authRoutes = require('./AuthRoutes');

router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);
router.use('/users', usersRoutes);
router.use('/orders', ordersRoutes);
router.use('/products', productsRoutes);


module.exports = router;
