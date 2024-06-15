import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import img from '../images/online judge.png';

const Home = () => {
  const nav = useNavigate();

  return (
    <div className="bg-cover bg-center min-h-screen flex items-center justify-center"
         style={{ backgroundImage: `url(${img})` }}>
      <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
        <div className="text-white text-center p-10 rounded-md">
          <h1 className="text-4xl font-bold mb-4">Online Judge</h1>
          <p className="text-lg mb-6">Built with React, Node.js, Express, and MongoDB.</p>
          <hr className="border-white w-1/2 mb-8" />
          <Button onClick={() => nav('/questions')} className="text-lg font-bold py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg">
            Go To Questions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
