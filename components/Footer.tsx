import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black text-white mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
               <span className="text-xl font-bold font-brand tracking-wide uppercase">Doc PDF PPT <span className="text-red-700">HUB</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering creators with a modern suite of digital utilities. 
              Simple, fast, and secure client-side tools for your daily workflow.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 bg-gray-900 rounded-full text-gray-400 hover:bg-white hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2025 Doc PDF PPT HUB. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 md:mt-0">Designed for efficiency.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;