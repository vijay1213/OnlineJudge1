import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQuestions } from "../api/getQuestions";

const QuestionsUser = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getQuestions()
      .then((data) => {
        console.log("Fetched questions:", data);
        if (data && Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          setQuestions([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions.");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Questions</h2>
      <hr className="border-white border-2 mb-6" />
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Questions</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Topics</th>
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
                <td className={`px-4 py-2 capitalize ${item.difficulty === "easy" ? "bg-green-500" : item.difficulty === "medium" ? "bg-yellow-500" : "bg-red-500"}`}>
                  {item.difficulty}
                </td>
                <td className="px-4 py-2">{item.topics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionsUser;
