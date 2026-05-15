import express from 'express';
import Banner from '../models/Banner.js';
import Service from '../models/Service.js';
import Settings from '../models/Settings.js';
import Portfolio from '../models/Portfolio.js';
import SuccessStory from '../models/SuccessStory.js';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// Get all banners
router.get('/banners', async (req, res) => {
  try {
    const banners = await Banner.findAll({ order: [['order', 'ASC']] });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await Service.findAll({ where: { isActive: true } });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get site settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      subject,
      message,
      type: 'contact'
    });
    res.json({ success: true, message: 'Message received!', data: inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle quote request submission
router.post('/quote', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      service,
      message,
      type: 'quote'
    });
    res.json({ success: true, message: 'Quote request received!', data: inquiry });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all portfolios
router.get('/portfolios', async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll({ where: { isActive: true } });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all success stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await SuccessStory.findAll({ where: { isActive: true } });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Handle success story submission from client
router.post('/stories/submit', async (req, res) => {
  try {
    const { client, result, story, clientImage } = req.body;
    const submission = await SuccessStory.create({
      client,
      result,
      story,
      clientImage,
      isActive: true // Active immediately upon submission
    });
    res.json({ success: true, message: 'Story submitted successfully!', data: submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
