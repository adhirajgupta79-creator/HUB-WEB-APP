import React from 'react';
import { Tool } from '../types';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const Icon = tool.icon;

  return (
    <div 
      onClick={() => onClick(tool)}
      className="group relative bg-white border border-red-900 rounded-xl p-6 hover:border-black hover:ring-1 hover:ring-black shadow-sm hover:shadow-none transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 border border-gray-200 group-hover:border-black transition-all duration-300">
          <Icon 
            className="text-gray-500 group-hover:text-black transition-all duration-300 transform group-hover:scale-105 stroke-[1.5px] group-hover:stroke-[2.5px]"
            size={24} 
          />
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
          {tool.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-900 transition-colors">
          {tool.description}
        </p>
        
        <div className="flex items-center text-xs font-bold uppercase tracking-wider opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-black">
          Open Tool <ArrowRight size={14} className="ml-1" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default ToolCard;