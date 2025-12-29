import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Ticket, Trophy, DollarSign, Calendar, ExternalLink, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function MyTickets() {
  const [activeTab, setActiveTab] = useState('active');

  // Demo data - in production this would fetch user's tickets
  const demoTickets = [
    {
      id: 1,
      raffle_name: 'Rolex Daytona Cosmograph',
      raffle_id: 'demo-1',
      raffle_image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80',
      ticket_number: 47,
      ticket_price: 47,
      hold_amount: 200,
      refund_amount: 153,
      final_cost: 47,
      payment_method: 'SOL',
      purchased_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      raffle_status: 'active',
      raffle_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      prize_value: 24500
    },
    {
      id: 2,
      raffle_name: 'Rolex Daytona Cosmograph',
      raffle_id: 'demo-1',
      raffle_image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&q=80',
      ticket_number: 134,
      ticket_price: 134,
      hold_amount: 200,
      refund_amount: 66,
      final_cost: 134,
      payment_method: 'USDC',
      purchased_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      raffle_status: 'active',
      raffle_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      prize_value: 24500
    },
    {
      id: 3,
      raffle_name: 'Omega Speedmaster Professional',
      raffle_id: 'demo-2',
      raffle_image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
      ticket_number: 8,
      ticket_price: 8,
      hold_amount: 200,
      refund_amount: 192,
      final_cost: 8,
      payment_method: 'SOL',
      purchased_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      raffle_status: 'upcoming',
      raffle_end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      prize_value: 12500
    },
    {
      id: 4,
      raffle_name: 'Patek Philippe Nautilus',
      raffle_id: 'past-1',
      raffle_image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&q=80',
      ticket_number: 89,
      ticket_price: 89,
      hold_amount: 200,
      refund_amount: 111,
      final_cost: 89,
      payment_method: 'USDT',
      purchased_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'lost',
      raffle_status: 'completed',
      winning_ticket: 145,
      raffle_end_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      prize_value: 145000
    },
    {
      id: 5,
      raffle_name: 'Audemars Piguet Royal Oak',
      raffle_id: 'past-2',
      raffle_image: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=400&q=80',
      ticket_number: 167,
      ticket_price: 167,
      hold_amount: 200,
      refund_amount: 33,
      final_cost: 167,
      payment_method: 'SOL',
      purchased_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'lost',
      raffle_status: 'completed',
      winning_ticket: 12,
      raffle_end_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      prize_value: 58000
    }
  ];

  const activeTickets = demoTickets.filter(t => t.status === 'active');
  const pastTickets = demoTickets.filter(t => t.status !== 'active');

  const totalSpent = demoTickets.reduce((sum, t) => sum + t.final_cost, 0);
  const totalSaved = demoTickets.reduce((sum, t) => sum + t.refund_amount, 0);

  const TicketCard = ({ ticket }) => {
    const isActive = ticket.status === 'active';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#131A2B] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all"
      >
        <div className="grid md:grid-cols-3 gap-0">
          {/* Watch Image */}
          <div className="relative bg-gradient-to-br from-[#1a2235] to-[#131A2B] p-6 flex items-center justify-center">
            <img
              src={ticket.raffle_image}
              alt={ticket.raffle_name}
              className="max-h-32 object-contain"
            />
            <Badge 
              className={`absolute top-4 left-4 ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}
            >
              {isActive ? 'Active' : ticket.status === 'won' ? 'Won' : 'Lost'}
            </Badge>
          </div>

          {/* Details */}
          <div className="md:col-span-2 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{ticket.raffle_name}</h3>
                <p className="text-slate-400 text-sm">
                  {isActive 
                    ? `Ends ${format(new Date(ticket.raffle_end_date), 'MMM d, yyyy')}`
                    : `Ended ${format(new Date(ticket.raffle_end_date), 'MMM d, yyyy')}`
                  }
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-mono">#{ticket.ticket_number}</div>
                <p className="text-slate-500 text-xs">Ticket ID</p>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  Hold Amount
                </div>
                <p className="text-white font-semibold font-mono">${ticket.hold_amount}</p>
              </div>
              
              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Ticket className="w-3 h-3" />
                  Ticket Price
                </div>
                <p className="text-purple-400 font-semibold font-mono">${ticket.ticket_price}</p>
              </div>

              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                  <TrendingDown className="w-3 h-3" />
                  Refunded
                </div>
                <p className="text-emerald-400 font-semibold font-mono">+${ticket.refund_amount}</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  Final Cost
                </div>
                <p className="text-white font-bold text-lg font-mono">${ticket.final_cost}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-500">Paid with</span>
                <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">
                  {ticket.payment_method}
                </Badge>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{format(new Date(ticket.purchased_date), 'MMM d')}</span>
              </div>
              
              {!isActive && ticket.winning_ticket && (
                <span className="text-slate-500 text-sm">
                  Winning ticket: <span className="text-white font-mono">#{ticket.winning_ticket}</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-4">My Tickets</h1>
          <p className="text-slate-400 text-lg">Track your raffle entries and savings</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-[#131A2B] rounded-xl border border-white/5 p-6">
            <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
              <Ticket className="w-4 h-4" />
              Total Tickets
            </div>
            <p className="text-3xl font-bold text-white">{demoTickets.length}</p>
          </div>

          <div className="bg-[#131A2B] rounded-xl border border-white/5 p-6">
            <div className="flex items-center gap-3 text-slate-400 text-sm mb-2">
              <DollarSign className="w-4 h-4" />
              Total Spent
            </div>
            <p className="text-3xl font-bold text-white">${totalSpent}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl border border-emerald-500/20 p-6">
            <div className="flex items-center gap-3 text-emerald-400 text-sm mb-2">
              <TrendingDown className="w-4 h-4" />
              Total Saved
            </div>
            <p className="text-3xl font-bold text-emerald-400">${totalSaved}</p>
            <p className="text-xs text-emerald-400/60 mt-1">via auto-refunds</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-[#131A2B] border border-white/5">
            <TabsTrigger value="active" className="data-[state=active]:bg-white/5">
              Active ({activeTickets.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-white/5">
              Past ({pastTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6 mt-6">
            {activeTickets.length > 0 ? (
              activeTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <div className="text-center py-16 bg-[#131A2B] rounded-2xl border border-white/5">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No active tickets</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6 mt-6">
            {pastTickets.length > 0 ? (
              pastTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <div className="text-center py-16 bg-[#131A2B] rounded-2xl border border-white/5">
                <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No past tickets</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}