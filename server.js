const express = require('express');
const db = require('./config/connection.js');
// const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// current working directory
// const cwd = process.cwd();

// const activity = cwd.includes('')
//     ? cwd.split('')[1]
//     : cwd;

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        // console.log(`API server for ${activity} running on port ${PORT}.`);
        console.log(`API server for running on port ${PORT}.`);
    })
});