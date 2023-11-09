const { images } = require('../models');

const imageData = [
  {
    filename: 'background.png',
  },
  {
    filename: 'IceRunner.gif',
  },
  {
    filename: 'igloo.png',
  },
  {
    filename: 'platform.png',
  },
  {
    filename: 'snow.png',
  },
  {
    filename: 'Snowman.png',
  },
];

const seedImage = () => images.bulkCreate(imageData);

module.exports = seedImage;