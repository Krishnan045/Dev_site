import sequelize from './config/db.js';
import Banner from './models/Banner.js';
import Service from './models/Service.js';
import Portfolio from './models/Portfolio.js';
import Settings from './models/Settings.js';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const banners = [
  { title: "Innovation", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200", order: 1 },
  { title: "Scalability", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200", order: 2 },
  { title: "Security", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200", order: 3 }
];

const services = [
  // Digital Marketing
  { title: "Reputation Management", description: "Strategic corporate reputation and brand sentiment monitoring.", icon: "📋", category: "Digital Marketing" },
  { title: "Social Media Marketing", description: "Integrated social campaigns to drive engagement and viral growth.", icon: "📱", category: "Digital Marketing" },
  { title: "Search Engine Optimization", description: "Dominating search results with technical and content SEO.", icon: "🔍", category: "Digital Marketing" },
  
  // Web Development
  { title: "Custom Web Apps", description: "Bespoke web applications built with modern frameworks like React and Node.", icon: "🌐", category: "Web Development" },
  { title: "Enterprise Architecture", description: "Scalable, secure, and robust backend systems for large organizations.", icon: "🏗️", category: "Web Development" },
  
  // Mobile App
  { title: "iOS & Android Apps", description: "High-performance native mobile applications for all platforms.", icon: "📱", category: "Mobile App" },
  { title: "Cross-Platform Dev", description: "Efficient mobile solutions using React Native and Flutter.", icon: "⚛️", category: "Mobile App" },
  
  // UI/UX
  { title: "User Research", description: "In-depth discovery to understand your users' needs and pain points.", icon: "🧪", category: "UI/UX" },
  { title: "Interface Design", description: "Crafting intuitive and aesthetically pleasing digital interfaces.", icon: "🎨", category: "UI/UX" },
  
  // E-Commerce
  { title: "B2C Stores", description: "Tailored online shopping experiences designed to convert visitors.", icon: "🛍️", category: "E-Commerce" },
  { title: "Inventory Systems", description: "Real-time sync between your store and warehouse management.", icon: "📦", category: "E-Commerce" }
];

const portfolios = [
  { title: "GreenGrid Platform", description: "A renewable energy monitoring dashboard for global utilities.", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", category: "Web Development", link: "https://example.com" },
  { title: "SwiftPay Mobile", description: "Next-gen fintech app with biometric security and instant transfers.", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800", category: "Mobile App", link: "https://example.com" },
  { title: "EcoStore Portal", description: "High-performance headless e-commerce for sustainable brands.", imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800", category: "E-Commerce", link: "https://example.com" },
  { title: "Lumina Brand Identity", description: "Complete visual identity and design system for a tech startup.", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", category: "UI/UX", link: "https://example.com" }
];

import mysql from 'mysql2/promise';

const seed = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'devspectra'}\`;`);
    await connection.end();
    console.log('Database verified.');

    await sequelize.authenticate();
    console.log('Connected to MySQL...');

    await sequelize.sync({ force: true });
    console.log('Database cleared.');

    await Banner.bulkCreate(banners);
    await Service.bulkCreate(services);
    await Portfolio.bulkCreate(portfolios);
    console.log('Main content seeded.');

    await Settings.create({
      siteName: 'DevSpectra',
      contactPhone: '+91 99620 74904',
      contactEmail: 'contact@devspectra.com',
      address: 'No.20/9, Sardar Patel Road, Adyar, Chennai - 600020'
    });
    console.log('Settings seeded.');

    await User.create({ username: 'admin', password: 'password123' });
    console.log('Admin user: admin / password123');

    console.log('Seeding completed.');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seed();
