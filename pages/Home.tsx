
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  ChevronRight,
  Phone,
  MessageCircle
} from 'lucide-react';
import { WHATSAPP_LINK, PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <img 
            src="https://picsum.photos/seed/construction/1920/1080" 
            alt="Construction background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
          <span className="text-orange-500 font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Divine Agency • Anambra State
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6">
            BUILD <span className="text-orange-600 italic">STRONGER</span><br />
            WITH THE BEST.
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
            Quality construction materials delivered straight to your site across Onitsha, Awka, Nnewi, and all of Anambra.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/shop" 
              className="bg-orange-600 text-white px-10 py-4 font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center group"
            >
              Shop Materials <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
            <a 
              href={WHATSAPP_LINK}
              className="border-2 border-white text-white px-10 py-4 font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center"
            >
              Get Bulk Quote
            </a>
          </div>
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck size={32} />, title: "Fast Delivery", desc: "Site delivery within 24 hours across Anambra." },
            { icon: <ShieldCheck size={32} />, title: "Trusted Quality", desc: "Grade-A materials verified for strength." },
            { icon: <Clock size={32} />, title: "24/7 Support", desc: "Speak with an agent or AI assistant anytime." }
          ].map((f, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="text-orange-600 shrink-0">{f.icon}</div>
              <div>
                <h3 className="font-bold uppercase text-gray-900">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-black leading-tight">ESSENTIAL <br /><span className="text-orange-600">MATERIALS</span></h2>
            </div>
            <Link to="/shop" className="text-gray-500 font-bold uppercase tracking-widest text-sm hover:text-black flex items-center">
              View All Shop <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group bg-white border border-gray-100 p-4 hover:shadow-2xl transition-all duration-300">
                <div className="aspect-square mb-4 overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{p.category}</p>
                <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase">{p.name}</h3>
                <p className="text-xl font-black text-black mt-2">₦{p.price.toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Order Banner */}
      <section className="py-20 bg-orange-600 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[15rem] font-black text-white whitespace-nowrap">BULK DISCOUNT</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-6 leading-none">ORDER CEMENT IN BULK?</h2>
          <p className="text-orange-100 text-lg mb-10 max-w-2xl mx-auto">Get exclusive discounts for trailer-load orders of Dangote and BUA cement. Direct from factory to your warehouse or site.</p>
          <a href={WHATSAPP_LINK} className="inline-flex items-center space-x-3 bg-black text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            <MessageCircle />
            <span>Chat via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-orange-600 mx-auto mb-8"></div>
          <h2 className="text-3xl font-black mb-12">TESTIMONIALS</h2>
          <div className="space-y-12">
            {[
              { name: "Engineer Emeka O.", role: "Lead Contractor, Onitsha", quote: "Divine Agency is our go-to for iron rods. Their deliveries are always on schedule, and the quality is unbeatable." },
              { name: "Mrs. Chinelo A.", role: "Home Owner, Awka", quote: "Bought all my floor tiles here. The sales agents are very helpful and their prices are the most competitive in Anambra." }
            ].map((t, i) => (
              <div key={i} className="space-y-4">
                <p className="text-xl text-gray-700 italic font-light leading-relaxed">"{t.quote}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 uppercase">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
