import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/connection';

class Character extends Model {
  public id!: number;
  public char_name!: string;
  public enemies!: string | null;
  public loot!: number | null;
  public user_id!: number;
}

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
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'character',
  }
);

export default Character;
