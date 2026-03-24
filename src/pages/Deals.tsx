import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, Smartphone, Lock, ArrowRight, Star, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  expiresIn: number; // seconds
  image: string;
  isAppExclusive: boolean;
}

const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: '$1 Any Size Coffee',
    description: 'Start your morning right with any size hot or iced coffee for just a buck.',
    discount: '$1.00',
    expiresIn: 3600 * 2 + 14 * 60, // 2h 14m
    image: 'https://picsum.photos/seed/coffee-deal/600/400',
    isAppExclusive: false,
  },
  {
    id: '2',
    title: 'Free Whopper® w/ $3+ Purchase',
    description: 'Download the app and get a free Whopper® when you spend $3 or more.',
    discount: 'FREE',
    expiresIn: 3600 * 5,
    image: 'https://picsum.photos/seed/whopper-deal/600/400',
    isAppExclusive: true,
  },
  {
    id: '3',
    title: 'BOGO Chicken Fries',
    description: 'Buy one 9pc Chicken Fries, get one free. Perfect for sharing (or not).',
    discount: 'BOGO',
    expiresIn: 3600 * 1,
    image: 'https://picsum.photos/seed/chicken-deal/600/400',
    isAppExclusive: false,
  },
];

function CountdownTimer({ initialSeconds }: { initialSeconds: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return (
    <div className="flex items-center gap-2 text-bk-red font-black text-sm uppercase tracking-widest">
      <Timer size={16} />
      Ends in {h}h {m}m {s}s
    </div>
  );
}

export default function Deals() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-bk-amber text-bk-brown px-4 py-1 rounded-full font-black text-xs uppercase tracking-[0.2em] mb-4"
        >
          Limited Time Offers
        </motion.div>
        <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
          Daily <span className="text-bk-red">Deals</span>
        </h1>
        <p className="text-xl font-bold text-bk-brown/60 max-w-2xl">
          Save big on your favorites with our daily rotating offers. Some deals are so good, they're app-exclusive!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {MOCK_DEALS.map((deal, index) => (
          <motion.div
            key={deal.id}
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-transparent hover:border-bk-red/10 transition-all flex flex-col md:flex-row"
          >
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {deal.isAppExclusive && (
                <div className="absolute top-6 left-6 bg-bk-brown text-white px-4 py-2 rounded-2xl font-black text-xs uppercase flex items-center gap-2 shadow-xl backdrop-blur-md bg-opacity-80">
                  <Lock size={14} className="text-bk-amber" />
                  App Exclusive
                </div>
              )}
              <div className="absolute bottom-6 left-6 bg-bk-red text-white px-6 py-3 rounded-2xl font-black text-2xl italic shadow-xl rotate-[-2deg]">
                {deal.discount}
              </div>
            </div>

            <div className="md:w-1/2 p-10 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <CountdownTimer initialSeconds={deal.expiresIn} />
                </div>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight mb-4">
                  {deal.title}
                </h3>
                <p className="text-bk-brown/70 font-bold mb-8">
                  {deal.description}
                </p>
              </div>

              {deal.isAppExclusive ? (
                <button className="w-full bg-bk-brown text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl">
                  <Smartphone size={24} className="text-bk-amber" />
                  Unlock in App
                </button>
              ) : (
                <button className="w-full bg-bk-red text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl">
                  Redeem Now
                  <ArrowRight size={24} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loyalty Teaser */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="mt-24 bg-bk-cream border-4 border-dashed border-bk-brown/20 rounded-[4rem] p-12 text-center"
      >
        <div className="flex justify-center gap-2 mb-6">
          <Flame size={32} className="text-bk-red" fill="currentColor" />
          <Flame size={32} className="text-bk-red" fill="currentColor" />
          <Flame size={32} className="text-bk-red" fill="currentColor" />
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
          Want More Rewards?
        </h2>
        <p className="text-xl font-bold text-bk-brown/60 mb-10 max-w-xl mx-auto">
          Join Royal Perks and earn Crown Points on every dollar spent. Redeem points for free food and exclusive member-only offers.
        </p>
        <button className="bg-bk-amber text-bk-brown px-12 py-5 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform shadow-xl">
          Join Royal Perks
        </button>
      </motion.div>
    </div>
  );
}
