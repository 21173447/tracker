import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Issue Tracker</div>

      <ul className="hidden md:flex space-x-6">
        <li>
          <a href="/" className="hover:text-gray-200">Home</a>
        </li>
        <li>
          <a href="/create" className="hover:text-gray-200">Create Issue</a>
        </li>
        <li>
          <a href="/issues" className="hover:text-gray-200">View Issues</a>
        </li>
      </ul>

      {/* Hamburger menu for small screens */}
      <div className="md:hidden">
        <button>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
