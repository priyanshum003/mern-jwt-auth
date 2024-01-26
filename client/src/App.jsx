import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Header from './components/Header';
import Register from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthStatus } from './features/authSLice';
import { useDispatch } from 'react-redux';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication on page load
    dispatch(checkAuthStatus());
  }, [dispatch]);


  return (
    <Router>
      <ToastContainer />
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;