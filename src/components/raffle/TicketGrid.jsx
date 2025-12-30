import React, { useState } from 'react';
import { Check, Lock, User, Shuffle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function TicketGrid({ 
  totalTickets = 200, 
  soldTickets = [], 
  ownedTickets = [],
  onSelect,
  selectedTickets = []
}) {
  const HOLD_AMOUNT = 200;
  const getTicketStatus = (number) => {
    if (ownedTickets.includes(number)) return 'owned';
    if (soldTickets.includes(number)) return 'sold';
    if (selectedTickets.includes(number)) return 'selected';
    return 'available';
  };

  const handleTicketClick = (number) => {
    const status = getTicketStatus(number);
    if (status === 'sold') return;
    
    if (selectedTickets.includes(number)) {
      onSelect(selectedTickets.filter(t => t !== number));
    } else {
      onSelect([...selectedTickets, number]);
    }
  };

  const handleRandomSelect = (count) => {
    const available = Array.from({ length: totalTickets }, (_, i) => i + 1)
      .filter(n => !soldTickets.includes(n) && !ownedTickets.includes(n));
    
    const random = [];
    const copy = [...available];
    for (let i = 0; i < Math.min(count, copy.length); i++) {
      const idx = Math.floor(Math.random() * copy.length);
      random.push(copy.splice(idx, 1)[0]);
    }
    onSelect(random);
  };

  const handleClearSelection = () => {
    onSelect([]);
  };

  return (
    <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Select Entries</h3>
        <p className="text-slate-400 text-sm">
          Pick how many entries you want. Each entry randomly assigns you one ticket ($1–$200).
        </p>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRandomSelect(1)}
          className="bg-[#1a2235] border-white/10 text-slate-300 hover:bg-[#1e2842] hover:text-white gap-2"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Random 1
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRandomSelect(5)}
          className="bg-[#1a2235] border-white/10 text-slate-300 hover:bg-[#1e2842] hover:text-white gap-2"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Random 5
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRandomSelect(10)}
          className="bg-[#1a2235] border-white/10 text-slate-300 hover:bg-[#1e2842] hover:text-white gap-2"
        >
          <Shuffle className="w-3.5 h-3.5" />
          Random 10
        </Button>
        {selectedTickets.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSelection}
            className="text-slate-400 hover:text-white ml-auto"
          >
            Clear
          </Button>
        )}
      </div>
      
      <div className="flex items-center justify-between mb-4 text-xs">
        <div className="text-slate-500">
          {soldTickets.length} / {totalTickets} sold
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-[#1a2235] border border-white/10" />
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-gradient-to-r from-indigo-500 to-purple-500" />
            <span className="text-slate-400">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-slate-700" />
            <span className="text-slate-400">Sold</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-1.5 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
        {Array.from({ length: totalTickets }, (_, i) => i + 1).map((number) => {
          const status = getTicketStatus(number);
          
          return (
            <motion.button
              key={number}
              whileHover={status !== 'sold' ? { scale: 1.05 } : {}}
              whileTap={status !== 'sold' ? { scale: 0.95 } : {}}
              onClick={() => handleTicketClick(number)}
              disabled={status === 'sold'}
              className={cn(
                'relative aspect-square rounded-md flex items-center justify-center text-xs font-mono transition-all',
                status === 'available' && 'bg-[#1a2235] border border-white/10 text-slate-400 hover:border-purple-500/50 hover:text-white cursor-pointer',
                status === 'selected' && 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white border-2 border-white/20 cursor-pointer',
                status === 'sold' && 'bg-slate-800/50 text-slate-600 cursor-not-allowed',
                status === 'owned' && 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-pointer'
              )}
            >
              {status === 'sold' ? (
                <Lock className="w-3 h-3" />
              ) : status === 'owned' ? (
                <User className="w-3 h-3" />
              ) : status === 'selected' ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                number
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTickets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-6 border-t border-white/5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Selected entries</p>
                <p className="text-white font-mono text-sm mt-1">
                  {selectedTickets.length} {selectedTickets.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-400 text-sm">Hold Required</p>
                <p className="text-white font-semibold text-lg">
                  ${(selectedTickets.length * HOLD_AMOUNT).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}