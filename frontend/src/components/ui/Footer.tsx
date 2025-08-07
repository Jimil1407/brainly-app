import { Brain, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-[#5244df] rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Second Brain</h3>
              <p className="text-gray-600 text-sm">Personal Knowledge Management</p>
            </div>
          </div>

          {/* Made by */}
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">Made with ❤️ by</span>
            <a
              href="https://jimil.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5244df] hover:text-[#5244df]/80 font-medium flex items-center gap-1 transition-colors"
            >
              Jimil Digaswala
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Second Brain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 