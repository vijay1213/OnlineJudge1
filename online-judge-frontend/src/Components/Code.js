import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";

function Code({uniquename}) {
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
        cout << "The sum of the two numbers is: " << sum;  
        // Return 0 to indicate successful execution
        return 0;  
    }`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [language,setLanguage] = useState("cpp");

  const handleRun = async () => {
    const payload = {
      language: "cpp",
      code,
      input,
    };

    try {
      const { data } = await axios.post(`http://localhost:8080/api/run/running`, payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      language,
      uniquename,
      code
    };

    try {
      const { data } = await axios.post(`http://localhost:8080/api/submit`, payload);
      console.log(data);
      setOutput(data.message);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOptionChange = (e) => {
    const newLanguage = e.target.value;

    setLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-4">Hack-X Online Code Compiler</h1>
      <div className="bg-gray-100 shadow-md w-full mb-4 flex-grow">

      <select onChange={handleOptionChange} value={language}>
        <optgroup label="Language">
            <option name="table1" value="cpp">C++</option>
            <option name="table2" value="py">Python</option>
        </optgroup>
    </select>

        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: "#f7fafc",
            height: "100%",
            overflowY: "auto",
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
            className="w-5 h-5 inline-block align-middle me-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
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
            className="w-5 h-5 inline-block align-middle me-2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          Submit
        </button>
      </div>
      <div className="flex-grow flex flex-col">
        <div className="mb-4 flex-grow">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows="5"
            value={input}
            placeholder="Input"
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full h-full"
          ></textarea>
        </div>
        <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <textarea
              rows="10"
              value={output}
              placeholder="Output"
              onChange={(e) => setOutput(e.target.value)}
              className="border border-gray-300 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
              style={{ minHeight: '100px' }}
            ></textarea>
          </div>
      </div>
    </div>
  );
}

export default Code;
