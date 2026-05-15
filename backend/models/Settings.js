import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Settings = sequelize.define('Settings', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  siteName: {
    type: DataTypes.STRING,
    defaultValue: 'DevSpectra'
  },
  contactPhone: {
    type: DataTypes.STRING,
    defaultValue: '+91 99520 74904'
  },
  contactEmail: {
    type: DataTypes.STRING,
    defaultValue: 'contact@devspectra.com'
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: 'No.20/9, Sardar Patel Road, Chennai - 600020'
  },
  // In SQL, we often flatten JSON fields or use JSON type if supported
  facebook: DataTypes.STRING,
  twitter: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  instagram: DataTypes.STRING
}, {
  timestamps: true
});

export default Settings;
