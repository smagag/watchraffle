import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import HeroSection from '@/components/home/HeroSection';
import ActiveRaffleCard from '@/components/home/ActiveRaffleCard';
import StatsBar from '@/components/home/StatsBar';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import MechanismExplainer from '@/components/raffle/MechanismExplainer';

const DEMO_ACTIVE_RAFFLE = {
  id: 'demo-1',
  name: 'Rolex Daytona',
  description: 'Rolex Cosmograph Daytona\nOyster, 40 mm, Oystersteel and yellow gold.',
  image_url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/695254ac00a1403bc0449d13/4314007e2_m126503-0003.png',
  total_tickets: 200,
  hold_amount: 200,
  prize_value_usd: 24500,
  end_date: new Date('2026-01-18T23:59:59').toISOString(),
  status: 'active',
  contract_address: '7xKXp8hQm9nPr3sT2wYzA5bC6dE4fG8iJ1kL0mNoQpRs'
};

export default function Home() {
  const { data: raffles = [] } = useQuery({
    queryKey: ['raffles'],
    queryFn: () => base44.entities.Raffle.list('-created_date'),
  });

  const activeRaffle = raffles.find(r => r.status === 'active') || DEMO_ACTIVE_RAFFLE;

  return (
    <div className="pb-16">
      <HeroSection />
      <ActiveRaffleCard raffle={activeRaffle} />
      <StatsBar raffle={activeRaffle} />
      
      <HowItWorksSection />
      
      {/* Mechanism Explainer */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6">
          <MechanismExplainer />
        </div>
      </section>
    </div>
  );
}