const express = require('express');
const bodyParser = require('body-parser');
const HS = require('./highScore.model.js')
const cors = require('cors')

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

// Configuring the database
const dbConfig = require('./dbconfig');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    HS.find()
        .then(hss => {
            res.send(hss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving high scores."
            });
        });
});

// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});