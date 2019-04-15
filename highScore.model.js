const mongoose = require ('mongoose')

const HighScoreSchema = mongoose.Schema({
    highScore: Number
})

module.exports = mongoose.model('Score', HighScoreSchema, 'high-scores')