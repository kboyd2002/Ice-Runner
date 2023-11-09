const faker = require('faker');
const { Score }  = require('./models/Score');

async function seedScore() {
  try {
    await Score.sync({ force: true });

    for (let i = 0; i < 10; i++) {
      await Score.create({
        score: faker.random.number({ min: 1, max: 100 }),
        username: faker.internet.userName()
      });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit();
  }
}
const seedScore = () => Score.bulkCreate(imageData);

seedScore();
