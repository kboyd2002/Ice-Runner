import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/connection';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  wins?: number | null;
  losses?: number | null;
}

class User extends Model<UserAttributes> {
  public id!: number;
  public username!: string;
  public password!: string;
  public wins!: number | null;
  public losses!: number | null;

  public checkPassword(loginPw: string): boolean {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData: UserAttributes) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

export default User;
