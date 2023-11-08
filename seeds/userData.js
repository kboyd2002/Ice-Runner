const { User } = require('../models');

const userData = [
  {
    username: 'ElizabethT',
    password: 'password1',
  },
  {
    username: 'KellyB',
    password: 'password1',
  },
  {
    username: 'ChristopherB',
    password: 'password1',
  },
  {
    username: 'ApolloV',
    password: 'password1',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;