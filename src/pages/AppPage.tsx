import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Star, Gift, Zap, Clock, MapPin, ArrowRight, CheckCircle2, Flame, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AppPage() {
  const features = [
    {
      icon: <Gift className="text-bk-red" />,
      title: "Exclusive Offers",
      description: "Get access to app-only deals and coupons you won't find anywhere else."
    },
    {
      icon: <Crown className="text-bk-amber" />,
      title: "Royal Perks",
      description: "Earn Crowns on every dollar spent and redeem them for free food."
    },
    {
      icon: <Zap className="text-bk-red" />,
      title: "Mobile Ordering",
      description: "Skip the line by ordering ahead for pickup or delivery."
    },
    {
      icon: <Clock className="text-bk-amber" />,
      title: "Recent Orders",
      description: "Easily reorder your favorites with just a few taps."
    }
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero */}
      <section className="bg-bk-brown text-white py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-bk-amber/20 via-transparent to-transparent" />

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-2 mb-6 text-bk-amber">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <span className="text-white font-bold ml-2">4.8/5 Rating</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">
              The BK® <br /> <span className="text-bk-amber">App</span>
            </h1>
            <p className="text-2xl font-bold text-white/70 mb-12 max-w-lg">
              Your kingdom in your pocket. Order ahead, earn rewards, and get exclusive deals.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-bk-brown px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                <Smartphone size={28} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest leading-none">Download on the</p>
                  <p className="text-xl leading-none">App Store</p>
                </div>
              </button>
              <button className="bg-white text-bk-brown px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl">
                <Smartphone size={28} />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest leading-none">Get it on</p>
                  <p className="text-xl leading-none">Google Play</p>
                </div>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative"
          >
            <img
              src="https://picsum.photos/seed/bk-app-hero/600/900"
              alt="BK App Interface"
              className="w-full max-w-md mx-auto rounded-[3rem] shadow-2xl border-8 border-white/10 rotate-3"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-bk-red text-white p-8 rounded-full font-black text-2xl rotate-[-12deg] shadow-2xl border-4 border-white">
              FREE <br /> WHOPPER®
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center mb-16">
          App <span className="text-bk-red">Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[3rem] shadow-xl text-center flex flex-col items-center group hover:scale-105 transition-transform"
            >
              <div className="w-20 h-20 bg-bk-cream rounded-3xl flex items-center justify-center mb-6 group-hover:bg-bk-red group-hover:text-white transition-colors">
                {React.cloneElement(f.icon as React.ReactElement<{ size: number }>, { size: 40 })}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{f.title}</h3>
              <p className="text-bk-brown/60 font-bold">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QR Section */}
      <section className="container mx-auto px-4">
        <div className="bg-bk-amber rounded-[4rem] p-16 flex flex-col lg:flex-row items-center gap-16 text-bk-brown overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full bg-bk-red/5" />

          <div className="flex-1 relative z-10">
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-8">
              Scan to <br /> <span className="text-bk-red">Download</span>
            </h2>
            <p className="text-2xl font-bold mb-10 max-w-md">
              Point your camera at the QR code to download the BK® App and start earning Crowns today!
            </p>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="text-bk-red" size={24} />
              <span className="font-black uppercase tracking-widest text-sm">Instant Access</span>
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <div className="bg-white p-8 rounded-[3rem] shadow-2xl w-64 h-64 mx-auto flex items-center justify-center border-4 border-bk-brown/5">
              <div className="w-full h-full bg-bk-brown/10 rounded-2xl flex items-center justify-center relative">
                <div className="grid grid-cols-4 gap-2 w-3/4 h-3/4">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className={cn("bg-bk-brown rounded-sm", Math.random() > 0.5 ? "opacity-100" : "opacity-20")} />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <span className="text-bk-red font-black text-xs italic">BK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
