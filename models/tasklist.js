const mongoose = require('mongoose');
const tasklistschema = new mongoose.Schema({
    title: { type: String }
});
const Tasklist = mongoose.model('Tasklist', tasklistschema);

module.exports = Tasklist