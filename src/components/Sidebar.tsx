/* eslint-disable @typescript-eslint/no-explicit-any */

import { primaryMenu, secondaryMenu } from '../constants/dataItems';

// Reusable component for each menu item
const MenuItem = ({ label, href, icon }: { label: string; href: string; icon: any  }) => (
  <li>
   
    <a
      href={href}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group "
    >
       <img src={icon} alt={label} className=' w-5 h-5'/>
      <span className="ms-3">{label}</span>
    </a>
  </li>
);

const Sidebar = () => {
  return (
    <aside
      id="separator-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-8 py-9 overflow-y-auto bg-gray-50 dark:bg-black ">
        {/* Primary Menu */}
        <ul className="space-y-4 font-light space-x-2.5">
          {primaryMenu.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </ul>

        
        <div className="absolute bottom-10 w-48">
          <ul className="space-y-4 font-light  pt-4">
            {secondaryMenu.map((item) => (
              <MenuItem key={item.label} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
