
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  MessageCircle, 
  Mic, 
  MicOff,
  User
} from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';
import VoiceAssistant from './VoiceAssistant';

const Header: React.FC<{ cartCount: number }> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-black text-orange-600 tracking-tighter">DIVINE</span>
            <span className="text-2xl font-black text-black ml-1 tracking-tighter">AGENCY</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold uppercase tracking-wider hover:text-orange-600 transition-colors ${
                  location.pathname === link.path ? 'text-orange-600' : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/admin" className="p-2 text-gray-700 hover:text-orange-600 transition-colors">
              <User size={24} />
            </Link>
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-3 px-4 text-base font-bold uppercase tracking-wider text-gray-800 hover:bg-gray-50 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-black text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-orange-500">DIVINE AGENCY</h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Premium construction materials supplier based in Anambra State. Quality and trust delivered to your site.
        </p>
        <div className="flex space-x-4">
          <a href={WHATSAPP_LINK} target="_blank" className="text-gray-400 hover:text-orange-500">
            <MessageCircle size={20} />
          </a>
          <a href="tel:2348107189127" className="text-gray-400 hover:text-orange-500">
            <Phone size={20} />
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Quick Links</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><Link to="/shop" className="hover:text-orange-500">Materials Shop</Link></li>
          <li><Link to="/about" className="hover:text-orange-500">Our Story</Link></li>
          <li><Link to="/gallery" className="hover:text-orange-500">Project Gallery</Link></li>
          <li><Link to="/blog" className="hover:text-orange-500">Construction Blog</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Products</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><Link to="/shop?cat=Cement" className="hover:text-orange-500">Cement & Blocks</Link></li>
          <li><Link to="/shop?cat=Reinforcement" className="hover:text-orange-500">Iron Rods</Link></li>
          <li><Link to="/shop?cat=Roofing" className="hover:text-orange-500">Roofing Sheets</Link></li>
          <li><Link to="/shop?cat=Tiles" className="hover:text-orange-500">Wall & Floor Tiles</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-6 border-b border-gray-800 pb-2 inline-block">Contact Info</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li className="flex items-start space-x-3">
            <Phone size={16} className="text-orange-500 mt-1 shrink-0" />
            <span>+234 810 718 9127</span>
          </li>
          <li className="flex items-start space-x-3">
            <MessageCircle size={16} className="text-orange-500 mt-1 shrink-0" />
            <span>Anambra State, Nigeria</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
      &copy; {new Date().getFullYear()} Divine Agency. All Rights Reserved. Built for Anambra Excellence.
    </div>
  </footer>
);

const FloatingButtons: React.FC<{ onVoiceToggle: () => void; isVoiceActive: boolean }> = ({ onVoiceToggle, isVoiceActive }) => (
  <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
    <button
      onClick={onVoiceToggle}
      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-110 ${
        isVoiceActive ? 'bg-red-600 animate-pulse' : 'bg-orange-600'
      } text-white`}
    >
      {isVoiceActive ? <MicOff size={28} /> : <Mic size={28} />}
    </button>
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110"
    >
      <MessageCircle size={28} />
    </a>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode; cartCount: number }> = ({ children, cartCount }) => {
  const [isVoiceVisible, setIsVoiceVisible] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartCount={cartCount} />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingButtons 
        onVoiceToggle={() => setIsVoiceVisible(!isVoiceVisible)} 
        isVoiceActive={isVoiceVisible} 
      />
      {isVoiceVisible && (
        <VoiceAssistant onClose={() => setIsVoiceVisible(false)} />
      )}
    </div>
  );
};

export default Layout;
