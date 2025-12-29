import React from 'react';
import { Wallet, Shuffle, DollarSign, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MechanismExplainer() {
  const steps = [
    {
      icon: Wallet,
      title: 'Place $200 Hold',
      description: 'Pay with SOL, USDC, or USDT (shown in USD equivalent)'
    },
    {
      icon: Shuffle,
      title: 'Random Assignment',
      description: 'System randomly assigns you an available ticket ($1–$200)'
    },
    {
      icon: DollarSign,
      title: 'Auto Refund',
      description: 'Difference is instantly refunded to your wallet'
    },
    {
      icon: Trophy,
      title: 'Equal Odds',
      description: 'Every ticket has the same chance to win'
    }
  ];

  const examples = [
    { hold: 200, ticket: 40, refund: 160, final: 40 },
    { hold: 200, ticket: 137, refund: 63, final: 137 },
    { hold: 200, ticket: 200, refund: 0, final: 200 }
  ];

  return (
    <div className="space-y-6">
      {/* Main Explainer */}
      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/20 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">How Entry Works</h3>
        
        {/* Unique Pricing Notice */}
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <p className="text-blue-300 text-sm font-medium mb-2">🎯 Unique Pricing Model:</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            There are exactly 200 tickets, each with a unique price from $1 to $200. Only ONE ticket 
            exists at each price point—one $1 ticket, one $150 ticket, one $200 ticket, etc. Every ticket 
            has equal odds regardless of price.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-white font-medium text-sm mb-1">{step.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#0A0F1C]/50 rounded-xl p-4 border border-white/5">
          <p className="text-purple-300 font-medium text-sm mb-2">Quick Summary:</p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Place a $200 hold per entry. You'll be randomly assigned a unique ticket priced between 
            $1–$200 (no duplicate prices exist). The difference is automatically refunded. Every ticket 
            has equal odds to win.
          </p>
        </div>
      </div>

      {/* Examples */}
      <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-6">
        <h4 className="text-lg font-medium text-white mb-4">Settlement Examples</h4>
        <div className="space-y-3">
          {examples.map((ex, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-3 bg-[#0A0F1C] rounded-lg text-sm"
            >
              <div className="flex-1 grid grid-cols-4 gap-4 font-mono">
                <div>
                  <span className="text-slate-500 block text-xs mb-1">Hold</span>
                  <span className="text-white">${ex.hold}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs mb-1">Ticket</span>
                  <span className="text-purple-400">${ex.ticket}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs mb-1">Refund</span>
                  <span className="text-emerald-400">${ex.refund}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs mb-1">Final Cost</span>
                  <span className="text-white font-semibold">${ex.final}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why This Works */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: 'Unique Prices', desc: 'Each price ($1-$200) exists only once' },
          { title: 'Equal Odds', desc: 'Ticket price doesn\'t affect probability' },
          { title: 'Transparent', desc: 'All assignments verifiable on-chain' }
        ].map((item) => (
          <div 
            key={item.title}
            className="bg-[#131A2B]/50 rounded-xl border border-white/5 p-4 text-center"
          >
            <p className="text-white font-medium mb-1">{item.title}</p>
            <p className="text-slate-400 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}