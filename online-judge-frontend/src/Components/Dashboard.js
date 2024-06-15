import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <button
            className="nav-link text-white font-bold py-2 px-4 rounded mb-2 bg-gray-700 hover:bg-gray-600"
            data-bs-toggle="pill"
            data-bs-target="#account"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="true"
          >
            Account
          </button>
          <button
            className="nav-link text-white font-bold py-2 px-4 rounded mb-2 bg-gray-700 hover:bg-gray-600"
            data-bs-toggle="pill"
            data-bs-target="#profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Profile
          </button>
          <button
            className="nav-link text-white font-bold py-2 px-4 rounded mb-2 bg-gray-700 hover:bg-gray-600"
            data-bs-toggle="pill"
            data-bs-target="#userInfo"
            role="tab"
            aria-controls="v-pills-users"
            aria-selected="false"
          >
            User Info
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4">
          <div className="tab-content">
            <div className="tab-pane fade show active" id="account" role="tabpanel">
              {/* Account Content */}
              <h2 className="text-2xl font-bold mb-4">Account Details</h2>
              <p className="text-lg text-gray-700 mb-2">Display account details here.</p>
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel">
              {/* Profile Content */}
              <h2 className="text-2xl font-bold mb-4">Profile</h2>
              <p className="text-lg text-gray-700 mb-2">Display profile information here.</p>
            </div>
            <div className="tab-pane fade" id="userInfo" role="tabpanel">
              {/* User Info Content */}
              <h2 className="text-2xl font-bold mb-4">User Info</h2>
              <p className="text-lg text-gray-700 mb-2">Display user information here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
