import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('account'); // State to manage active tab

  const handleTabChange = (tabId) => {
    setActiveTab(tabId); // Update active tab state based on button click
  };

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear session, redirect user, etc.)
    console.log('Logging out...');
    // Example: Clearing session or redirecting to login page
    // Implement your actual logout logic here
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-xl">
          <div className="space-y-4">
            {/* Account button */}
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'account' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('account')}
            >
              Account
            </button>

            {/* Profile button */}
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'profile' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('profile')}
            >
              Profile
            </button>

            {/* User Info button */}
            <button
              className={`w-full text-white font-semibold py-3 px-4 rounded ${
                activeTab === 'userInfo' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'
              } transition`}
              onClick={() => handleTabChange('userInfo')}
            >
              User Info
            </button>

            {/* Logout button */}
            <button
              className="w-full text-white font-semibold py-3 px-4 rounded bg-red-600 hover:bg-red-500 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 bg-white rounded-lg shadow-xl ml-4">
          <div className="tab-content space-y-6">
            {/* Account tab content */}
            <div className={`tab-pane fade ${activeTab === 'account' ? 'show active' : ''}`} id="account" role="tabpanel">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Account Details</h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 mb-2">Display account details here.</p>
              </div>
            </div>

            {/* Profile tab content */}
            <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Profile</h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 mb-2">Display profile information here.</p>
              </div>
            </div>

            {/* User Info tab content */}
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
