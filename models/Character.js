const { Model, DataTypes } = require('sequelize');
const sequelize = require ('../config/connection')

class Character extends Model {}

Character.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
        },
        char_name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        enemies: {
            type: DataTypes.STRING,
        },
        loot: {
            type: DataTypes.INTEGER,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
      }
    );
    
    module.exports = Character;