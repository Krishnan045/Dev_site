import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Banner from '../models/Banner.js';
import Service from '../models/Service.js';
import Settings from '../models/Settings.js';
import Portfolio from '../models/Portfolio.js';
import SuccessStory from '../models/SuccessStory.js';
import Inquiry from '../models/Inquiry.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Apply auth middleware to all routes in this router
router.use(authMiddleware);

// --- File Upload ---
router.post('/upload', async (req, res) => {
  try {
    const { image, name } = req.body;
    if (!image) return res.status(400).json({ message: 'No image data provided' });

    // Remove header from base64 string
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    const fileName = `${Date.now()}-${name || 'upload.png'}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);
    
    // Return the relative path that the frontend can use
    res.json({ url: `/uploads/${fileName}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Banners ---
router.post('/banners', async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.findAll({ order: [['order', 'ASC']] });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/banners/:id', async (req, res) => {
  try {
    await Banner.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Services ---
router.post('/services', async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    await Service.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    await Service.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Settings ---
router.put('/settings', async (req, res) => {
  try {
    const [settings] = await Settings.findAll();
    if (settings) {
      await settings.update(req.body);
      res.json(settings);
    } else {
      const newSettings = await Settings.create(req.body);
      res.json(newSettings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Portfolio ---
router.get('/portfolio', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/portfolio', async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/portfolio/:id', async (req, res) => {
  try {
    await Portfolio.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/portfolio/:id', async (req, res) => {
  try {
    await Portfolio.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Success Stories ---
router.post('/stories', async (req, res) => {
  try {
    const story = await SuccessStory.create(req.body);
    res.json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/stories/:id', async (req, res) => {
  try {
    await SuccessStory.update(req.body, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/stories/:id', async (req, res) => {
  try {
    await SuccessStory.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/stories', async (req, res) => {
  try {
    const stories = await SuccessStory.findAll();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/seed', async (req, res) => {
  try {
    const { services, portfolios, stories } = req.body;
    if (services) await Service.bulkCreate(services);
    if (portfolios) await Portfolio.bulkCreate(portfolios);
    if (stories) await SuccessStory.bulkCreate(stories);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- Inquiries ---
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/inquiries/:id/read', async (req, res) => {
  try {
    await Inquiry.update({ status: 'read' }, { where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/inquiries/:id', async (req, res) => {
  try {
    await Inquiry.destroy({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
