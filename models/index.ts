import User from "./User";
import Scores from "./Scores";
import Character from "./Character";

User.hasMany(Scores, {
  foreignKey: 'user_id',
});

User.hasOne(Character, {
  foreignKey: 'user_id',
});

Scores.belongsTo(Character, {
    foreignKey: 'user_id',
});

Character.belongsTo(User, {
    foreignKey: 'user_id',
})

export { User, Scores, Character };
