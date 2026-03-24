import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, Minus, ShoppingBasket, Star, Flame } from 'lucide-react';
import { CATEGORIES, MOCK_MENU_ITEMS } from '../constants';
import { MenuItem } from '../types';
import { cn } from '../lib/utils';
import StickyBasket from '../components/StickyBasket';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [showUpsell, setShowUpsell] = useState<MenuItem | null>(null);

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesCategory = item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);

    // Smart Upsell Logic: If adding a burger, suggest a meal
    if (item.category === 'Burgers' && !showUpsell) {
      const sides = MOCK_MENU_ITEMS.filter(i => i.category === 'Sides');
      const randomSide = sides[Math.floor(Math.random() * sides.length)];
      setShowUpsell(randomSide);
    }
  };

  const removeFromCart = (itemId: string) => {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const getItemCount = (itemId: string) => {
    return cart.filter(item => item.id === itemId).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">Our Menu</h1>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-brown/40" size={20} />
          <input
            type="text"
            placeholder="Search for your favorites..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-bk-brown/10 rounded-full py-3 pl-12 pr-6 font-bold focus:border-bk-red outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-4 mb-12 pb-4 no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-8 py-3 rounded-full font-black uppercase text-sm whitespace-nowrap transition-all border-2",
              activeCategory === category
                ? "bg-bk-red border-bk-red text-white shadow-lg scale-105"
                : "bg-white border-bk-brown/10 text-bk-brown hover:border-bk-red/30"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-transparent hover:border-bk-red/20 transition-all flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {item.isFeatured && (
                  <div className="absolute top-3 left-3 bg-bk-amber text-bk-brown px-3 py-1 rounded-full font-black text-[10px] uppercase flex items-center gap-1 shadow-md">
                    <Star size={12} fill="currentColor" />
                    Popular
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-lg font-bold text-[10px]">
                  {item.calories} CAL
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-black italic uppercase tracking-tighter leading-tight">{item.name}</h3>
                  <span className="text-xl font-black text-bk-red">${item.price}</span>
                </div>
                <p className="text-bk-brown/60 text-sm font-medium mb-6 line-clamp-2 flex-1">
                  {item.description}
                </p>

                <div className="flex items-center gap-3">
                  {getItemCount(item.id) > 0 ? (
                    <div className="flex items-center justify-between bg-bk-cream rounded-2xl p-1 flex-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-bk-red hover:bg-bk-red hover:text-white transition-colors shadow-sm"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-black text-lg">{getItemCount(item.id)}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-bk-red hover:bg-bk-red hover:text-white transition-colors shadow-sm"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full bg-bk-red text-white py-3 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md active:scale-95"
                    >
                      <Plus size={20} />
                      Add to Order
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Smart Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-bk-brown/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-bk-amber" />
              <button
                onClick={() => setShowUpsell(null)}
                className="absolute top-4 right-4 p-2 hover:bg-bk-cream rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-6 text-bk-red">
                <Flame size={24} fill="currentColor" />
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Make it a Meal?</h3>
              </div>

              <div className="flex gap-6 mb-8">
                <img
                  src={showUpsell.image}
                  alt={showUpsell.name}
                  className="w-24 h-24 rounded-2xl object-cover shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tighter mb-1">{showUpsell.name}</h4>
                  <p className="text-bk-brown/60 text-sm font-medium mb-2">Add for only $3.49 more!</p>
                  <div className="flex items-center gap-1 text-bk-amber">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    addToCart(showUpsell);
                    setShowUpsell(null);
                  }}
                  className="w-full bg-bk-amber text-bk-brown py-4 rounded-2xl font-black uppercase hover:brightness-110 transition-all shadow-lg"
                >
                  Yes, Add to Meal
                </button>
                <button
                  onClick={() => setShowUpsell(null)}
                  className="w-full bg-bk-cream text-bk-brown py-4 rounded-2xl font-black uppercase hover:bg-bk-brown/5 transition-all"
                >
                  No Thanks
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <StickyBasket cart={cart} />
    </div>
  );
}

function X({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
