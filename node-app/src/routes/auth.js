const express = require('express');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middlewares/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Login/Verify user
router.post('/login', verifyToken, async (req, res) => {
  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });
    
    // If user doesn't exist, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          firebaseUid: req.userId,
          email: req.body.user.email || '',
          name: req.body.user.name || null
        }
      });
    }

    res.json({
      message: 'User authenticated successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 