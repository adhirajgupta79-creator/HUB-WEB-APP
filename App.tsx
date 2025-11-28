import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import ToolModal from './components/ToolModal';
import Footer from './components/Footer';
import { TOOLS } from './constants';
import { Tool, ToolCategory } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [filterTag, setFilterTag] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Image to', value: 'Image' },
    { label: 'PDF', value: 'PDF' },
    { label: 'DOC', value: 'DOC' },
    { label: 'PPT', value: 'PPT' },
    { label: 'Text to', value: 'Text' },
  ];

  const filteredTools = TOOLS.filter(tool => {
    // 1. Check Sidebar Category
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;

    // 2. Check Quick Filter Tag
    let matchesTag = true;
    if (filterTag !== 'All') {
      const title = tool.title.toLowerCase();
      const desc = tool.description.toLowerCase();
      
      if (filterTag === 'Image') {
        matchesTag = title.includes('image');
      } else if (filterTag === 'PDF') {
        // Match PDF tools but exclude specific "To PDF" converters as requested
        matchesTag = title.includes('pdf') && 
                     !title.includes('excel to pdf') && 
                     !title.includes('powerpoint to pdf') && 
                     !title.includes('word to pdf') && 
                     !title.includes('text to pdf');
      } else if (filterTag === 'DOC') {
        matchesTag = title.includes('doc') || title.includes('word');
      } else if (filterTag === 'PPT') {
        matchesTag = title.includes('ppt') || title.includes('powerpoint');
      } else if (filterTag === 'Text') {
        matchesTag = title.includes('text');
      }
    }

    return matchesCategory && matchesTag;
  });

  const handleFilterClick = (tagValue: string) => {
    setFilterTag(tagValue);
    // Reset category to 'All' to ensure the user sees results across all categories for this tag
    setActiveCategory('All');
  };

  const handleSidebarCategoryClick = (cat: ToolCategory | 'All') => {
    setActiveCategory(cat);
    // Reset filter tag to 'All' when specific category is selected from sidebar
    setFilterTag('All');
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      <Header 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1 relative">
        <Sidebar 
          activeCategory={activeCategory} 
          setActiveCategory={handleSidebarCategoryClick} 
          isOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0 p-4 md:p-8 lg:p-12">
          
          {/* Hero Section */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black mb-6 uppercase font-brand">
              Doc PDF PPT <span className="text-red-900">HUB</span>
            </h1>
            <p className="text-gray-500 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
              No need to sign up or log in. Use freely 20+ tools related to PDF, DOCS and PPT.
            </p>
          </div>

          {/* Quick Filter Options (Replacing Search Bar) */}
          <div className="flex flex-wrap gap-3 mb-12">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFilterClick(option.value)}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-200 border
                  ${filterTag === option.value 
                    ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black hover:shadow-md'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Tools Grid Layout */}
          {filteredTools.length === 0 ? (
             <div className="text-center py-20">
               <p className="text-xl text-gray-400 font-medium">No matching tools found.</p>
               <button 
                 onClick={() => { setFilterTag('All'); setActiveCategory('All'); }}
                 className="mt-4 text-red-900 font-bold hover:underline"
               >
                 View all tools
               </button>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={setSelectedTool} 
                />
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />

      {/* Modal */}
      {selectedTool && (
        <ToolModal 
          tool={selectedTool} 
          onClose={() => setSelectedTool(null)} 
        />
      )}
    </div>
  );
};

export default App;