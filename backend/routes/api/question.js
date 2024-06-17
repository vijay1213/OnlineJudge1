const express = require('express');
const router = express.Router();
const { addQuestion, question_all, GetOne, deleteQuestion } = require('../../controllers/questions.js');

// Add Question
router.post('/add', addQuestion);

// Get All Questions
router.get("/", question_all);

// Get One Question by uniquename
router.get("/:uniquename", GetOne);

// Delete Question by ID
router.delete('/:questionId', deleteQuestion);

module.exports = router;
