import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
