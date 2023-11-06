const User = require('./User');
const Scores = require('./Scores');
const Character = require('./Character');

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

module.exports = { User, Scores, Character };

