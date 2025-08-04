import React from "react";
import { Link } from "react-router-dom";
import { primaryMenu, navbarLinks } from "@/constants/dataItems";
import SearchBar from "@/components/Searchbar";

const MenuItem = ({ label, href }: { label: string; href: string }) => (
  <li>
    <Link
      to={href}
      className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
    >
      {label}
    </Link>
  </li>
);

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white border-b border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="text-2xl font-semibold">JOTS</span>
        </Link>
        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:ring-2 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* Navbar Items */}
        <div className="hidden w-full md:flex md:items-center md:w-auto">
          <ul className="flex flex-col p-4 md:flex-row md:space-x-6">
            {primaryMenu.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </ul>
        </div>
        {/* Search Bar */}
        <div className="hidden md:block md:w-auto">
          <SearchBar />
        </div>
        {/* Navbar Links */}
        <div className="hidden md:block md:w-auto">
          <ul className="flex space-x-4">
            {navbarLinks.map((link) => (
              <li key={link.label}>
                {link.label === "logout" ? (
                  <button className="block p-2">
                    {typeof link.icon === "string" ? (
                      <img
                        src={link.icon}
                        alt={link.label}
                        className="w-5 h-5"
                      />
                    ) : (
                      // If link.icon is a React component (IconType)
                      <span className="w-5 h-5 flex items-center justify-center">
                        {link.icon && React.createElement(link.icon)}
                      </span>
                    )}
                  </button>
                ) : (
                  <Link to={link.href} className="block p-2">
                    {typeof link.icon === "string" ? (
                      <img
                        src={link.icon}
                        alt={link.label}
                        className="w-5 h-5"
                      />
                    ) : (
                      <span className="w-5 h-5 flex items-center justify-center">
                        {link.icon && React.createElement(link.icon)}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
