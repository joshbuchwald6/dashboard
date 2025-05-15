import React from 'react';
import { LayoutDashboard, CreditCard, FileText, PiggyBank, TrendingUp, Target, Briefcase, FileCode, HelpCircle, Settings, User } from 'lucide-react';
import { Link } from './ui/Link';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => {
  return (
    <Link 
      href="#" 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        active 
          ? 'bg-gray-800 text-white' 
          : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800/60 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">Budget</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <SidebarItem icon={<CreditCard size={20} />} label="Accounts" />
          <SidebarItem icon={<FileText size={20} />} label="Transactions" />
          <SidebarItem icon={<PiggyBank size={20} />} label="Budget" />
          <SidebarItem icon={<TrendingUp size={20} />} label="Spending Trends" />
          <SidebarItem icon={<Target size={20} />} label="Goals" />
          <SidebarItem icon={<Briefcase size={20} />} label="Investments" />
          <SidebarItem icon={<FileCode size={20} />} label="Tax & Tools" />
        </nav>
        <div className="mt-auto border-t border-gray-800/60 px-3 py-4 space-y-1">
          <SidebarItem icon={<HelpCircle size={20} />} label="Help" />
          <SidebarItem icon={<Settings size={20} />} label="Settings" />
          <SidebarItem icon={<User size={20} />} label="Profile" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex justify-end items-center p-4 border-b border-gray-800/60 bg-gray-900/50 backdrop-blur-sm">
          <button className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-purple-300 bg-purple-950/50 rounded-lg border border-purple-800/30 transition-all hover:bg-purple-800/20">
            <span className="text-purple-400">✨</span> Ask AI
          </button>
          <button className="ml-4 p-2 text-gray-400 rounded-full hover:bg-gray-800/50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
          </button>
          <button className="ml-4 p-2 text-gray-400 rounded-full hover:bg-gray-800/50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l2 2"></path></svg>
          </button>
          <button className="ml-4 w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-gray-900 font-medium">
            N
          </button>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};