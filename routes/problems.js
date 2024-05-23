// routes/problems.js
const express = require('express');
const Problem = require('../models/Problem');

const router = express.Router();

// Create a new problem
router.post('/', (req, res) => {
    const { title, description, testCases } = req.body;

    const newProblem = new Problem({ title, description, testCases });

    newProblem.save()
        .then(problem => res.json(problem))
        .catch(err => console.log(err));
});

// Get all problems
router.get('/', (req, res) => {
    Problem.find()
        .then(problems => res.json(problems))
        .catch(err => console.log(err));
});

module.exports = router;
