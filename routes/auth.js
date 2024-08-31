const express = require('express');
const AuthService = require('../services/AuthService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { user, token } = await AuthService.login(req.body);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
