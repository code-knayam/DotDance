const express = require('express');
const { PrismaClient } = require('@prisma/client');
const verifyToken = require('../middlewares/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Get all QR codes for the authenticated user
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const qrCodes = await prisma.qRCode.findMany({
      where: { userId: user.id },
    //   include: {
    //     redirects: {
    //       orderBy: { changedAt: 'desc' },
    //       take: 1
    //     },
    //     scanLogs: {
    //       orderBy: { scannedAt: 'desc' },
    //       take: 10
    //     }
    //   },
      orderBy: { createdAt: 'desc' },
    });
    res.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new QR code
router.post('/', verifyToken, async (req, res) => {
  try {
    const { 
      name, 
      destinationUrl, 
      backgroundColor = "#FFFFFF", 
      foregroundColor = "#000000", 
      logoUrl 
    } = req.body;

    if (!destinationUrl) {
      return res.status(400).json({ error: 'Destination URL is required' });
    }

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique slug
    const slug = Math.random().toString(36).substring(2, 15);

    const qrCode = await prisma.qRCode.create({
      data: {
        name,
        slug,
        destinationUrl,
        backgroundColor,
        foregroundColor,
        logoUrl,
        userId: user.id,
      },
    });
    res.status(201).json(qrCode);
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get QR code by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: req.params.id },
      include: {
        redirects: {
          orderBy: { changedAt: 'desc' }
        },
        scanLogs: {
          orderBy: { scannedAt: 'desc' }
        }
      }
    });

    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    if (qrCode.userId !== user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(qrCode);
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update QR code
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const {
      destinationUrl,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: req.params.id },
    });

    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    if (qrCode.userId !== user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // If destinationUrl is being updated, create a redirect history entry
    if (destinationUrl && destinationUrl !== qrCode.destinationUrl) {
      await prisma.qRRedirectHistory.create({
        data: {
          qrId: req.params.id,
          previousUrl: qrCode.destinationUrl,
          newUrl: destinationUrl,
        },
      });
    }

    const updatedQRCode = await prisma.qRCode.update({
      where: { id: req.params.id },
      data: {
        destinationUrl,
      },
    });

    res.json(updatedQRCode);
  } catch (error) {
    console.error('Error updating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete QR code
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid: req.userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const qrCode = await prisma.qRCode.findUnique({
      where: { id: req.params.id },
    });

    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    if (qrCode.userId !== user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await prisma.qRCode.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 