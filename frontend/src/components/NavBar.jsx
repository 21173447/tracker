import React, { useState } from "react";
import { Menu, X, Home, Plus, List, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Create Issue", path: "/create", icon: <Plus size={18} /> },
    { name: "View Issues", path: "/issues", icon: <List size={18} /> },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-white/10 p-2 rounded-lg mr-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Lumen</span>
            </div>

            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
                      activeItem === item.name
                        ? "bg-white/10 text-white"
                        : "text-blue-100 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setActiveItem(item.name)}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.name}
                  </a>
                ))}
              </div>
            </div>


            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-blue-100 hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>


        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-700">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  activeItem === item.name
                    ? "bg-white/10 text-white"
                    : "text-blue-100 hover:bg-white/5 hover:text-white"
                }`}
                onClick={() => {
                  setActiveItem(item.name);
                  setIsOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}