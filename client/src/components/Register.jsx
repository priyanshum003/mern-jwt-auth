import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/authSLice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const Register = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: '',
        password: ''
    })

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(userData)).unwrap().then((res) => {
            toast.success(res.message);
            navigate('/login');
        }).catch((err) => {
            toast.error(err.message || err.data.message);
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        name='username'
                        value={userData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        name='password'
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleRegister}
                >
                    Register
                </button>
            </div>
        </div>
    )
}

export default Register