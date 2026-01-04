import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Shuffle, DollarSign, CheckCircle, ArrowRight, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';

export default function PurchaseModal({ isOpen, onClose, entryCount, paymentMethod }) {
  const [step, setStep] = useState('hold'); // hold -> assigning -> refunding -> complete
  const [assignments, setAssignments] = useState([]);
  const HOLD_AMOUNT = 200;

  // Simulate random ticket assignment
  const generateRandomTickets = (count) => {
    const tickets = [];
    const usedNumbers = new Set();
    
    for (let i = 0; i < count; i++) {
      let ticketNumber;
      do {
        ticketNumber = Math.floor(Math.random() * 200) + 1;
      } while (usedNumbers.has(ticketNumber));
      
      usedNumbers.add(ticketNumber);
      const ticketPrice = ticketNumber; // In this demo, ticket number = price
      const refund = HOLD_AMOUNT - ticketPrice;
      
      tickets.push({
        ticketNumber,
        ticketPrice,
        refund,
        finalCost: ticketPrice
      });
    }
    
    return tickets;
  };

  useEffect(() => {
    if (!isOpen) {
      setStep('hold');
      setAssignments([]);
      return;
    }

    const sequence = async () => {
      // Step 1: Hold placed
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 2: Assigning tickets
      setStep('assigning');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const tickets = generateRandomTickets(entryCount);
      setAssignments(tickets);
      
      // Step 3: Refunding
      setStep('refunding');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 4: Complete + Award XP
      const awardXP = async () => {
        try {
          const user = await base44.auth.me();
          const xpToAward = entryCount * 75;
          await base44.auth.updateMe({
            xp_points: (user.xp_points || 0) + xpToAward
          });
        } catch (error) {
          console.error('Failed to award XP:', error);
        }
      };
      
      await awardXP();
      setStep('complete');
    };

    sequence();
  }, [isOpen, entryCount]);

  const totalHold = entryCount * HOLD_AMOUNT;
  const totalFinalCost = assignments.reduce((sum, a) => sum + a.finalCost, 0);
  const totalRefund = totalHold - totalFinalCost;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={step === 'complete' ? onClose : undefined}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-[#131A2B] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Close button - only show when complete */}
          {step === 'complete' && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}

          <div className="p-8">
            {/* Step: Hold Placed */}
            {step === 'hold' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-purple-400 animate-pulse" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Processing Hold</h3>
                <p className="text-slate-400 mb-6">
                  Placing ${totalHold} hold via {paymentMethod}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  <span className="text-sm text-slate-500">Confirming transaction...</span>
                </div>
              </motion.div>
            )}

            {/* Step: Assigning Tickets */}
            {step === 'assigning' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Shuffle className="w-8 h-8 text-blue-400 animate-spin" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Assigning Tickets</h3>
                <p className="text-slate-400 mb-6">
                  Randomly selecting {entryCount} ticket{entryCount > 1 ? 's' : ''} from available pool...
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  <span className="text-sm text-slate-500">This is provably random on-chain</span>
                </div>
              </motion.div>
            )}

            {/* Step: Refunding */}
            {step === 'refunding' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-emerald-400 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Processing Refund</h3>
                  <p className="text-slate-400">
                    Returning excess funds to your wallet...
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {assignments.map((ticket, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-[#0A0F1C] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <span className="text-purple-400 font-mono text-sm">#{ticket.ticketNumber}</span>
                        </div>
                        <div className="text-left">
                          <p className="text-white font-medium text-sm">Ticket #{ticket.ticketNumber}</p>
                          <p className="text-slate-500 text-xs">Price: ${ticket.ticketPrice}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-emerald-400 font-semibold text-sm">+${ticket.refund}</p>
                        <p className="text-slate-500 text-xs">refunded</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span className="text-sm text-slate-500">Refund in progress...</span>
                </div>
              </motion.div>
            )}

            {/* Step: Complete */}
            {step === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Purchase Complete!</h3>
                  <p className="text-slate-400 mb-3">
                    Your tickets have been assigned and excess funds refunded
                  </p>
                  <div className="flex items-center justify-center gap-2 text-yellow-400">
                    <Zap className="w-5 h-5 fill-yellow-400" />
                    <span className="font-semibold">+{entryCount * 75} XP Earned!</span>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#0A0F1C] rounded-xl p-5 mb-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Initial Hold</span>
                      <span className="text-white font-mono">${totalHold}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Tickets Purchased</span>
                      <span className="text-white font-mono">{entryCount}</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between text-sm">
                      <span className="text-emerald-400 font-medium">Total Refunded</span>
                      <span className="text-emerald-400 font-semibold font-mono">+${totalRefund}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Final Cost</span>
                      <span className="text-white font-bold text-lg font-mono">${totalFinalCost}</span>
                    </div>
                  </div>
                </div>

                {/* Assigned Tickets */}
                <div className="mb-6">
                  <p className="text-slate-400 text-sm mb-3">Your tickets:</p>
                  <div className="flex flex-wrap gap-2">
                    {assignments.map((ticket, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-3 py-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg"
                      >
                        <p className="text-white font-mono text-sm">#{ticket.ticketNumber}</p>
                        <p className="text-purple-400 text-xs">${ticket.ticketPrice}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 bg-transparent border-white/10 text-slate-300 hover:bg-white/5 hover:text-white h-11"
                  >
                    Close
                  </Button>
                  <a href="/MyTickets" className="flex-1">
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-medium h-11 gap-2"
                    >
                      View My Tickets
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}