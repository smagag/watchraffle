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

  const activeRaffle = raffles.find(r => r.status === 'active');
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