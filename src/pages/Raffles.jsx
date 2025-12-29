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
      image_url: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
      total_tickets: 200,
      ticket_price_usd: 125,
      prize_value_usd: 24500,
      end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    },
    {
      id: 'demo-2',
      name: 'Omega Speedmaster',
      description: 'Moonwatch Professional',
      image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
      total_tickets: 150,
      ticket_price_usd: 85,
      prize_value_usd: 12500,
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
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
          <div className="relative h-56 bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-6 flex items-center justify-center">
            <img
              src={raffle.image_url || 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80'}
              alt={raffle.name}
              className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />
            <Badge 
              className={`absolute top-4 left-4 ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                  : isCompleted
                  ? 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
              }`}
            >
              {isActive ? 'Live' : isCompleted ? 'Completed' : 'Upcoming'}
            </Badge>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-2">{raffle.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{raffle.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Prize Value
                </span>
                <span className="text-white font-medium">
                  ${raffle.prize_value_usd?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  Entry from
                </span>
                <span className="text-white font-medium">${raffle.ticket_price_usd}</span>
              </div>
              {!isCompleted && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {isActive ? 'Ends' : 'Starts'}
                  </span>
                  <span className="text-white font-medium">
                    {new Date(raffle.end_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {isCompleted ? (
              <div className="p-3 bg-[#0A0F1C] rounded-xl text-center">
                <p className="text-slate-400 text-sm">Winner: {raffle.winner_wallet || 'N/A'}</p>
              </div>
            ) : (
              <Link to={createPageUrl('RaffleDetail') + `?id=${raffle.id}`}>
                <Button 
                  className={`w-full h-11 gap-2 group/btn ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white'
                      : 'bg-[#1a2235] text-slate-300 hover:bg-[#232c42]'
                  }`}
                >
                  {isActive ? 'Enter Raffle' : 'View Details'}
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            )}
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

        {/* Active Raffles */}
        {(activeRaffles.length > 0 || !raffles.length) && (
          <div className="mb-12">
            <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              Live Now
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeRaffles.length > 0 ? activeRaffles : displayRaffles.filter(r => r.status === 'active')).map((raffle, i) => (
                <RaffleCard key={raffle.id} raffle={raffle} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Raffles */}
        {(upcomingRaffles.length > 0 || (!raffles.length && displayRaffles.some(r => r.status === 'upcoming'))) && (
          <div className="mb-12">
            <h2 className="text-xl font-medium text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Coming Soon
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(upcomingRaffles.length > 0 ? upcomingRaffles : displayRaffles.filter(r => r.status === 'upcoming')).map((raffle, i) => (
                <RaffleCard key={raffle.id} raffle={raffle} index={i} />
              ))}
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