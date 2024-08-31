const express = require('express');
const UserService = require('../services/UserService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res, next) => {
  try {
    const user = await UserService.getUserProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/profile', authMiddleware, async (req, res, next) => {
  try {
    const updatedUser = await UserService.updateUserProfile(req.user.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
