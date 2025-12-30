import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { User, ChevronDown, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function TopNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    base44.auth.redirectToLogin();
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to={createPageUrl('Home')} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">W</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">WatchRaffle</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to={createPageUrl('HowItWorks')} 
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to={createPageUrl('Raffles')} 
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Raffles
            </Link>
            <Link 
              to={createPageUrl('MyTickets')} 
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              My Tickets
            </Link>
            <Link 
              to={createPageUrl('Winners')} 
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Past Winners
            </Link>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-[#131A2B] border-white/10 text-white hover:bg-[#1a2235] hover:text-white gap-2"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.full_name || user.email}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#131A2B] border-white/10">
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white focus:text-white focus:bg-white/5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-medium"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}