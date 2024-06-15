const express = require('express');
const router = express.Router();
const { addQuestion, question_all, GetOne } = require('../../controllers/questions.js');

router.post('/', async (req, res) => {
  try {
    const question = await addQuestion(req.body);
    res.status(201).json({ message: 'Question added successfully', question });
  } catch (error) {
    console.error('Error adding question:', error.message);
    res.status(500).json({ message: 'Failed to add question', error: error.message });
  }
});

router.get("/", question_all); // GetAll
router.get("/:uniquename", GetOne); // GetONE
router.post("/add",addQuestion);

module.exports = router;
