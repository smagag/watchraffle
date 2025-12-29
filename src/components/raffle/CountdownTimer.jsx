import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ endDate, size = 'default' }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!endDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const diff = end - now;
      
      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const textSize = size === 'large' ? 'text-2xl' : 'text-lg';
  const labelSize = size === 'large' ? 'text-xs' : 'text-xs';
  const padding = size === 'large' ? 'p-3' : 'p-2';

  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hrs' },
        { value: timeLeft.minutes, label: 'Min' },
        { value: timeLeft.seconds, label: 'Sec' }
      ].map((item) => (
        <div key={item.label} className={`bg-[#0A0F1C] rounded-lg ${padding} text-center`}>
          <div className={`${textSize} font-semibold text-white font-mono`}>
            {String(item.value).padStart(2, '0')}
          </div>
          <div className={`${labelSize} text-slate-500`}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}