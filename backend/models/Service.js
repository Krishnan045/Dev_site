import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING,
    defaultValue: '📋'
  },
  category: {
    type: DataTypes.ENUM('Digital Marketing', 'Web Development', 'Mobile App', 'UI/UX', 'E-Commerce', 'General'),
    defaultValue: 'General'
  },
  tags: {
    type: DataTypes.STRING,
    defaultValue: ''
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: 'rgba(16, 185, 129, 0.1)'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  showOnHome: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

export default Service;
