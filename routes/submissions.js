// routes/submissions.js
const express = require('express');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

const router = express.Router();

// Submit code for a problem
router.post('/', auth, async (req, res) => {
    const { userId, problemId, code } = req.body;

    try {
        const problem = await Problem.findById(problemId);

        if (!problem) {
            return res.status(404).json({ problem: 'Problem not found' });
        }

        // Simulate code execution and evaluation
        const result = 'Accepted'; // Placeholder for actual evaluation logic

        const newSubmission = new Submission({
            user: req.user.id,
            problem: problemId,
            code,
            result
        });

        await newSubmission.save();
        res.json(newSubmission);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
