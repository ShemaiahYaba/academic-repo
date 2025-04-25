import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

      {/* <div className="flex flex-row p-32">
      <Sidebar />
      </div> */}
      {/* Content Area */}
      <div className="flex flex-col flex-1">
         
         <Navbar/>

        <main className="flex-grow p-4 overflow-y-auto">
          {children}
          </main>

        {/* Footer */}
        <div className="relative">
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
