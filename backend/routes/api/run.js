// routes/run.js

const express = require('express');
const { runCode } = require('../../controllers/submission');
const router = express.Router();

// POST request handler for /api/run
router.post('/running',runCode);

module.exports = router;
