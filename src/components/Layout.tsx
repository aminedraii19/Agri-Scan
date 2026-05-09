import React, { useState } from 'react';
import { LayoutDashboard, Camera, Map as MapIcon, BarChart3, Settings, LogOut, Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  collapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, onClick, collapsed }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
      active ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-500 hover:bg-slate-100",
      collapsed && "justify-center px-0"
    )}
  >
    <Icon size={22} className={cn(active ? "text-white" : "text-emerald-600")} />
    {!collapsed && <span className="font-medium">{label}</span>}
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'scanner', label: 'AI Scanner', icon: Camera },
    { id: 'fields', label: 'My Fields', icon: MapIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-[#FDFDFB] text-slate-900 font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg text-white">
            <Leaf size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl tracking-tight text-slate-800"
            >
              AgriScan
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              collapsed={!isSidebarOpen}
            />
          ))}
        </nav>

        <div className="px-3 py-6 space-y-2 border-t border-slate-100">
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            collapsed={!isSidebarOpen}
          />
          <button className={cn(
            "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-colors",
            !isSidebarOpen && "justify-center px-0"
          )}>
            <LogOut size={22} />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-bottom border-slate-100 h-16 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg text-slate-500"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 capitalize">{activeTab}</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-slate-50 rounded-full px-4 py-1.5 flex items-center gap-2 border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-medium text-slate-600 font-mono uppercase tracking-wider">Systems Online</span>
             </div>
             <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                AD
             </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
               className="h-full"
             >
               {children}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
