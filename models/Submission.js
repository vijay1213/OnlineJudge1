// models/Submission.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubmissionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    problem: {
        type: Schema.Types.ObjectId,
        ref: 'problems',
        required: true
    },
    code: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Submission = mongoose.model('submissions', SubmissionSchema);
