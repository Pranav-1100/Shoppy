const express = require('express');
const { Op } = require('sequelize');
const { Product, Category } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { query, category } = req.query;
    const whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    };
    if (category) {
      whereClause.CategoryId = category;
    }
    const products = await Product.findAll({
      where: whereClause,
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;