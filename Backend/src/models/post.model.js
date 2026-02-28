const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image: String,
    caption: String,
});

const postmodel = mongoose.model('post', postSchema);

module.exports = postmodel;