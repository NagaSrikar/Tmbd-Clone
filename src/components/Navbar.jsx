import React from 'react';
import Logo from '../movies-logo.jpg';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <img className="w-14 rounded-full shadow-lg" src={Logo} alt="logo" />
          <Link
            to="/"
            className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition duration-300 tracking-wide"
          >
            MoviesApp
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="text-lg text-white hover:text-orange-400 transition duration-300 font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            to="/watchlist"
            className="text-lg text-white hover:text-orange-400 transition duration-300 font-medium hover:underline"
          >
            Watchlist
          </Link>
          <Link
            to="/recommend"
            className="text-lg text-white hover:text-orange-400 transition duration-300 font-medium hover:underline"
          >
            Recommendations
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
