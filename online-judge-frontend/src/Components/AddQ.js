import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddQ = () => {
  const [formData, setFormData] = useState({
    uniquename: '',
    title: '',
    description: '',
    topics: '',
    difficulty: '',
    testCases: [{ input: '', expectedOutput: '' }] // Initialize with one empty test case
  });
  const onChange1 = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const { uniquename, title, description, topics, difficulty, testCases } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onChangeTestCase = (index, e) => {
    const { name, value } = e.target;
    const newTestCases = [...testCases];
    newTestCases[index][name] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({ ...formData, testCases: [...testCases, { input: '', expectedOutput: '' }] });
  };

  const removeTestCase = (index) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/questions/add', {uniquename, title, description, topics, difficulty, testCases});
      console.log(res.data);
      toast.success('Question added successfully!');
    } catch (err) {
      if (err.response) {
        console.error('Error response data:', err.response.data);
        toast.error(`Failed to add question: ${err.response.data.message || 'Unknown error'}`);
      } else {
        console.error('Error:', err.message);
        toast.error(`Failed to add question: ${err.message}`);
      }
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
    },
    form: {
      maxWidth: '32rem',
      width: '100%',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#1f2937',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#374151',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      color: '#374151',
      fontSize: '1rem',
    },
    textarea: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      color: '#374151',
      fontSize: '1rem',
      height: '8rem',
    },
    select: {
      display: 'block',
      width: '100%',
      padding: '0.5rem',
      marginBottom: '1.5rem',
      borderRadius: '0.375rem',
      border: '1px solid #d1d5db',
      color: '#374151',
      fontSize: '1rem',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#3b82f6',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s',
    },
    buttonHover: {
      backgroundColor: '#2563eb',
    },
    testCaseContainer: {
      marginBottom: '1rem',
    },
    testCaseButton: {
      display: 'block',
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#10b981',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '0.375rem',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.2s',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={onSubmit}>
        <h2 style={styles.title}>Add New Question</h2>
        <div>
          <label style={styles.label}>Unique Name</label>
          <input
            type="text"
            name="uniquename"
            value={uniquename}
            onChange={onChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            required
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            required
            style={styles.textarea}
          />
        </div>
        <div>
          <label style={styles.label}>Topics</label>
          <input
            type="text"
            name="topics"
            value={topics}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div>
          <label style={styles.label}>Difficulty</label>
          <select
            name="difficulty"
            value={difficulty}
            onChange={onChange}
            required
            style={styles.select}
          >
            <option value="" disabled>Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {testCases.map((testCase, index) => (
          <div key={index} style={styles.testCaseContainer}>
            <label style={styles.label}>Test Case {index + 1}</label>
            <input
              type="text"
              name="input"
              placeholder="Input"
              value={testCase.input}
              onChange={(e) => onChangeTestCase(index, e)}
              required
              style={styles.input}
            />
            <input
              type="text"
              name="expectedOutput"
              placeholder="Expected Output"
              value={testCase.expectedOutput}
              onChange={(e) => onChangeTestCase(index, e)}
              required
              style={styles.input}
            />
            {testCases.length > 1 && (
              <button type="button" onClick={() => removeTestCase(index)} style={styles.testCaseButton}>
                Remove Test Case
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addTestCase} style={styles.testCaseButton}>
          Add Test Case
        </button>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Add Question
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddQ;
