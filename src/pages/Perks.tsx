import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Crown, Gift, Zap, ArrowRight, User, CheckCircle2, Flame } from 'lucide-react';
import { auth, signInWithGoogle } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { cn } from '../lib/utils';

interface Tier {
  name: string;
  points: number;
  color: string;
  benefits: string[];
}

const TIERS: Tier[] = [
  {
    name: 'Bronze',
    points: 0,
    color: 'text-orange-600',
    benefits: ['Earn 10 Crowns per $1 spent', 'Birthday Reward', 'Mobile Ordering'],
  },
  {
    name: 'Silver',
    points: 500,
    color: 'text-slate-400',
    benefits: ['Earn 12 Crowns per $1 spent', 'Free Upsize on Fries', 'Exclusive Silver Deals'],
  },
  {
    name: 'Gold',
    points: 1500,
    color: 'text-bk-amber',
    benefits: ['Earn 15 Crowns per $1 spent', 'Free Delivery', 'Priority Support', 'VIP Events'],
  },
];

export default function Perks() {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1"
        >
          <div className="flex items-center gap-3 mb-6 text-bk-red">
            <Crown size={40} fill="currentColor" />
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
              Royal <br /> <span className="text-bk-amber">Perks</span>
            </h1>
          </div>
          <p className="text-2xl font-bold text-bk-brown/60 mb-10 max-w-lg">
            Join the family and start earning Crowns on every order. Redeem them for free food and exclusive member-only rewards.
          </p>
          {!user && (
            <button
              onClick={signInWithGoogle}
              className="bg-bk-red text-white px-10 py-5 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl"
            >
              Join the Kingdom
              <ArrowRight size={24} />
            </button>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1 relative"
        >
          <div className="bg-white rounded-[4rem] p-12 shadow-2xl border-4 border-bk-brown/5 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-bk-cream rounded-2xl flex items-center justify-center text-bk-red">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">
                    {user ? user.displayName : 'Your Profile'}
                  </h3>
                  <p className="text-bk-brown/50 font-bold">
                    {user ? 'Gold Member' : 'Sign in to see points'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-bk-red italic">1,240</p>
                <p className="text-xs font-black uppercase tracking-widest text-bk-brown/40">Crowns</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-4 bg-bk-cream rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-bk-amber"
                />
              </div>
              <p className="text-sm font-bold text-bk-brown/60 text-center">
                260 more Crowns to reach <span className="text-bk-amber">Platinum Tier</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="bg-bk-cream p-4 rounded-3xl text-center">
                <Gift size={24} className="mx-auto mb-2 text-bk-red" />
                <p className="text-[10px] font-black uppercase tracking-tighter">Rewards</p>
              </div>
              <div className="bg-bk-cream p-4 rounded-3xl text-center">
                <Zap size={24} className="mx-auto mb-2 text-bk-amber" />
                <p className="text-[10px] font-black uppercase tracking-tighter">Offers</p>
              </div>
              <div className="bg-bk-cream p-4 rounded-3xl text-center">
                <Star size={24} className="mx-auto mb-2 text-orange-600" />
                <p className="text-[10px] font-black uppercase tracking-tighter">History</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-full h-full bg-bk-amber rounded-[4rem] -z-10 rotate-3 opacity-20" />
        </motion.div>
      </div>

      {/* Tiers Section */}
      <div className="mb-24">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center mb-16">
          Member <span className="text-bk-red">Tiers</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-10 shadow-xl border-2 border-transparent hover:border-bk-amber/20 transition-all group"
            >
              <div className={cn("text-5xl font-black italic uppercase tracking-tighter mb-2", tier.color)}>
                {tier.name}
              </div>
              <p className="text-bk-brown/40 font-black text-xs uppercase tracking-widest mb-8">
                {tier.points}+ Crowns
              </p>
              <ul className="space-y-4 mb-10">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 font-bold text-bk-brown/70">
                    <CheckCircle2 size={20} className="text-bk-red shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="h-1 bg-bk-cream rounded-full group-hover:bg-bk-amber transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-bk-brown rounded-[4rem] p-16 text-white text-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent" />

        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-16 relative z-10">
          How it <span className="text-bk-amber">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/20">
              <span className="text-4xl font-black text-bk-amber">01</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Join the App</h3>
            <p className="text-white/60 font-bold">Sign up on the BK® App or web to start earning.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/20">
              <span className="text-4xl font-black text-bk-amber">02</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Order & Earn</h3>
            <p className="text-white/60 font-bold">Earn 10 Crowns for every $1 you spend on your favorites.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 border-2 border-white/20">
              <span className="text-4xl font-black text-bk-amber">03</span>
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Redeem Food</h3>
            <p className="text-white/60 font-bold">Use your Crowns to get free food, drinks, and more!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
