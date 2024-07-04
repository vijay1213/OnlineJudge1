import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Code from "./Code";

// Define the difficultyColor function
const difficultyColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "hard":
      return "text-red-600";
    default:
      return "text-gray-700";
  }
};

const QuestionDescription = () => {
  const { uniquename } = useParams();
  const [ques, setQues] = useState(null);
  const [previousSubmissions, setPreviousSubmissions] = useState([]);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("description");
  const [selectedSubmission, setSelectedSubmission] = useState();

  useEffect(() => {
    getQuestionDescription();
    fetchPreviousSubmissions();
  }, [uniquename]);

  const getQuestionDescription = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/questions/${uniquename}`,
        {
          withCredentials: true,
        }
      );
      setQues(res.data.question);
    } catch (error) {
      console.error("Error fetching question description:", error);
    }
  };

  const fetchPreviousSubmissions = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("UserData")).id;
      setLoadingSubmissions(true);
      const res = await axios.get(
        `http://localhost:8080/api/submissions/mysubmissions/${uniquename}`,
        {
          params: { userId },
          withCredentials: true,
        }
      );
      setPreviousSubmissions(res.data.submissions);
    } catch (error) {
      console.error("Error fetching previous submissions:", error);
      setError("Failed to fetch previous submissions.");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleSubmissionClick = (submission) => {
    setSelectedSubmission(submission);
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-between bg-white shadow-lg p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setView("description")}
              className={`py-2 px-4 rounded ${
                view === "description"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setView("submissions")}
              className={`py-2 px-4 rounded ${
                view === "submissions"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Submissions
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {view === "description" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold text-indigo-600">
                  {ques?.title}
                </h1>
                <div className="flex items-center text-sm text-gray-700">
                  {ques?.topics && (
                    <span className="mr-4 bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-xs font-semibold">
                      {ques?.topics}
                    </span>
                  )}
                  <span
                    className={`font-bold ${difficultyColor(
                      ques?.difficulty
                    )} text-lg`}
                  >
                    {ques?.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-lg mb-4 leading-relaxed text-gray-800">
                {ques?.description}
              </p>
            </div>
          )}
          {view === "submissions" && (
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Previous Submissions
              </h2>
              {loadingSubmissions ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-orange-500">{error}</p>
              ) : previousSubmissions.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {previousSubmissions.map((submission) => (
                    <li key={submission._id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span
                            className={`text-sm mr-2 ${
                              submission.verdict === "AC" ||
                              submission.verdict === "pass"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {submission.verdict === "AC" ||
                            submission.verdict === "pass"
                              ? "Accepted"
                              : submission.verdict === "WA"
                              ? "Wrong Answer"
                              : "Compilation Error"}
                          </span>
                        </div>
                        <button
                          onClick={() => handleSubmissionClick(submission)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Submitted on{" "}
                        {new Date(submission.submittedAt).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No submissions found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-1/2 bg-white p-6 shadow-lg">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">
          Code Editor
        </h2>
        {selectedSubmission ? (
          <div>
            <h3 className="text-2xl font-semibold mb-4">Submission Details</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {selectedSubmission.code}
            </pre>
            <p
              className={`text-xl font-semibold mt-4 ${
                selectedSubmission.verdict === "AC" || selectedSubmission.verdict === "pass"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {selectedSubmission.verdict === "AC" || selectedSubmission.verdict === "pass"
                ? "Accepted"
                : selectedSubmission.verdict === "WA"
                ? "Wrong Answer"
                : "Compilation Error"}
            </p>
            <button
              onClick={() => setSelectedSubmission(null)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
            >
              Back to Submissions
            </button>
          </div>
        ) : (
          <Code uniquename={ques?.uniquename} />
        )}
      </div>
    </div>
  );
};

export default QuestionDescription;
