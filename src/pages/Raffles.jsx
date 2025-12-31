import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Ticket, ChevronRight, Trophy, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import CountdownTimer from '@/components/raffle/CountdownTimer';

const DEMO_ACTIVE_RAFFLE = {
  id: 'demo-1',
  name: 'Rolex Daytona',
  description: 'Cosmograph Daytona in 18kt yellow gold with black dial. The ultimate chronograph for racing enthusiasts.',
  image_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png',
  total_tickets: 200,
  hold_amount: 200,
  prize_value_usd: 24500,
  end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'active',
};

const DEMO_UPCOMING_RAFFLE = {
  id: 'demo-2',
  name: 'Patek Philippe Nautilus',
  description: 'Nautilus in stainless steel with blue dial. The iconic luxury sports watch.',
  image_url: 'https://images.unsplash.com/photo-1587836374226-f84b86df7e0c?w=800',
  total_tickets: 200,
  hold_amount: 200,
  prize_value_usd: 85000,
  end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'upcoming',
};

export default function Raffles() {
  const { data: raffles = [] } = useQuery({
    queryKey: ['raffles'],
    queryFn: () => base44.entities.Raffle.list('-created_date'),
  });

  const activeRaffle = raffles.find(r => r.status === 'active') || DEMO_ACTIVE_RAFFLE;
  const upcomingRaffle = raffles.find(r => r.status === 'upcoming') || DEMO_UPCOMING_RAFFLE;
  const completedRaffles = raffles.filter(r => r.status === 'completed');

  const RaffleCard = ({ raffle, index, isActive = false }) => {
    const progress = 43.5; // Demo progress

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <div className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Watch Image */}
            <div className="relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-12 flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
              <img
                src={raffle.image_url}
                alt={raffle.name}
                className="relative z-10 max-w-full max-h-80 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <Badge 
                className={`absolute top-6 left-6 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}
              >
                {isActive ? 'Live' : 'Coming Soon'}
              </Badge>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-semibold text-white mb-3">{raffle.name}</h3>
              <p className="text-slate-400 mb-6">{raffle.description}</p>

              {/* Countdown */}
              {isActive && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                    <Clock className="w-4 h-4" />
                    <span>Ends in</span>
                  </div>
                  <CountdownTimer endDate={raffle.end_date} size="large" />
                </div>
              )}

              {/* Progress (for active only) */}
              {isActive && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Ticket className="w-4 h-4" />
                      Tickets sold
                    </span>
                    <span className="text-white font-medium">87 / {raffle.total_tickets}</span>
                  </div>
                  <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-[#0A0F1C] rounded-xl">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Prize Value
                  </span>
                  <span className="text-white font-semibold text-lg">
                    ${raffle.prize_value_usd?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0A0F1C] rounded-xl">
                  <span className="text-slate-400 flex items-center gap-2">
                    <Ticket className="w-5 h-5" />
                    Entry Hold
                  </span>
                  <span className="text-white font-semibold text-lg">$200</span>
                </div>
              </div>

              {isActive ? (
                <Link to={createPageUrl('RaffleDetail') + '?id=demo-1'}>
                  <Button 
                    className="w-full h-14 gap-2 text-base font-medium group/btn bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white"
                  >
                    Enter Raffle
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  disabled
                  className="w-full h-14 gap-2 text-base font-medium bg-[#1a2235] text-slate-500 cursor-not-allowed"
                >
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">Raffles</h1>
          <p className="text-slate-400 text-lg">Browse active and upcoming luxury watch raffles</p>
        </motion.div>

        {/* Current Live Raffle */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Live Now
          </h2>
          <RaffleCard raffle={activeRaffle} index={0} isActive={true} />
        </div>

        {/* Next Raffle */}
        <div className="mb-12">
          <h2 className="text-2xl font-medium text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            Next
          </h2>
          <RaffleCard raffle={upcomingRaffle} index={0} isActive={false} />
        </div>

        {/* Past Winners */}
        <div>
          <h2 className="text-2xl font-medium text-white mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-slate-500" />
            Past Winners
          </h2>
          {completedRaffles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedRaffles.map((raffle, i) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
                >
                  <div className="relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-8 flex items-center justify-center h-48">
                    <img
                      src={raffle.image_url}
                      alt={raffle.name}
                      className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{raffle.name}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Prize Value</span>
                        <span className="text-white font-medium">${raffle.prize_value_usd?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Winning Ticket</span>
                        <span className="text-white font-medium">#{raffle.winning_ticket || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Winner</span>
                        <span className="text-white font-mono text-xs">
                          {raffle.winner_wallet?.slice(0, 4)}...{raffle.winner_wallet?.slice(-4) || 'N/A'}
                        </span>
                      </div>
                    </div>
                    {raffle.tx_hash && (
                      <a
                        href={`https://solscan.io/tx/${raffle.tx_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 mt-4 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                      >
                        View Transaction
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-12 text-center">
              <p className="text-slate-400">No past winners yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}