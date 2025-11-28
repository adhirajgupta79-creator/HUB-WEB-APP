import React from 'react';
import { ToolCategory } from '../types';
import { Layers, Image, Grid, Home, Info } from 'lucide-react';

interface SidebarProps {
  activeCategory: ToolCategory | 'All';
  setActiveCategory: (category: ToolCategory | 'All') => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, isOpen }) => {
  const menuItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'About', icon: Info, href: '#' },
  ];

  const categories = [
    { name: 'All', icon: Grid, value: 'All' },
    { name: 'PDF Tools', icon: Layers, value: ToolCategory.PDF },
    { name: 'Image Tools', icon: Image, value: ToolCategory.IMAGE },
  ];

  return (
    <aside 
      className={`fixed lg:sticky top-[73px] h-[calc(100vh-73px)] w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300 z-30 overflow-y-auto
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      shadow-lg lg:shadow-none`}
    >
      <div className="p-6">
        
        {/* Main Navigation Menu */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h3 className="text-gray-400 font-bold text-xs tracking-wider uppercase mb-4">
            Menu
          </h3>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-500 hover:bg-white hover:text-black hover:shadow-sm hover:border-gray-200 border border-transparent transition-all duration-200 group"
              >
                <item.icon size={18} strokeWidth={1.5} className="group-hover:text-black transition-colors" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Categories Section */}
        <div>
          <h3 className="text-gray-400 font-bold text-xs tracking-wider uppercase mb-4">
            Categories
          </h3>
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value;
              
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.value as ToolCategory | 'All')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group border border-transparent
                    ${isActive 
                      ? 'bg-black text-white shadow-sm border-black' 
                      : 'text-gray-500 hover:bg-white hover:text-black hover:shadow-sm hover:border-gray-200'
                    }`}
                >
                  <Icon size={18} strokeWidth={1.5} className={`${isActive ? '' : 'group-hover:text-black'}`} />
                  {cat.name}
                </button>
              );
            })}
          </nav>
        </div>

      </div>
      
      {/* Footer Info */}
      <div className="sticky bottom-0 left-0 w-full p-6 bg-gray-50 border-t border-gray-200 mt-auto">
         <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            System Operational
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;