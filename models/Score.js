const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model {}

Score.init(
    {
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Score',
    });
  
  module.exports = Score;