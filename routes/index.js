const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const cartRoutes = require('./cart');
const wishlistRoutes = require('./wishlist');
const searchRoutes = require('./search');
const recommendationRoutes = require('./recommendation');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cart', cartRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/search', searchRoutes);
router.use('/recommendations', recommendationRoutes);

module.exports = router;