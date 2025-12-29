import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/home/HeroSection';
import ActiveRaffleCard from '@/components/home/ActiveRaffleCard';
import StatsBar from '@/components/home/StatsBar';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import PastWinnersSection from '@/components/home/PastWinnersSection';
import MechanismExplainer from '@/components/raffle/MechanismExplainer';

export default function Home() {
  const { data: raffles = [] } = useQuery({
    queryKey: ['raffles'],
    queryFn: () => base44.entities.Raffle.list('-created_date'),
  });

  const activeRaffle = raffles.find(r => r.status === 'active') || {
    id: 'demo-1',
    name: 'Rolex Daytona Cosmograph',
    description: 'Cosmograph Daytona in 18kt yellow gold with black dial. The ultimate chronograph for racing enthusiasts.',
    image_url: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    total_tickets: 200,
    hold_amount: 200,
    prize_value_usd: 24500,
    end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    contract_address: '7xKXp8hQm9nPr3sT2wYzA5bC6dE4fG8iJ1kL0mNoQpRs'
  };
  const completedRaffles = raffles.filter(r => r.status === 'completed');

  return (
    <div className="pb-16">
      <HeroSection />
      <ActiveRaffleCard raffle={activeRaffle} />
      <StatsBar raffle={activeRaffle} />
      
      {/* Mechanism Explainer */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <MechanismExplainer />
        </div>
      </section>
      
      <HowItWorksSection />
      <PastWinnersSection winners={completedRaffles} />
    </div>
  );
}