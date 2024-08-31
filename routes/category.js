const express = require('express');
const CategoryService = require('../services/CategoryService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const deleted = await CategoryService.deleteCategory(req.params.id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
