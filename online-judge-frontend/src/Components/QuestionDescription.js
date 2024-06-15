import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Code from "./Code";

const QuestionDescription = () => {
  const { uniquename } = useParams();
  const [ques, setQues] = useState();

  useEffect(() => {
    getQuestionDescription().then((data) => setQues(data.question));
  }, [uniquename]);

  const getQuestionDescription = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/questions/${uniquename}`, {
        withCredentials: true,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching question description:", error);
      return null;
    }
  };

  const difficultyColor = () => {
    if (!ques) return "text-gray-700";
    switch (ques.difficulty) {
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

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-white overflow-y-auto border-r border-gray-200 p-6">
        <h1 className="text-3xl font-bold mb-4">{ques?.title}</h1>
        <p className="text-lg mb-4">{ques?.description}</p>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <span className="mr-4">{ques?.topics}</span>
          <span className={`font-bold ${difficultyColor()}`}>{ques?.difficulty}</span>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-6">
        <Code uniquename={ques?.uniquename}/>
      </div>
    </div>
  );
};

export default QuestionDescription;
