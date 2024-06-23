import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-okaidia.css"; // Dark theme for Prism
import axios from "axios";

function Code({ uniquename }) {
  const [code, setCode] = useState(`#include <iostream> 
    using namespace std;
    // Define the main function
    int main() { 
        // Declare variables
        int num1, num2, sum;
        // Prompt user for input
        cin >> num1 >> num2;  
        // Calculate the sum
        sum = num1 + num2;  
        // Output the result
        cout << sum;  
        // Return 0 to indicate successful execution
        return 0;  
    }`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState(""); // State to track submission status

  const handleRun = async () => {
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/run/running`,
        payload
      );
      setOutput(data.output);
      if (data.errormsg && data.errormsg.length > 1)
        setOutput(data.errormsg.substring(0, 600));
      if (data.output !== null) setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem("UserData")).id;
    const payload = {
      language,
      uniquename,
      code,
      userId,
    };

    try {
      const { data } = await axios.post(`http://localhost:8080/api/submit`, payload);
      if (data.errormsg && data.errormsg.length > 0) {
        setOutput(data.errormsg.substring(0, 600));
        setStatus("WA"); // Set status to Wrong Answer (WA) for failed submission
      } else {
        setOutput(data.message);
        setStatus("AC"); // Set status to Accepted (AC) for successful submission
      }
    } catch (error) {
      console.log(error.response);
      setStatus("WA"); // Set status to Wrong Answer (WA) for API errors
    }
  };

  const handleOptionChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Hack-X Online Code Compiler
      </h1>
      <div className="bg-gray-800 shadow-md w-full mb-4 flex-grow p-4 rounded-md">
        <div className="mb-4">
          <select
            onChange={handleOptionChange}
            value={language}
            className="block w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-gray-200"
          >
            <optgroup label="Language">
              <option value="cpp">C++</option>
              <option value="py">Python</option>
            </optgroup>
          </select>
        </div>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "#000000", // Set background color to black
            color: "#ffffff", // Set text color to white for better readability
            height: "300px",
            overflowY: "auto",
            borderRadius: "0.375rem",
            border: "1px solid #4a5568",
          }}
        />
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleRun}
          type="button"
          className="w-auto px-4 py-2 text-center bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 inline-block align-middle mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          Run
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="w-auto px-4 py-2 text-center bg-gradient-to-br from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 focus:outline-none text-white font-medium rounded-lg text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 inline-block align-middle mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          Submit
        </button>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 bg-gray-800 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows="10"
            value={input}
            placeholder="Input"
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-600 rounded-md py-2 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full bg-gray-700 text-gray-200"
          ></textarea>
        </div>
        <div
          className={`flex-1 rounded-md p-4 ${
            status === "accepted"
              ? "bg-green-800"
              : status === "WA"
              ? "bg-red-800"
              : "bg-gray-800"
          }`}
        >
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <textarea
            rows="10"
            value={output}
            placeholder="Output"
            readOnly
            className="border border-gray-600 rounded-md py-2 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full bg-gray-700 text-gray-200"
            style={{ minHeight: "100px" }}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Code;
