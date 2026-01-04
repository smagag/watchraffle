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
  const [user, setUser] = useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  // Fetch user's actual tickets
  const { data: userTickets = [] } = useQuery({
    queryKey: ['user-tickets', user?.email],
    queryFn: () => base44.entities.Ticket.filter({ owner_wallet: user?.email }),
    enabled: !!user?.email,
  });

  // Fetch raffle details for each ticket
  const { data: raffles = [] } = useQuery({
    queryKey: ['raffles-for-tickets'],
    queryFn: () => base44.entities.Raffle.list(),
    enabled: userTickets.length > 0,
  });

  // Group tickets by purchase transaction (same raffle + purchased within 1 minute)
  const groupedTickets = React.useMemo(() => {
    if (userTickets.length === 0) return [];

    const sorted = [...userTickets].sort((a, b) => 
      new Date(b.created_date) - new Date(a.created_date)
    );

    const groups = [];
    let currentGroup = null;

    sorted.forEach(ticket => {
      const raffle = raffles.find(r => r.id === ticket.raffle_id);
      if (!raffle) return;

      const ticketTime = new Date(ticket.created_date).getTime();
      
      // Check if this ticket belongs to current group (same raffle, within 1 minute)
      if (
        currentGroup && 
        currentGroup.raffle_id === ticket.raffle_id &&
        Math.abs(ticketTime - currentGroup.purchase_time) < 60000
      ) {
        currentGroup.tickets.push(ticket);
        currentGroup.total_hold += ticket.hold_amount || 200;
        currentGroup.total_price += ticket.ticket_price;
        currentGroup.total_refund += (ticket.hold_amount || 200) - ticket.ticket_price;
      } else {
        // Start new group
        currentGroup = {
          id: `group-${ticket.id}`,
          raffle_id: ticket.raffle_id,
          raffle_name: raffle.name,
          raffle_image: raffle.image_url,
          raffle_status: raffle.status,
          raffle_end_date: raffle.end_date,
          prize_value: raffle.prize_value_usd,
          winning_ticket: raffle.winning_ticket,
          payment_method: ticket.payment_method,
          purchased_date: ticket.created_date,
          purchase_time: ticketTime,
          tickets: [ticket],
          total_hold: ticket.hold_amount || 200,
          total_price: ticket.ticket_price,
          total_refund: (ticket.hold_amount || 200) - ticket.ticket_price,
          status: raffle.status === 'active' ? 'active' : 'completed'
        };
        groups.push(currentGroup);
      }
    });

    return groups;
  }, [userTickets, raffles]);

  // Demo data - show if no real tickets
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

  // Use real data if available, otherwise demo
  const displayTickets = groupedTickets.length > 0 ? groupedTickets : demoTickets.map(t => ({
    ...t,
    tickets: [{ ticket_number: t.ticket_number, ticket_price: t.ticket_price }],
    total_hold: t.hold_amount,
    total_price: t.final_cost,
    total_refund: t.refund_amount
  }));

  const activeTickets = displayTickets.filter(t => t.status === 'active');
  const pastTickets = displayTickets.filter(t => t.status !== 'active');

  const totalSpent = displayTickets.reduce((sum, t) => sum + t.total_price, 0);
  const totalSaved = displayTickets.reduce((sum, t) => sum + t.total_refund, 0);

  const TicketCard = ({ ticketGroup }) => {
    const isActive = ticketGroup.status === 'active';
    const tickets = ticketGroup.tickets || [];
    const ticketNumbers = tickets.map(t => t.ticket_number).sort((a, b) => a - b);

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
              src={ticketGroup.raffle_image}
              alt={ticketGroup.raffle_name}
              className="max-h-32 object-contain"
            />
            <Badge 
              className={`absolute top-4 left-4 ${
                isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
              }`}
            >
              {isActive ? 'Active' : ticketGroup.status === 'won' ? 'Won' : 'Lost'}
            </Badge>
          </div>

          {/* Details */}
          <div className="md:col-span-2 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{ticketGroup.raffle_name}</h3>
                <p className="text-slate-400 text-sm">
                  {isActive 
                    ? `Ends ${format(new Date(ticketGroup.raffle_end_date), 'MMM d, yyyy')}`
                    : `Ended ${format(new Date(ticketGroup.raffle_end_date), 'MMM d, yyyy')}`
                  }
                </p>
              </div>
              <div className="text-right">
                {tickets.length === 1 ? (
                  <>
                    <div className="text-2xl font-bold text-white font-mono">#{ticketNumbers[0]}</div>
                    <p className="text-slate-500 text-xs">Ticket ID</p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-white font-mono">{tickets.length}x</div>
                    <p className="text-slate-500 text-xs">Tickets</p>
                  </>
                )}
              </div>
            </div>

            {/* Show ticket numbers if multiple */}
            {tickets.length > 1 && (
              <div className="mb-4 p-3 bg-[#0A0F1C] rounded-lg">
                <p className="text-slate-400 text-xs mb-2">Ticket Numbers:</p>
                <div className="flex flex-wrap gap-2">
                  {ticketNumbers.map(num => (
                    <Badge key={num} variant="outline" className="bg-white/5 border-white/10 text-white font-mono">
                      #{num}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  Total Hold
                </div>
                <p className="text-white font-semibold font-mono">${ticketGroup.total_hold}</p>
              </div>
              
              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                  <Ticket className="w-3 h-3" />
                  Total Price
                </div>
                <p className="text-purple-400 font-semibold font-mono">${ticketGroup.total_price}</p>
              </div>

              <div className="bg-[#0A0F1C] rounded-lg p-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs mb-1">
                  <TrendingDown className="w-3 h-3" />
                  Refunded
                </div>
                <p className="text-emerald-400 font-semibold font-mono">+${ticketGroup.total_refund}</p>
              </div>

              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                <div className="flex items-center gap-2 text-purple-300 text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  Final Cost
                </div>
                <p className="text-white font-bold text-lg font-mono">${ticketGroup.total_price}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-slate-500">Paid with</span>
                <Badge variant="outline" className="bg-white/5 border-white/10 text-slate-300">
                  {ticketGroup.payment_method || 'N/A'}
                </Badge>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{format(new Date(ticketGroup.purchased_date), 'MMM d')}</span>
              </div>
              
              {!isActive && ticketGroup.winning_ticket && (
                <span className="text-slate-500 text-sm">
                  Winning ticket: <span className="text-white font-mono">#{ticketGroup.winning_ticket}</span>
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
              Total Entries
            </div>
            <p className="text-3xl font-bold text-white">{displayTickets.reduce((sum, t) => sum + (t.tickets?.length || 1), 0)}</p>
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
              activeTickets.map((ticketGroup) => <TicketCard key={ticketGroup.id} ticketGroup={ticketGroup} />)
            ) : (
              <div className="text-center py-16 bg-[#131A2B] rounded-2xl border border-white/5">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No active tickets</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6 mt-6">
            {pastTickets.length > 0 ? (
              pastTickets.map((ticketGroup) => <TicketCard key={ticketGroup.id} ticketGroup={ticketGroup} />)
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