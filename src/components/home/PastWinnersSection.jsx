import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function PastWinnersSection({ winners = [] }) {
  const defaultWinners = [
    {
      id: 1,
      name: 'Rolex Submariner',
      image_url: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=400&q=80',
      winning_ticket: 47,
      winner_wallet: '8xPQm...nK2s',
      tx_hash: 'abc123'
    },
    {
      id: 2,
      name: 'Patek Philippe Nautilus',
      image_url: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80',
      winning_ticket: 183,
      winner_wallet: '4mNLp...rT9w',
      tx_hash: 'def456'
    },
    {
      id: 3,
      name: 'Audemars Piguet Royal Oak',
      image_url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80',
      winning_ticket: 92,
      winner_wallet: '2kRSv...pQ7x',
      tx_hash: 'ghi789'
    }
  ];

  const displayWinners = winners.length > 0 ? winners : defaultWinners;

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Past Winners</h2>
              <p className="text-slate-400">Verified on-chain</p>
            </div>
            <Link 
              to={createPageUrl('Winners')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {displayWinners.slice(0, 3).map((winner) => (
              <div 
                key={winner.id}
                className="bg-[#131A2B] rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors group"
              >
                <div className="relative h-48 bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-6 flex items-center justify-center">
                  <img
                    src={winner.image_url}
                    alt={winner.name}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-white font-medium mb-3">{winner.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Winning Ticket</span>
                      <span className="text-white font-mono">#{winner.winning_ticket}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Winner</span>
                      <span className="text-white font-mono">{winner.winner_wallet}</span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <a 
                        href={`https://solscan.io/tx/${winner.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        View transaction
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}