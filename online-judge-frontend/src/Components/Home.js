import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
  const nav = useNavigate();

  return (
    <div className="min-h-screen flex"
         style={{
           background: 'linear-gradient(to right, #4facfe, #00f2fe)',
         }}>
      <div className="bg-black bg-opacity-60 w-1/2 flex items-center justify-center">
        <div className="text-white text-center p-10 rounded-md shadow-lg">
          <h1 className="text-4xl font-bold mb-4 text-yellow-400">Online Judge</h1>
          <p className="text-lg mb-6">Built with React, Node.js, Express, and MongoDB.</p>
          <hr className="border-white w-1/2 mb-8" />
          <Button onClick={() => nav('/questions')}
                  className="text-lg font-bold py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md">
            Go To Questions
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <iframe
          src="https://tenor.com/embed/10785633153336131"
          width="100%"
          height="100%"
          frameBorder="0"
          className="object-cover"
          allowFullScreen
          title="Online Judge GIF"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
