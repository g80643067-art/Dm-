import React, { useState } from 'react';
import { X, Send, MessageSquare, ShieldCheck, Headphones } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hello! Welcome to DMFirst 24/7 Global Customer Support. How can I assist you with your account, recharges, or order tasks today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { sender: 'user', text: userMsg, time: timeNow }]);
    setInput('');

    setTimeout(() => {
      let reply = 'Thank you for your inquiry. Our finance and task department has received your request and will resolve it shortly.';
      if (userMsg.toLowerCase().includes('recharge') || userMsg.toLowerCase().includes('deposit')) {
        reply = 'USDT-TRC20 deposits are automatically credited within 1-3 network confirmations. If your deposit is delayed, please provide your TXID.';
      } else if (userMsg.toLowerCase().includes('withdraw') || userMsg.toLowerCase().includes('payout')) {
        reply = 'Withdrawals are processed 24/7 and usually arrive in your crypto wallet within 5 to 30 minutes.';
      } else if (userMsg.toLowerCase().includes('vip') || userMsg.toLowerCase().includes('upgrade')) {
        reply = 'You can upgrade your VIP level instantly in the Task Hall or Wallet section once your balance meets the tier requirement.';
      }

      setMessages((prev) => [...prev, { sender: 'agent', text: reply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[550px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 p-4 text-slate-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shadow-md">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">DMFirst Support Center</h3>
              <p className="text-[11px] font-medium opacity-90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-950 inline-block animate-pulse"></span>
                <span>Online · 24/7 Live Assistance</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs space-y-1 ${msg.sender === 'user' ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'}`}>
                <p>{msg.text}</p>
                <span className={`block text-[10px] text-right ${msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-400'}`}>{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick FAQ Pills */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto shrink-0">
          {['Recharge delay', 'Withdrawal time', 'VIP upgrade rules'].map((faq) => (
            <button
              key={faq}
              onClick={() => setInput(faq)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 text-[11px] rounded-lg whitespace-nowrap border border-slate-700 transition-colors"
            >
              {faq}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
