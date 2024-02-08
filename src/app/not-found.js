import React from 'react';
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">The requested page does not exist.</p>
        <button><Link href={"/"}>HomePage</Link></button>
      </div>
    </div>

  );
};

export default NotFoundPage;