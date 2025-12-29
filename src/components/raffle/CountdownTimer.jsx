import React, { useState, useEffect, useMemo } from 'react';

export default function CountdownTimer({ endDate, size = 'default' }) {
  const calculateTimeLeft = () => {
    if (!endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const diff = new Date(endDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
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