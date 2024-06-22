import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequalize.js'; 

class Vehicle extends Model {}

Vehicle.init(
  {
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lock_unlock_status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Lock', 'Unlock']],
      },
    },
    current_speed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    battery_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.DECIMAL(9, 6),
      allowNull: false,
    },
    last_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, 
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'Vehicle', 
    tableName: 'vehicles', 
  }
);

export default Vehicle;