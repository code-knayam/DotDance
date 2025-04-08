import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import QRCode from 'qrcode';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_KEY || ''
);

app.use(cors());
app.use(express.json());

// Generate a random slug
const generateSlug = () => {
  return Math.random().toString(36).substring(2, 8);
};

// Create a new QR code
app.post('/api/create', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const slug = generateSlug();
    const { data: qrCode, error } = await supabase
      .from('qrcodes')
      .insert([
        {
          slug,
          url,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.json(qrCode);
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Redirect from slug to URL
app.get('/q/:slug', async (req: Request<{ slug: string }>, res: Response) => {
  try {
    const { slug } = req.params;
    const { data: qrCode, error } = await supabase
      .from('qrcodes')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    // Log the scan
    await supabase
      .from('scans')
      .insert([
        {
          qr_code_id: qrCode.id,
          ip: req.ip,
          user_agent: req.headers['user-agent'],
        }
      ]);

    res.redirect(qrCode.url);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Edit QR code destination
app.put('/api/edit/:slug', async (req: Request<{ slug: string }>, res: Response) => {
  try {
    const { slug } = req.params;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const { data: qrCode, error } = await supabase
      .from('qrcodes')
      .update({ url })
      .eq('slug', slug)
      .select()
      .single();

    if (error) throw error;
    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    res.json(qrCode);
  } catch (error) {
    console.error('Error updating QR code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get QR code stats
app.get('/api/stats/:slug', async (req: Request<{ slug: string }>, res: Response) => {
  try {
    const { slug } = req.params;
    const { data: qrCode, error: qrError } = await supabase
      .from('qrcodes')
      .select('*')
      .eq('slug', slug)
      .single();

    if (qrError) throw qrError;
    if (!qrCode) {
      return res.status(404).json({ error: 'QR code not found' });
    }

    const { data: scans, error: scanError } = await supabase
      .from('scans')
      .select('*')
      .eq('qr_code_id', qrCode.id)
      .order('created_at', { ascending: false });

    if (scanError) throw scanError;

    const stats = {
      totalScans: scans?.length || 0,
      firstScan: scans?.[scans.length - 1]?.created_at || null,
      lastScan: scans?.[0]?.created_at || null,
    };

    res.json(stats);
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 