import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, ExternalLink, Shield, Trophy, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import TicketGrid from '@/components/raffle/TicketGrid';
import PaymentSection from '@/components/raffle/PaymentSection';
import PurchaseModal from '@/components/raffle/PurchaseModal';
import ImageGallery from '@/components/raffle/ImageGallery';

export default function RaffleDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const raffleId = urlParams.get('id');
  
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copied, setCopied] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('SOL');

  // Demo raffle if none exists (2 weeks from now)
  const demoRaffle = {
    id: 'demo-1',
    name: 'Rolex Daytona',
    description: 'Cosmograph Daytona in Oystersteel with black dial. This legendary chronograph combines precision engineering with timeless design.',
    image_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png',
    images: [
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/14d9cd0a9_m126503-0003-1.jpeg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/aeefc19e3_m126503-0003-2.jpg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/1703b3fb1_m126503-0003-3.jpg',
      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/24d33034e_m126503-0003-4.jpg'
    ],
    total_tickets: 200,
    prize_value_usd: 24500,
    end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    contract_address: '7xKXp8hQm9nPr3sT2wYzA5bC6dE4fG8iJ1kL0mNoQpRs'
  };

  const { data: raffle } = useQuery({
    queryKey: ['raffle', raffleId],
    queryFn: async () => {
      if (!raffleId || raffleId.startsWith('demo')) return demoRaffle;
      const raffles = await base44.entities.Raffle.filter({ id: raffleId });
      return raffles[0] || demoRaffle;
    },
    enabled: true,
  });

  const { data: tickets = [] } = useQuery({
    queryKey: ['tickets', raffleId],
    queryFn: async () => {
      if (!raffleId || raffleId.startsWith('demo')) return [];
      return base44.entities.Ticket.filter({ raffle_id: raffleId });
    },
    enabled: !!raffleId && !raffleId.startsWith('demo'),
  });

  const soldTickets = tickets.filter(t => t.status === 'sold').map(t => t.ticket_number);
  
  // Simulate some sold tickets for demo
  const demoSoldTickets = [3, 7, 12, 15, 23, 34, 45, 56, 67, 78, 89, 91, 102, 113, 124, 135, 146, 157, 168, 179, 180, 190, 195, 198];

  useEffect(() => {
    if (!raffle?.end_date) return;

    const calculateTime = () => {
      const diff = new Date(raffle.end_date) - new Date();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    };

    setTimeLeft(calculateTime());
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, [raffle?.end_date]);

  const handleCopy = () => {
    navigator.clipboard.writeText(raffle?.contract_address || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePurchase = async (method) => {
    setPaymentMethod(method);
    setShowPurchaseModal(true);
  };

  const handleModalClose = () => {
    setShowPurchaseModal(false);
    setSelectedTickets([]);
  };

  if (!raffle) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-slate-400">Loading raffle...</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link to={createPageUrl('Raffles')}>
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-6 -ml-2 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Raffles
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Watch Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24"
            >
              <div className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden mb-6">
                <div className="p-6">
                  <ImageGallery images={raffle.images || [raffle.image_url]} />
                </div>

                <div className="p-6 pt-0">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
                    Live
                  </Badge>
                  <h1 className="text-2xl font-semibold text-white mb-2">{raffle.name}</h1>
                  <p className="text-slate-400 text-sm mb-6">{raffle.description}</p>

                  {/* Countdown */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                      <Clock className="w-4 h-4" />
                      <span>Raffle ends in</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: timeLeft.days, label: 'Days' },
                        { value: timeLeft.hours, label: 'Hrs' },
                        { value: timeLeft.minutes, label: 'Min' },
                        { value: timeLeft.seconds, label: 'Sec' }
                      ].map((item) => (
                        <div key={item.label} className="bg-[#0A0F1C] rounded-lg p-2 text-center">
                          <div className="text-lg font-semibold text-white font-mono">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-xs text-slate-500">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-[#0A0F1C] rounded-xl">
                      <span className="text-slate-400 text-sm flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        Prize Value
                      </span>
                      <span className="text-white font-semibold">
                        ${raffle.prize_value_usd?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#0A0F1C] rounded-xl">
                      <span className="text-slate-400 text-sm flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Contract
                      </span>
                      <button 
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-white font-mono text-sm hover:text-purple-400 transition-colors"
                      >
                        {raffle.contract_address?.slice(0, 6)}...{raffle.contract_address?.slice(-4)}
                        {copied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <a 
                    href="#"
                    className="flex items-center justify-center gap-2 mt-4 text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    View on Solscan
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {/* Terms */}
                  <div className="mt-4 p-3 bg-[#0A0F1C]/50 rounded-lg border border-white/5">
                    <p className="text-slate-500 text-xs leading-relaxed">
                      * Raffle ends in 2 weeks or when sold out. If less than 75% of tickets are sold within 2 weeks, all entry amounts are fully refunded.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Ticket Selection */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TicketGrid
                totalTickets={raffle.total_tickets}
                soldTickets={soldTickets.length > 0 ? soldTickets : demoSoldTickets}
                ownedTickets={[]}
                selectedTickets={selectedTickets}
                onSelect={setSelectedTickets}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PaymentSection
                selectedCount={selectedTickets.length}
                onPurchase={handlePurchase}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </motion.div>
          </div>
        </div>

        {/* Purchase Modal */}
        <PurchaseModal
          isOpen={showPurchaseModal}
          onClose={handleModalClose}
          entryCount={selectedTickets.length}
          paymentMethod={paymentMethod}
        />
      </div>
    </div>
  );
}