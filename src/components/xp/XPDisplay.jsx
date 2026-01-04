import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function XPDisplay({ xp = 0, compact = false }) {
  const progress = (xp % 1000) / 1000 * 100;
  const currentLevelXP = xp % 1000;
  const freeTickets = Math.floor(xp / 1000);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-yellow-400">
          <Zap className="w-4 h-4 fill-yellow-400" />
          <span className="font-medium text-sm">{xp.toLocaleString()}</span>
        </div>
        {freeTickets > 0 && (
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
            {freeTickets} Free Ticket{freeTickets > 1 ? 's' : ''}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#131A2B] rounded-xl border border-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-semibold">XP Points</span>
        </div>
        <span className="text-slate-400 text-sm">{xp.toLocaleString()} XP</span>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Progress to free ticket</span>
          <span className="text-white font-medium">{currentLevelXP} / 1000 XP</span>
        </div>
        <div className="h-2 bg-[#0A0F1C] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
          />
        </div>
      </div>

      {freeTickets > 0 && (
        <div className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <Gift className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 text-sm font-medium">
            {freeTickets} Free Ticket{freeTickets > 1 ? 's' : ''} Available!
          </span>
        </div>
      )}

      <p className="text-slate-500 text-xs mt-3">
        Earn 75 XP per ticket purchased. Redeem 1000 XP for a free entry!
      </p>
    </div>
  );
}