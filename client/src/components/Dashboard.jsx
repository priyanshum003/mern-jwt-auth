import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSLice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser()).unwrap().then((res) => {
      toast.success(res.message);
      navigate('/login');
    }).catch((err) => {
      toast.error(err.message || err.data.message);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        {user ? (
          <div>
            <p className="mb-2">Welcome, {user.username}!</p>
            <p className="mb-2">Your id is {user.id}</p>
            {/* Additional user data can be displayed here */}
            <div className="flex justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;