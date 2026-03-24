import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Smartphone, Star } from 'lucide-react';
import { MOCK_MENU_ITEMS } from '../constants';

export default function Home() {
  const featuredItems = MOCK_MENU_ITEMS.filter(item => item.isFeatured);

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-bk-red">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85] mb-6">
              Flame <br /> Grilled <br /> <span className="text-bk-amber">Goodness</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold mb-10 text-white/90 max-w-lg">
              Get your favorites delivered or pick them up at a restaurant near you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="bg-bk-amber text-bk-brown px-8 py-5 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform flex items-center gap-3 shadow-xl"
              >
                Order Now
                <ArrowRight size={24} />
              </Link>
              <Link
                to="/locator"
                className="bg-white text-bk-red px-8 py-5 rounded-full font-black text-xl uppercase hover:scale-105 transition-transform flex items-center gap-3 shadow-xl"
              >
                Find a Restaurant
                <MapPin size={24} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "backOut" }}
            className="relative hidden lg:block"
          >
            <img
              src="https://picsum.photos/seed/whopper-hero/800/800"
              alt="Whopper"
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-10 -right-10 bg-bk-amber text-bk-brown p-8 rounded-full font-black text-2xl rotate-12 shadow-2xl border-4 border-white">
              ONLY <br /> $6.49
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Featured Items</h2>
          <Link to="/menu" className="text-bk-red font-bold flex items-center gap-1 hover:underline">
            View Full Menu <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-bk-amber text-bk-brown px-3 py-1 rounded-full font-black text-sm shadow-md">
                  {item.calories} CAL
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">{item.name}</h3>
                  <span className="text-2xl font-black text-bk-red">${item.price}</span>
                </div>
                <p className="text-bk-brown/70 font-medium mb-6 line-clamp-2">{item.description}</p>
                <Link
                  to="/menu"
                  className="w-full bg-bk-red text-white py-4 rounded-2xl font-black uppercase text-center block hover:brightness-110 transition-all"
                >
                  Add to Order
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Download Push */}
      <section className="container mx-auto px-4">
        <div className="bg-bk-brown rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-bk-amber rounded-full blur-[100px] opacity-20 -mr-32 -mt-32" />

          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4 text-bk-amber">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <span className="text-white font-bold ml-2">4.8/5 Rating</span>
            </div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-6">
              Get Exclusive <br /> <span className="text-bk-amber">App-Only Deals</span>
            </h2>
            <p className="text-xl font-bold text-white/80 mb-10 max-w-md">
              Download the BK® App and start earning Crown Points on every order. Plus, get a free Whopper® on your first app order!
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-bk-brown px-6 py-3 rounded-xl font-black flex items-center gap-3 hover:scale-105 transition-transform">
                <Smartphone size={24} />
                App Store
              </button>
              <button className="bg-white text-bk-brown px-6 py-3 rounded-xl font-black flex items-center gap-3 hover:scale-105 transition-transform">
                <Smartphone size={24} />
                Google Play
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <motion.img
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              src="https://picsum.photos/seed/bk-app/400/600"
              alt="BK App"
              className="w-full max-w-xs mx-auto rounded-[2rem] shadow-2xl border-8 border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
