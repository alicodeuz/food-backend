var express = require('express');
var router = express.Router();
const categoryRoutes = require('./CategoryRoutes');
const usersRoutes = require('./UserRoutes');
const ordersRoutes = require('./OrderRoutes');
const productsRoutes = require('./ProductRoutes');
const authRoutes = require('./AuthRoutes');

router.use('/api/auth', authRoutes);
router.use('/api/category', categoryRoutes);
router.use('/api/users', usersRoutes);
router.use('/api/orders', ordersRoutes);
router.use('/api/products', productsRoutes);


module.exports = router;
