const { connect, connection } = require('mongoose');

/*
1. After creating Heroku app, visit https://dashboard.heroku.com/apps/ 
2. select the application name
3. add Atlas connection string as a Config Var.

Node will look for this environment variable
if it exists, it will use it. 
Otherwise, it will assume running this application locally
*/

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thoughtsDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;