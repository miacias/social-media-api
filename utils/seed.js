const connection = require('../config/connection.js');
const { User, Thought, Reaction } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data.js');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    
    // drop existing data
    await User.deleteMany({});
    // await Thought.deleteMany({});
    // await Reaction.deleteMany({});
    
    // create empty array to hold users
    const users = [];
    // randomly assign 10 users
    // for (let i = 0; i < 10; i++) {
        
    // }
    
    // inserts randomly assigned users to DB collection
    // await User.collection.insertMany(users);

    // prints seed data to console
    // console.table(users);
    // console.info('DB seeding complete.');
    
    // ends DB connection
    process.exit(0);
});