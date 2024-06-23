const express = require('express');
const router = express.Router();
const { addQuestion, question_all, GetOne, deleteQuestion } = require('../../controllers/questions.js');
const authenticateToken = require('../../middleware/authMiddleware');
const Question = require('../../models/question'); // Adjust with your Question model
const User = require('../../models/user'); // Adjust with your User model

// Add Question
router.post('/add', addQuestion);

// Get All Questions
router.get("/", question_all);

// Get One Question by uniquename
router.get("/:uniquename", GetOne);

// Delete Question by ID
router.delete('/delete/:id', authenticateToken, async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).send({ error: 'Question not found' });
      }
  
      const user = await User.findById(req.user.id);
      if (user.email !== 'vijay@gmail.com') {
        return res.status(403).send({ error: 'User is not authorized to delete this question' });
      }
      await Question.deleteOne({ _id: req.params.id });
      res.send({ success: true, message: 'Question deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send({ error: 'Server error' });
    }
  });

module.exports = router;
