// models/Problem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProblemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    testCases: [
        {
            input: {
                type: String,
                required: true
            },
            output: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = Problem = mongoose.model('problems', ProblemSchema);
