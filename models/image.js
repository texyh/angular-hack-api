const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    name: String,
    url: String,
    created_at: Date,
    id: mongoose.Schema.ObjectId
})