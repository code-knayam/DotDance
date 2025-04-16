const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Get QR code by slug and log scan
router.get('/scan/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { ipAddress, country, deviceInfo } = req.query;

    // Find QR code by slug
    const qrCode = await prisma.qRCode.findUnique({
      where: { slug },
      select: {
        id: true,
        destinationUrl: true,
        name: true
      }
    });

    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    // Log the scan
    await prisma.qRScanLog.create({
      data: {
        qrId: qrCode.id,
        ipAddress: ipAddress || null,
        country: country || null,
        deviceInfo: deviceInfo || null,
      },
    });

    // Return the redirection URL
    res.json({
      url: qrCode.destinationUrl,
      name: qrCode.name
    });
  } catch (error) {
    console.error('Error processing scan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 