// questionApi.js

import axios from 'axios';

export const getQuestions = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/questions');
    return response.data; // Assuming your API returns an object with a 'questions' array
  } catch (error) {
    throw Error('Failed to fetch questions');
  }
};
