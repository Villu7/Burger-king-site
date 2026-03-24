import React, { useState, useEffect } from 'react';
import { ShoppingBasket, ChevronRight, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { MenuItem } from '../types';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface StickyBasketProps {
  cart: MenuItem[];
}

export default function StickyBasket({ cart }: StickyBasketProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const itemCount = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const crownsToEarn = Math.floor(subtotal * 10);

  if (itemCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md flex flex-col gap-3"
      >
        {!user && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-bk-amber text-bk-brown px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter flex items-center justify-center gap-2 shadow-lg border-2 border-white/20"
          >
            <Crown size={14} fill="currentColor" />
            Log in to earn {crownsToEarn} Crown Points on this order
          </motion.div>
        )}
        <Link
          to="/menu"
          className="bg-bk-brown text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between hover:scale-[1.02] transition-transform active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <ShoppingBasket size={28} className="text-bk-amber" />
              <span className="absolute -top-2 -right-2 bg-bk-red text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-bk-brown">
                {itemCount}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Your Basket</p>
              <p className="font-black text-lg leading-none">${subtotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-bk-amber text-bk-brown px-4 py-2 rounded-xl font-black uppercase text-sm">
            Checkout
            <ChevronRight size={18} />
          </div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
