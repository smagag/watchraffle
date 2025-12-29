import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Ticket, ChevronRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Raffles() {
  const { data: raffles = [], isLoading } = useQuery({
    queryKey: ['raffles'],
    queryFn: () => base44.entities.Raffle.list('-created_date'),
  });

  const activeRaffles = raffles.filter(r => r.status === 'active');
  const upcomingRaffles = raffles.filter(r => r.status === 'upcoming');
  const completedRaffles = raffles.filter(r => r.status === 'completed');

  // Demo data if no raffles exist
  const demoRaffles = [
    {
      id: 'demo-1',
      name: 'Rolex Daytona',
      description: 'Cosmograph Daytona in Oystersteel',
      image_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png',
      total_tickets: 200,
      prize_value_usd: 24500,
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'demo-2',
      name: 'Omega Speedmaster',
      description: 'Moonwatch Professional',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      total_tickets: 150,
      prize_value_usd: 12500,
      end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'upcoming'
    }
  ];

  const displayRaffles = raffles.length > 0 ? raffles : demoRaffles;

  const RaffleCard = ({ raffle, index }) => {
    const isActive = raffle.status === 'active';
    const isCompleted = raffle.status === 'completed';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group"
      >
        <div className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Watch Image - Left Side */}
            <div className="relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-12 flex items-center justify-center min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
              <img
                src={raffle.image_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png'}
                alt={raffle.name}
                className="relative z-10 max-w-full max-h-80 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <Badge 
                className={`absolute top-6 left-6 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : isCompleted
                    ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}
              >
                {isActive ? 'Live' : isCompleted ? 'Completed' : 'Coming Soon'}
              </Badge>
            </div>

            {/* Details - Right Side */}
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-3xl font-semibold text-white mb-3">{raffle.name}</h3>
              <p className="text-slate-400 mb-6">{raffle.description}</p>

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
                {!isCompleted && (
                  <div className="flex items-center justify-between p-4 bg-[#0A0F1C] rounded-xl">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {isActive ? 'Ends' : 'Starts'}
                    </span>
                    <span className="text-white font-semibold text-lg">
                      {new Date(raffle.end_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              {isCompleted ? (
                <div className="p-4 bg-[#0A0F1C] rounded-xl text-center">
                  <p className="text-slate-400">Winner: {raffle.winner_wallet || 'N/A'}</p>
                </div>
              ) : isActive ? (
                <Link to={createPageUrl('RaffleDetail') + `?id=${raffle.id}`}>
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
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">All Raffles</h1>
          <p className="text-slate-400 text-lg">Browse active and upcoming luxury watch raffles</p>
        </motion.div>

        {/* Active Raffle - Single Large Card */}
        {(activeRaffles.length > 0 || !raffles.length) && (
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Live Now
            </h2>
            <div className="max-w-4xl mx-auto">
              {(() => {
                const activeRaffle = activeRaffles.length > 0 ? activeRaffles[0] : displayRaffles.find(r => r.status === 'active');
                return activeRaffle ? <RaffleCard raffle={activeRaffle} index={0} /> : null;
              })()}
            </div>
          </div>
        )}

        {/* Next Raffle - Single Large Card */}
        {(upcomingRaffles.length > 0 || (!raffles.length && displayRaffles.some(r => r.status === 'upcoming'))) && (
          <div className="mb-12">
            <h2 className="text-2xl font-medium text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Next
            </h2>
            <div className="max-w-4xl mx-auto">
              {(() => {
                const nextRaffle = upcomingRaffles.length > 0 ? upcomingRaffles[0] : displayRaffles.find(r => r.status === 'upcoming');
                return nextRaffle ? <RaffleCard raffle={nextRaffle} index={0} /> : null;
              })()}
            </div>
          </div>
        )}

        {/* Completed Raffles */}
        {completedRaffles.length > 0 && (
          <div>
            <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-500" />
              Completed
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedRaffles.map((raffle, i) => (
                <RaffleCard key={raffle.id} raffle={raffle} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}