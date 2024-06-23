import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [user, setUser] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('UserData')) {
      setUser(JSON.parse(localStorage.getItem('UserData')));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-800 shadow-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6 bg-cover bg-center" style={{ backgroundImage: 'url("/path/to/your/image.jpg")' }}>
        <div>
          <Link to="/" className="text-gray-200 text-xl font-bold mr-6">
            OnlineJudge
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 border border-gray-400 rounded text-gray-200 hover:text-white hover:border-white">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow">
            <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              Home
            </Link>
            <Link to="/questions" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
              Questions
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Dashboard
                </Link>
                <Link to="/addQ" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Add Question
                </Link>
              </>
              
            ) : (
              <>
                <Link to="/login" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Login
                </Link>
                <Link to="/signup" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
