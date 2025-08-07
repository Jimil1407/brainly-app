import { Brain, Twitter, Play, FileText, Link, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'all', label: 'All Notes', icon: Brain },
  { id: 'tweet', label: 'Tweets', icon: Twitter },
  { id: 'video', label: 'Videos', icon: Play },
  { id: 'document', label: 'Documents', icon: FileText },
  { id: 'link', label: 'Links', icon: Link },
];

export const Sidebar = ({ activeTab, onTabChange, onLogout }: SidebarProps) => {
  return (
    <div className="w-64 bg-gray-50 h-screen p-6 border-r border-gray-200">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-[#5244df] rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Second Brain</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive
                  ? 'bg-[#5244df]/10 text-[#5244df]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}; 