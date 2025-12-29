import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowRight, Loader2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PaymentSection({ 
  selectedCount = 0, 
  onPurchase,
  isProcessing = false,
  paymentMethod: externalPaymentMethod,
  setPaymentMethod: setExternalPaymentMethod
}) {
  const [internalPaymentMethod, setInternalPaymentMethod] = useState('SOL');
  
  const paymentMethod = externalPaymentMethod || internalPaymentMethod;
  const setPaymentMethod = setExternalPaymentMethod || setInternalPaymentMethod;
  
  const HOLD_AMOUNT = 200;
  const totalHold = selectedCount * HOLD_AMOUNT;
  
  // Mock conversion rates for hold amount
  const conversions = {
    SOL: (totalHold / 180).toFixed(4),
    USDC: totalHold.toFixed(2),
    USDT: totalHold.toFixed(2)
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

      {/* How It Works Info */}
      <div className="mb-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
        <p className="text-purple-300 text-sm font-medium mb-2">How entry works:</p>
        <p className="text-slate-300 text-xs leading-relaxed">
          Place a ${HOLD_AMOUNT} hold per ticket. You'll be randomly assigned a ticket priced $1–$200. 
          The difference is automatically refunded to your wallet.
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Entries</span>
          <span className="text-white font-medium">{selectedCount}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Hold per entry</span>
          <span className="text-white">${HOLD_AMOUNT}</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Hold</span>
          <div className="text-right">
            <p className="text-white font-semibold text-xl">${totalHold.toLocaleString()}</p>
            <p className="text-slate-400 text-sm font-mono">
              ≈ {conversions[paymentMethod]} {paymentMethod}
            </p>
          </div>
        </div>
        <div className="bg-[#0A0F1C] rounded-lg p-3 text-xs text-slate-400">
          Final cost: $1–$200 per ticket (randomly assigned + auto-refunded)
        </div>
      </div>

      {/* Buy Crypto Link */}
      <a 
        href="https://www.moonpay.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-4"
      >
        Need {paymentMethod}? Buy crypto with card
        <ExternalLink className="w-3.5 h-3.5" />
      </a>

      {/* Purchase Button */}
      <Button
        onClick={() => onPurchase(paymentMethod)}
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
            Place ${totalHold} Hold
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </Button>

      <p className="text-center text-slate-500 text-xs mt-4">
        Excess funds automatically refunded after ticket assignment
      </p>
    </div>
  );
}