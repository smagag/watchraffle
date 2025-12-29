import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PaymentSection({ 
  selectedCount = 0, 
  pricePerTicket = 125,
  onPurchase,
  isProcessing = false 
}) {
  const [paymentMethod, setPaymentMethod] = useState('SOL');
  
  const totalUSD = selectedCount * pricePerTicket;
  
  // Mock conversion rates
  const conversions = {
    SOL: (totalUSD / 180).toFixed(4),
    USDC: totalUSD.toFixed(2),
    USDT: totalUSD.toFixed(2)
  };

  const methods = [
    { id: 'SOL', label: 'SOL', icon: '◎' },
    { id: 'USDC', label: 'USDC', icon: '$' },
    { id: 'USDT', label: 'USDT', icon: '$' }
  ];

  return (
    <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-6">
      <h3 className="text-lg font-medium text-white mb-6">Payment</h3>

      {/* Payment Method Toggle */}
      <div className="mb-6">
        <p className="text-slate-400 text-sm mb-3">Pay with</p>
        <div className="flex gap-2">
          {methods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={cn(
                'flex-1 py-3 px-4 rounded-xl border text-sm font-medium transition-all',
                paymentMethod === method.id
                  ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border-purple-500/30 text-white'
                  : 'bg-[#1a2235] border-white/5 text-slate-400 hover:border-white/10'
              )}
            >
              <span className="mr-1">{method.icon}</span>
              {method.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Tickets selected</span>
          <span className="text-white font-medium">{selectedCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Price per ticket</span>
          <span className="text-white">${pricePerTicket}</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total</span>
          <div className="text-right">
            <p className="text-white font-semibold text-xl">${totalUSD.toLocaleString()}</p>
            <p className="text-slate-400 text-sm font-mono">
              ≈ {conversions[paymentMethod]} {paymentMethod}
            </p>
          </div>
        </div>
      </div>

      {/* Purchase Button */}
      <Button
        onClick={onPurchase}
        disabled={selectedCount === 0 || isProcessing}
        className="w-full h-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-medium gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Confirming...
          </>
        ) : selectedCount === 0 ? (
          'Select tickets to continue'
        ) : (
          <>
            <Wallet className="w-4 h-4" />
            Buy {selectedCount} Ticket{selectedCount > 1 ? 's' : ''}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-center text-slate-500 text-xs mt-4">
        Transaction will be confirmed in your wallet
      </p>
    </div>
  );
}