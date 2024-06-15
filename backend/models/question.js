var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TestCaseSchema = new Schema({
  input: { type: String, required: true },
  expectedOutput: { type: String, required: true }
});

var QuestionSchema = new Schema({
  uniquename: { type: String, required: true, unique: true, max: 100 },
  title: { type: String, required: true, max: 50 },
  description: { type: String, required: true },
  topics: { type: String },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  testCases: [TestCaseSchema] // Adding test cases
});

// Export the model
module.exports = mongoose.model("Question", QuestionSchema);
