const express = require('express');
const bodyParser = require('body-parser');
const HS = require('./highScore.model.js')
const cors = require('cors')

// create express app
const app = express();
app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())



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

app.post('/:hsid', (req, res) => {
    HS.findByIdAndUpdate(req.params.hsid, {
        score: req.body.score
    }, { new: true })
        .then(hs => {
            if (!hs) {
                return res.status(404).send({
                    message: "Score not found with id " + req.params.hsid
                });
            }
            res.send(hs);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "score not found with id " + req.params.hsid
                });
            }
            return res.status(500).send({
                message: "Error updating score with id " + req.params.hsid
            });
        });
})

// listen for requests
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});