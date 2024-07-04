const Question = require('../models/question');

// Add Question
const addQuestion = async (req, res) => {
  let { uniquename, title, description, topics, difficulty,testCases } = req.body;

  try {
    const newQuestion = new Question({
      uniquename,
      title,
      description,
      topics,
      difficulty, 
      testCases
    });

    await newQuestion.save();

    res.status(201).json({
      success: true,
      message: 'Question added successfully',
      question: newQuestion,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add question',
      error: error.message,
    });
  }
};

const question_all = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      success: true,
      message: 'All questions retrieved successfully',
      questions: questions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieve questions',
      error: error.message,
    });
  }
};

const GetOne = async (req, res) => {
  const uniquename = req.params.uniquename;
  try {
    const question = await Question.findOne({uniquename:uniquename});
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Question retrieved successfully',
      question: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieve question',
      error: error.message,
    });
  }
};

// DELETE endpoint to delete a question by IDconst Question = require('../models/question');
const User = require('../models/user'); // Ensure you have a User model to fetch user details

// DELETE endpoint to delete a question by ID
const deleteQuestion = async (req, res) => {
  const { id } = req.params; // Use id instead of questionId for consistency

  try {
    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Ensure the user is authorized to delete the question
    const user = await User.findById(req.user.id);
    if (user.email !== 'dhwani@gmail.com') {
      return res.status(403).json({ error: 'User is not authorized to delete this question' });
    }

    await question.remove();
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' });
  }
};

module.exports = { addQuestion, question_all, GetOne, deleteQuestion };
