import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="font-bold text-2xl">MERN Jwt Auth</Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:text-blue-200">Dashboard</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;