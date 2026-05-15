import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SuccessStory = sequelize.define('SuccessStory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  client: {
    type: DataTypes.STRING,
    allowNull: false
  },
  result: {
    type: DataTypes.STRING, // e.g. "300% Growth"
    allowNull: false
  },
  story: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  clientImage: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

export default SuccessStory;
