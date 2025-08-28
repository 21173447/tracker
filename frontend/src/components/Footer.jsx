import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-bold text-indigo-600">Lumen</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">Contact Us</a>
          </nav>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Lumen. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer