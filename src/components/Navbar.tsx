import { primaryMenu, navbarLinks } from '../constants/dataItems';
import SearchBar from "./Searchbar";

const MenuItem = ({ label, href }: { label: string; href: string}) => (
    <li>
        <a
            href={href}
            className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0"
        >
            {label}
        </a>
    </li>
);

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white border-b border-gray-800">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="text-2xl font-semibold">REPO</span>
                </a>
                {/* Mobile Menu Button */}
                <button data-collapse-toggle="navbar-default" type="button" 
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:ring-2 focus:ring-gray-600"
                    aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
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
                                <a href={link.href} className="block p-2">
                                    <img src={link.icon} alt={link.label} className="w-5 h-5" />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
