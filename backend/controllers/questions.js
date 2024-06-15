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
  console.log("inside get question");
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

module.exports = { addQuestion, question_all, GetOne };
