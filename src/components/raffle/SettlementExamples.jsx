import React from 'react';

export default function SettlementExamples() {
  const examples = [
    { hold: 200, ticket: 40, refund: 160, final: 40 },
    { hold: 200, ticket: 137, refund: 63, final: 137 },
    { hold: 200, ticket: 200, refund: 0, final: 200 }
  ];

  return (
    <div className="bg-[#131A2B] rounded-2xl border border-white/5 p-6">
      <h4 className="text-lg font-medium text-white mb-4">Settlement Examples</h4>
      <div className="space-y-3">
        {examples.map((ex, index) => (
          <div 
            key={index}
            className="flex items-center gap-4 p-3 bg-[#0A0F1C] rounded-lg text-sm"
          >
            <div className="flex-1 grid grid-cols-4 gap-4 font-mono">
              <div>
                <span className="text-slate-500 block text-xs mb-1">Hold</span>
                <span className="text-white">${ex.hold}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs mb-1">Ticket</span>
                <span className="text-purple-400">${ex.ticket}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs mb-1">Refund</span>
                <span className="text-emerald-400">${ex.refund}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-xs mb-1">Final Cost</span>
                <span className="text-white font-semibold">${ex.final}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}