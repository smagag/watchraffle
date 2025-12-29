import React from 'react';
import { Trophy, Ticket, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function StatsBar({ raffle }) {
  const [copied, setCopied] = useState(false);
  
  const contractAddress = raffle?.contract_address || '7xKXp...QmPq9';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      icon: Trophy,
      label: 'Prize Value',
      value: raffle?.prize_value_usd ? `$${raffle.prize_value_usd.toLocaleString()}` : '$24,500'
    },
    {
      icon: Ticket,
      label: 'Total Tickets',
      value: raffle?.total_tickets || 200
    },
    {
      icon: LinkIcon,
      label: 'Chain',
      value: 'Solana'
    }
  ];

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="bg-[#131A2B]/50 rounded-xl border border-white/5 p-4"
            >
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                <stat.icon className="w-4 h-4" />
                {stat.label}
              </div>
              <div className="text-white font-semibold text-lg">{stat.value}</div>
            </div>
          ))}
          
          <div className="bg-[#131A2B]/50 rounded-xl border border-white/5 p-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
              <LinkIcon className="w-4 h-4" />
              Contract
            </div>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 text-white font-mono text-sm hover:text-purple-400 transition-colors"
            >
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-500" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}