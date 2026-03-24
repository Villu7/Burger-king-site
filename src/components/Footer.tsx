import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, MapPin, Info, Shield, Globe, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const sections = [
    {
      title: "BK® Info",
      links: [
        { name: "About BK®", path: "/about" },
        { name: "Nutrition & Allergens", path: "/nutrition" },
        { name: "Newsroom", path: "/news" },
        { name: "Sustainability", path: "/sustainability" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Customer Service", path: "/support" },
        { name: "Find a Restaurant", path: "/locator" },
        { name: "BK® App", path: "/app" },
        { name: "Gift Cards", path: "/gift-cards" },
      ]
    },
    {
      title: "Careers",
      links: [
        { name: "Work with Us", path: "/careers" },
        { name: "Corporate Careers", path: "/corporate" },
        { name: "Diversity & Inclusion", path: "/diversity" },
      ]
    }
  ];

  return (
    <footer className="bg-bk-brown text-white pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-bk-red/10 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand & Social */}
          <div className="flex flex-col gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-bk-red font-black text-2xl italic">BK</span>
              </div>
              <span className="font-black text-2xl tracking-tighter uppercase">Burger King</span>
            </Link>
            <p className="text-white/60 font-bold max-w-xs">
              Flame-grilled goodness since 1954. Join the family and start earning Crowns today.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-bk-red hover:text-white transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8 text-bk-amber">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/60 font-bold hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-bk-amber rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-black uppercase tracking-widest text-white/40">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-white/20">
            TM & © 2026 BURGER KING CORPORATION. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
