import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Filter, Search, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { MOCK_MENU_ITEMS } from '../constants';
import { cn } from '../lib/utils';

interface Allergen {
  id: string;
  name: string;
  icon: string;
}

const ALLERGENS: Allergen[] = [
  { id: 'milk', name: 'Milk', icon: '🥛' },
  { id: 'eggs', name: 'Eggs', icon: '🥚' },
  { id: 'wheat', name: 'Wheat', icon: '🌾' },
  { id: 'soy', name: 'Soy', icon: '🫘' },
  { id: 'peanuts', name: 'Peanuts', icon: '🥜' },
  { id: 'fish', name: 'Fish', icon: '🐟' },
];

export default function Nutrition() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = MOCK_MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const toggleAllergen = (id: string) => {
    setSelectedAllergens(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-6">
          Nutrition & <span className="text-bk-red">Allergens</span>
        </h1>
        <p className="text-xl font-bold text-bk-brown/60 max-w-2xl">
          We believe in transparency. Find full nutritional information and allergen details for all your BK® favorites.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-[3rem] p-8 shadow-2xl mb-12 border-4 border-bk-brown/5">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bk-brown/40" size={20} />
            <input
              type="text"
              placeholder="Search for an item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bk-cream border-2 border-transparent rounded-2xl py-3 pl-12 pr-6 font-bold focus:border-bk-red outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {ALLERGENS.map(a => (
              <button
                key={a.id}
                onClick={() => toggleAllergen(a.id)}
                className={cn(
                  "px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 border-2",
                  selectedAllergens.includes(a.id)
                    ? "bg-bk-red border-bk-red text-white shadow-lg"
                    : "bg-bk-cream border-transparent text-bk-brown/60 hover:border-bk-red/30"
                )}
              >
                <span>{a.icon}</span>
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nutrition Table */}
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-bk-brown/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bk-brown text-white">
              <tr>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Menu Item</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Calories</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Total Fat</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Sodium</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Carbs</th>
                <th className="p-6 font-black uppercase tracking-widest text-xs">Protein</th>
                <th className="p-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bk-brown/5">
              {filteredItems.map(item => (
                <React.Fragment key={item.id}>
                  <tr
                    className={cn(
                      "hover:bg-bk-cream/30 transition-colors cursor-pointer",
                      expandedId === item.id && "bg-bk-cream/50"
                    )}
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-xl object-cover shadow-md"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-black uppercase tracking-tighter text-lg italic">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-6 font-black text-bk-red">{item.calories}</td>
                    <td className="p-6 font-bold text-bk-brown/60">35g</td>
                    <td className="p-6 font-bold text-bk-brown/60">1,100mg</td>
                    <td className="p-6 font-bold text-bk-brown/60">50g</td>
                    <td className="p-6 font-bold text-bk-brown/60">28g</td>
                    <td className="p-6 text-right">
                      {expandedId === item.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </td>
                  </tr>
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <tr>
                        <td colSpan={7} className="p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-bk-cream/20"
                          >
                            <div className="p-8 grid md:grid-cols-2 gap-12">
                              <div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                                  <AlertTriangle size={20} className="text-bk-red" />
                                  Allergen Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                  {ALLERGENS.map(a => (
                                    <div key={a.id} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm">
                                      {Math.random() > 0.3 ? (
                                        <CheckCircle2 size={18} className="text-green-500" />
                                      ) : (
                                        <XCircle size={18} className="text-bk-red" />
                                      )}
                                      <span className="font-bold text-sm text-bk-brown/60">{a.name}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
                                  <Info size={20} className="text-bk-amber" />
                                  Full Nutrition Facts
                                </h4>
                                <div className="space-y-3">
                                  {[
                                    { label: 'Saturated Fat', value: '12g' },
                                    { label: 'Trans Fat', value: '1.5g' },
                                    { label: 'Cholesterol', value: '90mg' },
                                    { label: 'Dietary Fiber', value: '3g' },
                                    { label: 'Sugars', value: '11g' },
                                  ].map(stat => (
                                    <div key={stat.label} className="flex justify-between border-b border-bk-brown/5 pb-2">
                                      <span className="font-bold text-bk-brown/60">{stat.label}</span>
                                      <span className="font-black">{stat.value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 p-8 bg-bk-cream border-2 border-dashed border-bk-brown/10 rounded-[3rem] text-center">
        <p className="text-sm font-bold text-bk-brown/40 max-w-3xl mx-auto">
          Nutritional information is based on standard product formulations and serving sizes. Variations may occur due to seasonal differences, region, and minor differences in product assembly. If you have a severe food allergy, please inform the restaurant manager before ordering.
        </p>
      </div>
    </div>
  );
}
