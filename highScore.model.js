const mongoose = require ('mongoose')

const HighScoreSchema = mongoose.Schema({
    score: Number
})

module.exports = mongoose.model('Score', HighScoreSchema, 'high-scores')