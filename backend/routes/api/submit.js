const express = require('express');
const router = express.Router();
const { runCode, submitCode } = require('../../controllers/submission');
const authMiddleware = require('../../middleware/auth');


// Route for submitting code
router.post("/", submitCode);

module.exports = router;
