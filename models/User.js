const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection')

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        wins: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        losses: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
    );
    
    module.exports = User;