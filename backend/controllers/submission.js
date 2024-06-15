// submissionController.js
const { exec } = require("child_process");
const Question = require("../models/question");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require('uuid');

// Sample function to run code
const moment = require("moment"); // For executing code

const runCode = async (req, res) => {
  const { code, input, language } = req.body;

  // Ensure necessary data is present
  if (!code || !input || !language) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create directories to store the user's code files
  const baseDir = path.join(__dirname, "code_submissions");
  const codeDir = path.join(baseDir, "codes");
  const inputDir = path.join(baseDir, "inputs");
  const outputDir = path.join(baseDir, "outputs");

  [codeDir, inputDir, outputDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const jobID = uuid();
  const fileExtension = language === "py" ? "py" : "cpp";
  const codeFilePath = path.join(codeDir, `run_submission_${jobID}.${fileExtension}`);
  const execFilePath = path.join(outputDir, `run_submission_${jobID}.exe`);

  fs.writeFileSync(codeFilePath, code);

  const compileCommand = language === "py" ? `python -m py_compile "${codeFilePath}"` : `g++ ${codeFilePath} -o ${execFilePath}`;
  const runCommand = language === "py" ? `python ${codeFilePath}` : `${execFilePath}`;

  const execPromise = (cmd) => {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else if (stderr) {
          reject({ stderr });
        } else {
          resolve(stdout);
        }
      });
    });
  };

  const runUserCode = (input) => {
    return new Promise((resolve, reject) => {
      const inputFilePath = path.join(inputDir, `${jobID}_input.txt`);
      fs.writeFileSync(inputFilePath, input);

      const runCmd = language === "py"
        ? `python ${codeFilePath} < ${inputFilePath}`
        : `${execFilePath} < ${inputFilePath}`;

      execPromise(runCmd).then(resolve).catch(reject);
    });
  };

  try {
    if (language !== "py") {
      await execPromise(compileCommand);
    }

    const output = await runUserCode(input);

    // Clean up created files
    fs.unlinkSync(codeFilePath);
    if (language !== "py" && fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);

    return res.status(200).json({ output: output.trim() });
  } catch (err) {
    // Clean up created files
    fs.unlinkSync(codeFilePath);
    if (language !== "py" && fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);

    return res.status(500).json({ message: "Error executing code", error: err });
  }
};


const submitCode = async (req, res) => {
  const { language = "cpp", code, uniquename } = req.body;

  if (!code) return res.status(400).json({ message: "Code is empty" });

  // Fetch the question by uniquename
  const question = await Question.findOne({ uniquename });

  if (!question) return res.status(404).json({ message: "Question not found" });

  const testCases = question.testCases;

  // Create directories to store the user's code files
  const baseDir = path.join(__dirname, "code_submissions");
  const codeDir = path.join(baseDir, "codes");
  const inputDir = path.join(baseDir, "inputs");
  const outputDir = path.join(baseDir, "outputs");

  [codeDir, inputDir, outputDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
      }
  });

  const jobID = uuid();
  const fileExtension = language === "py" ? "py" : "cpp";
  const codeFilePath = path.join(codeDir, `submission_${jobID}.${fileExtension}`);
  const execFilePath = path.join(outputDir, `submission_${jobID}.exe`);
  console.log(codeFilePath);
  fs.writeFileSync(codeFilePath, code);

  const compileCommand = language === "py" ? `python -m py_compile "${codeFilePath}"` : `g++ ${codeFilePath} -o ${execFilePath}`;
  const runCommand = language === "py" ? `python ${codeFilePath}` : `${execFilePath}`;

  const execPromise = (cmd) => {
      return new Promise((resolve, reject) => {
          exec(cmd, (error, stdout, stderr) => {
              if (error) {
                  reject({ error, stderr });
              } else if (stderr) {
                  reject({ stderr });
              } else {
                  resolve(stdout);
              }
          });
      });
  };

  const runTestCase = (input) => {
      return new Promise((resolve, reject) => {
          const inputFilePath = path.join(inputDir, `${jobID}_input.txt`);
          fs.writeFileSync(inputFilePath, input);

          const runCmd = language === "py"
              ? `python ${codeFilePath} < ${inputFilePath}`
              : `${execFilePath} < ${inputFilePath}`;

          execPromise(runCmd).then(resolve).catch(reject);
      });
  };

  let allPassed = true;
  const results = [];

  try {
    
          await execPromise(compileCommand);
    

      for (let testCase of testCases) {
          const { input, expectedOutput } = testCase;
          try {
              const output = await runTestCase(input);
              
              if (output.trim() !== expectedOutput.trim()) {
                  allPassed = false;
                  break;
              }
          } catch (err) {

              break;
          }
      }
  } catch (err) {
      fs.unlinkSync(codeFilePath);
      if (language !== "py" && fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);
      return res.status(500).json({ message: "Error executing code", error: err });
  }

  // Clean up created files
  fs.unlinkSync(codeFilePath);
  if (language !== "py" && fs.existsSync(execFilePath)) fs.unlinkSync(execFilePath);

  if (allPassed) {
    console.log("all passed");
      return res.status(200).json({ message: "Submission accepted", results });
  } else {
      return res.status(200).json({ message: "Wrong answer", results });
  }
};


module.exports = {
  runCode,
  submitCode,
};
