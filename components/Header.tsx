import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-gray-50 border-b border-gray-200 backdrop-blur-md bg-opacity-95">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left: Logo & Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-gray-500 hover:text-black transition-colors lg:hidden"
          >
            {isSidebarOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
          
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex flex-col leading-none justify-center">
              <span className="text-xl md:text-2xl font-brand tracking-tight text-black uppercase">
                Doc PDF PPT <span className="text-red-900">HUB</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right side is empty */}
      </div>
    </header>
  );
};

export default Header;