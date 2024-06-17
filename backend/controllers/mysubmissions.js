const Submission = require('../models/submission'); // adjust the path to your actual model file

const getSubmissions = async (req, res) => {
  try {
    console.log("Inside my submissions");
    
    const userId = req.query.userId;
    const { uniquename } = req.params;

    console.log("user id is",userId);
    console.log("uniquename is",uniquename);

    if (!userId || !uniquename) {
      return res.status(400).json({ error: "User ID and problem unique name are required." });
    }

    // Find the submissions for the given user and problem
    const submissions = await Submission.find({ userId, uniquename }).sort({submittedAt:-1});

    res.status(200).json({ submissions });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
};

exports.getSubmissions=getSubmissions;