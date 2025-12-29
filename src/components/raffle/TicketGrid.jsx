import React, { useState } from 'react';
import { Check, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Select Entries</h3>
        <p className="text-slate-400 text-sm">
          Pick how many entries you want. Each entry randomly assigns you one ticket ($1–$200).
        </p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-slate-500">
          {soldTickets.length} / {totalTickets} tickets sold
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-[#1a2235] border border-white/10" />
            <span className="text-slate-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-indigo-500 to-purple-500" />
            <span className="text-slate-400">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-700" />
            <span className="text-slate-400">Sold</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
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
                'relative aspect-square rounded-lg flex items-center justify-center text-sm font-mono transition-all',
                status === 'available' && 'bg-[#1a2235] border border-white/10 text-slate-400 hover:border-purple-500/50 hover:text-white cursor-pointer',
                status === 'selected' && 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white border-2 border-white/20 cursor-pointer',
                status === 'sold' && 'bg-slate-800/50 text-slate-600 cursor-not-allowed',
                status === 'owned' && 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 cursor-pointer'
              )}
            >
              {status === 'sold' ? (
                <Lock className="w-3.5 h-3.5" />
              ) : status === 'owned' ? (
                <User className="w-3.5 h-3.5" />
              ) : status === 'selected' ? (
                <Check className="w-4 h-4" />
              ) : (
                number
              )}
              
              {status === 'selected' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                >
                  <Check className="w-2.5 h-2.5 text-purple-600" />
                </motion.span>
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