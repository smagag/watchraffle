import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: 'Docs', href: '#' },
    { label: 'Smart Contract', href: '#' },
    { label: 'X / Twitter', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">W</span>
            </div>
            <span className="text-slate-500 text-sm">© 2025 WatchRaffle</span>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-slate-300 text-sm transition-colors flex items-center gap-1"
              >
                {link.label}
                {(link.label === 'Smart Contract' || link.label === 'X / Twitter' || link.label === 'Discord') && (
                  <ExternalLink className="w-3 h-3" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}