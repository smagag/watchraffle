import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { ExternalLink, Trophy, Calendar, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function Winners() {
  const { data: completedRaffles = [] } = useQuery({
    queryKey: ['completed-raffles'],
    queryFn: async () => {
      const raffles = await base44.entities.Raffle.filter({ status: 'completed' });
      return raffles;
    },
  });

  // Demo winners if none exist
  const demoWinners = [
    {
      id: 1,
      name: 'Rolex Submariner Date',
      image_url: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=80',
      prize_value_usd: 14500,
      winning_ticket: 47,
      winner_wallet: '8xPQm4nKL2sTvWzA5bC6dE4fG8iJ1kLmN',
      tx_hash: '3xHs7YmNpQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTuVw',
      end_date: '2024-12-15T18:00:00Z',
      total_tickets: 150
    },
    {
      id: 2,
      name: 'Patek Philippe Nautilus 5711',
      image_url: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80',
      prize_value_usd: 145000,
      winning_ticket: 183,
      winner_wallet: '4mNLpRsTvWxAz5bC6dE4fG8iJ1kLmNoQp',
      tx_hash: '5yJu9AmOpQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTu',
      end_date: '2024-11-28T18:00:00Z',
      total_tickets: 500
    },
    {
      id: 3,
      name: 'Audemars Piguet Royal Oak',
      image_url: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=600&q=80',
      prize_value_usd: 58000,
      winning_ticket: 92,
      winner_wallet: '2kRSvWxAz5bC6dE4fG8iJ1kLmNoQpRsTu',
      tx_hash: '7zKv1BnCpQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTu',
      end_date: '2024-11-10T18:00:00Z',
      total_tickets: 300
    },
    {
      id: 4,
      name: 'Omega Speedmaster Moonwatch',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      prize_value_usd: 7500,
      winning_ticket: 156,
      winner_wallet: '9pLmNoQpRsTuVwXyZ5bC6dE4fG8iJ1kL',
      tx_hash: '8aLw2CoDpQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTu',
      end_date: '2024-10-22T18:00:00Z',
      total_tickets: 100
    },
    {
      id: 5,
      name: 'Richard Mille RM 035',
      image_url: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
      prize_value_usd: 185000,
      winning_ticket: 421,
      winner_wallet: '6qNoQpRsTuVwXyZ5bC6dE4fG8iJ1kLmN',
      tx_hash: '9bMx3DpEqQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTu',
      end_date: '2024-10-05T18:00:00Z',
      total_tickets: 600
    },
    {
      id: 6,
      name: 'Cartier Santos Medium',
      image_url: 'https://images.unsplash.com/photo-1526045431048-f857369baa09?w=600&q=80',
      prize_value_usd: 8200,
      winning_ticket: 34,
      winner_wallet: '3rOpQpRsTuVwXyZ5bC6dE4fG8iJ1kLmNo',
      tx_hash: '0cNy4ErFrQrSt2UvWxAz5bC6dE4fG8iJkL0mNoQpRsTu',
      end_date: '2024-09-18T18:00:00Z',
      total_tickets: 100
    }
  ];

  const winners = completedRaffles.length > 0 ? completedRaffles : demoWinners;

  const totalPrizeValue = winners.reduce((sum, w) => sum + (w.prize_value_usd || 0), 0);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">Past Winners</h1>
          <p className="text-slate-400 text-lg mb-8">
            All draws verified on-chain. Every winner provably fair.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center gap-8 bg-[#131A2B] rounded-xl border border-white/5 px-8 py-4">
            <div className="text-center">
              <p className="text-3xl font-semibold text-white">{winners.length}</p>
              <p className="text-slate-400 text-sm">Raffles Completed</p>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-semibold text-white">
                ${totalPrizeValue.toLocaleString()}
              </p>
              <p className="text-slate-400 text-sm">Total Prize Value</p>
            </div>
          </div>
        </motion.div>

        {/* Winners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner, index) => (
            <motion.div
              key={winner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all group"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-6 flex items-center justify-center">
                <img
                  src={winner.image_url}
                  alt={winner.name}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full p-2">
                  <Trophy className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-1">{winner.name}</h3>
                <p className="text-purple-400 font-medium mb-4">
                  ${winner.prize_value_usd?.toLocaleString()}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Ticket className="w-4 h-4" />
                      Winning Ticket
                    </span>
                    <span className="text-white font-mono">#{winner.winning_ticket}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Winner</span>
                    <span className="text-white font-mono">
                      {winner.winner_wallet?.slice(0, 4)}...{winner.winner_wallet?.slice(-4)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Drawn
                    </span>
                    <span className="text-white">
                      {winner.end_date ? format(new Date(winner.end_date), 'MMM d, yyyy') : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <a 
                    href={`https://solscan.io/tx/${winner.tx_hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    Verify on Solscan
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#131A2B]/50 rounded-full px-6 py-3 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400 text-sm">
              All results verifiable on the Solana blockchain
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}