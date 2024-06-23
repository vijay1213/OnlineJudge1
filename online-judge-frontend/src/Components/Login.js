import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('UserData')) {
      nav('/');
    }
  }, [nav]);

  const handleClick = async () => {
    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data);
      toast.success('Login Success', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem('UserData', JSON.stringify(response.data));
      nav('/');
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.errors, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>
        <div>
          <label htmlFor="email" className="text-white">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="block w-full py-2 px-3 mt-1 mb-4 rounded bg-gray-700 text-white"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-white">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="block w-full py-2 px-3 mt-1 mb-4 rounded bg-gray-700 text-white"
            name="password"
          />
        </div>
        <button onClick={handleClick} className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-bold">
          Login
        </button>
        <div className="text-center mt-4">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
