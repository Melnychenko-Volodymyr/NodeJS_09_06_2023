const mongoose = require('mongoose');

const schema = new mongoose.Schema ({
    id_author: mongoose.Types.ObjectId,
    title: { type: String }, 
    text: { type: String }
});

const model2 = mongoose.model('article', schema);
module.exports = model2;