import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('account');
  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); // Endpoint to invalidate session on backend
      localStorage.removeItem('UserData');
      console.log('Token removed:', localStorage.getItem('UserData'));
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex">
        <div className="w-1/4 p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl">
          <div className="space-y-4">
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'account' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('account')}
            >
              Account
            </button>
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'profile' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('profile')}
            >
              Profile
            </button>
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'userInfo' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('userInfo')}
            >
              User Info
            </button>
            <button
              className="w-full text-white font-semibold py-3 px-4 rounded bg-red-600 hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex-grow p-6 bg-white rounded-lg shadow-xl ml-4">
          <div className="tab-content space-y-6">
            <div className={`tab-pane fade ${activeTab === 'account' ? 'show active' : ''}`} id="account" role="tabpanel">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Account Details</h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 mb-2">Display account details here.</p>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile</h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 mb-2">Display profile information here.</p>
              </div>
            </div>
            <div className={`tab-pane fade ${activeTab === 'userInfo' ? 'show active' : ''}`} id="userInfo" role="tabpanel">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">User Info</h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 mb-2">Display user information here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
