import React from 'react';
import { Wallet, Ticket, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Wallet,
      title: 'Connect Wallet',
      description: 'Link your Solana wallet to get started'
    },
    {
      icon: Ticket,
      title: 'Buy a Ticket',
      description: 'Choose your lucky numbers and pay with SOL or USDC'
    },
    {
      icon: Trophy,
      title: 'Winner Drawn On-Chain',
      description: 'Provably fair, verifiable on the blockchain'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">How It Works</h2>
            <p className="text-slate-400">Three simple steps to enter</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div 
                key={step.title}
                className="relative bg-[#131A2B]/50 rounded-xl border border-white/5 p-6 text-center group hover:border-white/10 transition-colors"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                  {index + 1}
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-medium mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link 
              to={createPageUrl('HowItWorks')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Learn more →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}