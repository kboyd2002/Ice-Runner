const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedImage = require('./images');


const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedImage();
  await seedUser();
  await seedScore();

  process.exit(0);
};

seedAll();
