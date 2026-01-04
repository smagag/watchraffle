import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Ticket, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CountdownTimer from '@/components/raffle/CountdownTimer';

export default function ActiveRaffleCard({ raffle, ticketsSold = 87 }) {

  if (!raffle) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-8 text-center">
          <p className="text-slate-400">No active raffle at the moment</p>
        </div>
      </div>
    );
  }

  const progress = (ticketsSold / raffle.total_tickets) * 100;

  return (
    <section className="py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Watch Image */}
            <div className="relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-8 flex items-center justify-center min-h-[320px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
              <img
                src={raffle.image_url || 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png'}
                alt={raffle.name}
                className="relative z-10 max-w-full max-h-72 object-contain drop-shadow-2xl"
              />
              <Badge className="absolute top-6 left-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                Live
              </Badge>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">{raffle.name}</h2>
                <p className="text-slate-400 text-sm whitespace-pre-line">{raffle.description || 'Luxury timepiece raffle'}</p>
                <p className="text-slate-500 text-xs mt-1">Ref 126503</p>
              </div>

              {/* Countdown */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Ends in</span>
                </div>
                <CountdownTimer endDate={raffle.end_date} size="large" />
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Ticket className="w-4 h-4" />
                    Tickets sold
                  </span>
                  <span className="text-white font-medium">{ticketsSold} / {raffle.total_tickets}</span>
                </div>
                <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 p-4 bg-[#0A0F1C] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Entry Hold</span>
                  <span className="text-white font-semibold text-lg">${raffle.hold_amount || 200}</span>
                </div>
                <p className="text-slate-500 text-xs">
                  Final cost: $1–${raffle.hold_amount || 200} (unique prices, randomly assigned + refunded)
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <Link to={createPageUrl('RaffleDetail') + '?id=demo-1'} className="flex-1">
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-medium h-11 gap-2 group"
                  >
                    Buy Ticket
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-11"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}