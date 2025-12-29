import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Wallet, Ticket, Trophy, Shield, ExternalLink, ArrowRight, CheckCircle, Shuffle, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import MechanismExplainer from '@/components/raffle/MechanismExplainer';
import SettlementExamples from '@/components/raffle/SettlementExamples';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Wallet,
      title: 'Connect Your Wallet',
      description: 'Link your Solana wallet (Phantom, Solflare, etc.) to get started. Your wallet is your identity and how you\'ll receive prizes.',
      details: [
        'Works with any Solana-compatible wallet',
        'No account registration required',
        'Your keys, your tickets'
      ]
    },
    {
      number: '02',
      icon: Ticket,
      title: 'Choose Your Tickets',
      description: 'Browse available raffles and select your lucky ticket numbers. Each ticket is a unique on-chain asset.',
      details: [
        'Pick any available numbers',
        'Pay with SOL, USDC, or USDT',
        'Instant on-chain confirmation'
      ]
    },
    {
      number: '03',
      icon: Trophy,
      title: 'Winner Drawn On-Chain',
      description: 'When the raffle ends, a verifiably random winner is selected using Solana\'s blockchain. Completely transparent and fair.',
      details: [
        'Chainlink VRF randomness',
        'Publicly verifiable results',
        'Prize sent directly to winner\'s wallet'
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Provably Fair',
      description: 'Every draw uses verifiable random functions. Anyone can audit the results on-chain.'
    },
    {
      icon: ExternalLink,
      title: 'Fully Transparent',
      description: 'All transactions, ticket sales, and draws are recorded on the Solana blockchain.'
    },
    {
      icon: Wallet,
      title: 'Self-Custody',
      description: 'Your tickets are yours. No intermediaries, no custody risk.'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">How It Works</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A simple, transparent way to enter luxury watch raffles on the blockchain
          </p>
        </motion.div>

        {/* Mechanism Explainer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <MechanismExplainer />
        </motion.div>

        {/* Steps */}
        <div className="space-y-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-8 md:flex items-start gap-8">
                <div className="flex-shrink-0 mb-6 md:mb-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-purple-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-purple-400 font-mono text-sm">{step.number}</span>
                    <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="text-slate-400 mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-[2.5rem] top-full w-px h-8 bg-gradient-to-b from-purple-500/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white text-center mb-8">Why On-Chain?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-[#131A2B]/50 rounded-xl border border-white/5 p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settlement Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <SettlementExamples />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl border border-white/5 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Ready to Enter?</h2>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Connect your wallet and join the next luxury watch raffle
            </p>
            <Link to={createPageUrl('Raffles')}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:opacity-90 text-white font-medium px-8 h-12 text-base gap-2 group"
              >
                View Active Raffles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
        </div>
        </div>
        );
        }