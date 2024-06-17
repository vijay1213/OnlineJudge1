import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for making HTTP requests

const QuestionsUser = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const [message, setMessage] = useState(null); // Add message state for success or failure

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/questions');
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to fetch questions.');
        setQuestions([]);
      }
    };

    getQuestions();
  }, []);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/questions/${questionId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete question with id: ${questionId}, status: ${response.status}`);
      }
  
      setQuestions((prevQuestions) => prevQuestions.filter(question => question._id !== questionId));
      setMessage('Question deleted successfully');
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to delete question.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Questions</h2>
        <hr className="border-white border-2 mb-6" />

        {/* Display message or error */}
        {message && <div className="text-center text-green-500 mb-4">{message}</div>}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2">Questions</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Topics</th>
                <th className="px-4 py-2">Actions</th> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody className="text-center">
              {questions.map((item) => (
                <tr key={item._id} className="bg-gray-700 text-white">
                  <td className="px-4 py-2">
                    <Link to={`/Question/${item.uniquename}`} className="text-blue-400 hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td
                    className={`px-4 py-2 capitalize ${
                      item.difficulty === "easy"
                        ? "bg-green-500"
                        : item.difficulty === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.difficulty}
                  </td>
                  <td className="px-4 py-2">{item.topics}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteQuestion(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuestionsUser;
