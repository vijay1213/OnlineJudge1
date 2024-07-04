import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const QuestionsUser = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem('UserData')).name;
    if (name === 'vijay') {
      setAuthenticated(true);
    }

    const getQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions.");
        setQuestions([]);
      }
    };

    getQuestions();
  }, []);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const token = JSON.parse(localStorage.getItem('UserData')).token;
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.delete(
        `http://localhost:8080/api/questions/delete/${questionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.data.success) {
        throw new Error(
          `Failed to delete question with id: ${questionId}, status: ${response.status}`
        );
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
      );
      setMessage("Question deleted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      setError("Failed to delete question.");
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8', // Light background color
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with slight transparency
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginBottom: '24px',
    },
    separator: {
      border: '2px solid #333',
      marginBottom: '24px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd',
    },
    thead: {
      backgroundColor: '#333',
      color: '#fff',
    },
    tbody: {
      backgroundColor: '#f9f9f9',
      color: '#333',
    },
    button: {
      backgroundColor: '#d32f2f',
      color: '#fff',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Questions</h2>
        <hr style={styles.separator} />

        {message && <div className="text-center text-green-500 mb-4">{message}</div>}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th className="px-4 py-2">Questions</th>
                <th className="px-4 py-2">Difficulty</th>
                <th className="px-4 py-2">Topics</th>
                {authenticated && <th className="px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody style={styles.tbody}>
              {questions.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    <Link
                      to={`/Question/${item.uniquename}`}
                      className="text-blue-500 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td
                    className={`px-4 py-2 capitalize ${
                      item.difficulty === "easy"
                        ? "bg-green-500 text-white"
                        : item.difficulty === "medium"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.difficulty}
                  </td>
                  <td className="px-4 py-2">{item.topics}</td>
                  {authenticated && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteQuestion(item._id)}
                        style={styles.button}
                      >
                        Delete
                      </button>
                    </td>
                  )}
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
