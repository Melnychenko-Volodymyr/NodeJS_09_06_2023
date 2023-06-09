const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    author: { type: String }   
});

const model1 = mongoose.model('author', schema);
module.exports = model1;