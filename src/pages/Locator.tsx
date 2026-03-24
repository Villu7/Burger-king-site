import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Clock, Phone, Star, CheckCircle2, Search, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  distance: string;
  hours: string;
  phone: string;
  features: string[];
  isOpen: boolean;
}

const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger King #1245',
    address: '123 Main St, New York, NY 10001',
    distance: '0.8 miles',
    hours: 'Open until 11:00 PM',
    phone: '(212) 555-0123',
    features: ['Drive-Thru', 'Dine-In', 'Mobile Ordering', 'Playland'],
    isOpen: true,
  },
  {
    id: '2',
    name: 'Burger King #8832',
    address: '456 Broadway, New York, NY 10012',
    distance: '1.2 miles',
    hours: 'Open until 12:00 AM',
    phone: '(212) 555-0456',
    features: ['Drive-Thru', 'Dine-In', 'Mobile Ordering'],
    isOpen: true,
  },
  {
    id: '3',
    name: 'Burger King #4491',
    address: '789 5th Ave, New York, NY 10022',
    distance: '2.5 miles',
    hours: 'Opens at 6:00 AM',
    phone: '(212) 555-0789',
    features: ['Dine-In', 'Mobile Ordering'],
    isOpen: false,
  },
];

export default function Locator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_RESTAURANTS[0].id);
  const [isLocating, setIsLocating] = useState(false);

  const handleLocateMe = () => {
    setIsLocating(true);
    // Simulate GPS locating
    setTimeout(() => {
      setIsLocating(false);
      setSearchQuery('Current Location');
    }, 1500);
  };

  const selectedRestaurant = MOCK_RESTAURANTS.find(r => r.id === selectedId);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-[400px] bg-white border-r border-bk-brown/10 flex flex-col shadow-2xl z-10">
          <div className="p-6 border-b border-bk-brown/5">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-6">Find a <span className="text-bk-red">Restaurant</span></h1>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-brown/40" size={20} />
                <input
                  type="text"
                  placeholder="Enter city, state, or zip"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bk-cream border-2 border-transparent rounded-2xl py-3 pl-12 pr-6 font-bold focus:border-bk-red outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleLocateMe}
                disabled={isLocating}
                className="bg-bk-brown text-white py-3 rounded-2xl font-black uppercase text-sm flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
              >
                <Navigation size={18} className={cn(isLocating && "animate-pulse")} />
                {isLocating ? 'Locating...' : 'Use My Location'}
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {MOCK_RESTAURANTS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={cn(
                  "w-full p-6 text-left border-b border-bk-brown/5 transition-all hover:bg-bk-cream/50",
                  selectedId === r.id && "bg-bk-cream border-l-4 border-l-bk-red"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black uppercase tracking-tighter text-lg">{r.name}</h3>
                  <span className="text-xs font-black text-bk-brown/40 uppercase tracking-widest">{r.distance}</span>
                </div>
                <p className="text-sm font-bold text-bk-brown/60 mb-4">{r.address}</p>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                  <div className={cn("w-2 h-2 rounded-full", r.isOpen ? "bg-green-500" : "bg-bk-red")} />
                  <span className={r.isOpen ? "text-green-600" : "text-bk-red"}>{r.hours}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map Placeholder / Details View */}
        <div className="flex-1 bg-bk-cream relative overflow-hidden">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-bk-brown/20 via-transparent to-transparent" />
            <div className="grid grid-cols-12 h-full w-full">
              {Array.from({ length: 144 }).map((_, i) => (
                <div key={i} className="border border-bk-brown/5" />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedRestaurant && (
              <motion.div
                key={selectedRestaurant.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="absolute bottom-8 left-8 right-8 lg:left-auto lg:right-12 lg:top-12 lg:bottom-auto lg:w-[450px] z-20"
              >
                <div className="bg-white rounded-[3rem] p-10 shadow-2xl border-4 border-bk-brown/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-bk-red rounded-3xl flex items-center justify-center text-white shadow-xl">
                      <MapPin size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-1">
                        {selectedRestaurant.name}
                      </h2>
                      <div className="flex items-center gap-2 text-bk-amber">
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <Star size={14} fill="currentColor" />
                        <span className="text-bk-brown/40 text-xs font-black ml-1">4.5 (1.2k reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-start gap-4">
                      <Clock size={20} className="text-bk-red shrink-0 mt-1" />
                      <div>
                        <p className="font-black uppercase tracking-tighter text-sm mb-1">Hours of Operation</p>
                        <p className="text-bk-brown/60 font-bold text-sm">{selectedRestaurant.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone size={20} className="text-bk-red shrink-0 mt-1" />
                      <div>
                        <p className="font-black uppercase tracking-tighter text-sm mb-1">Contact Number</p>
                        <p className="text-bk-brown/60 font-bold text-sm">{selectedRestaurant.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Info size={20} className="text-bk-red shrink-0 mt-1" />
                      <div>
                        <p className="font-black uppercase tracking-tighter text-sm mb-1">Features</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedRestaurant.features.map(f => (
                            <span key={f} className="bg-bk-cream text-bk-brown/60 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="w-full bg-bk-red text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl">
                      Order from this Restaurant
                      <ChevronRight size={24} />
                    </button>
                    <button className="w-full bg-bk-brown text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all">
                      Get Directions
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mock Map Markers */}
          {MOCK_RESTAURANTS.map((r) => (
            <motion.button
              key={r.id}
              onClick={() => setSelectedId(r.id)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              className={cn(
                "absolute z-10 p-2 rounded-full shadow-2xl transition-all",
                selectedId === r.id ? "bg-bk-red text-white scale-125 z-20" : "bg-white text-bk-red"
              )}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
            >
              <MapPin size={24} fill={selectedId === r.id ? "currentColor" : "none"} />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
