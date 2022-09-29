const mongoose = require('mongoose');
const taskschema = new mongoose.Schema({
    title: { type: String },
    _tasklistId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        reuired: true
    }
});
const Task = mongoose.model('Task', taskschema);

module.exports = Task;