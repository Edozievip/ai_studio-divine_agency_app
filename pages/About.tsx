
import React from 'react';
import { Target, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-6 tracking-tighter">DIVINE <span className="text-orange-600">AGENCY</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed uppercase tracking-widest">
            Strength, Trust, and Reliability in Anambra’s Construction Sector.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-black leading-none uppercase">A LEGACY OF <br /><span className="text-orange-600">EXCELLENCE</span></h2>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              Founded in the heart of Anambra State, Divine Agency began with a simple mission: to provide high-quality building materials with unmatched reliability. Over the years, we have grown into one of the most trusted suppliers in Onitsha, Awka, and Nnewi.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed font-light">
              We understand that a building is only as strong as the materials used. That is why we partner exclusively with top manufacturers like Dangote and BUA, ensuring every bag of cement and every iron rod meets industrial safety standards.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h4 className="text-3xl font-black text-orange-600">10+</h4>
                <p className="text-sm font-bold uppercase text-gray-500">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-orange-600">5k+</h4>
                <p className="text-sm font-bold uppercase text-gray-500">Sites Supplied</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/agency/800/800" alt="Warehouse" className="w-full aspect-square object-cover shadow-2xl" />
            <div className="absolute -bottom-8 -left-8 bg-orange-600 p-8 text-white hidden md:block">
              <p className="font-black text-2xl uppercase italic">"Built to Last"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 space-y-6 shadow-sm border border-gray-100">
            <Target className="text-orange-600" size={40} />
            <h3 className="text-xl font-black uppercase">Our Mission</h3>
            <p className="text-gray-500 text-sm leading-relaxed">To become the backbone of Nigeria’s infrastructure by delivering premium building materials with efficiency and integrity.</p>
          </div>
          <div className="bg-white p-10 space-y-6 shadow-sm border border-gray-100">
            <Award className="text-orange-600" size={40} />
            <h3 className="text-xl font-black uppercase">Our Quality</h3>
            <p className="text-gray-500 text-sm leading-relaxed">We don’t compromise. Every product in our inventory is strictly vetted for structural durability and performance.</p>
          </div>
          <div className="bg-white p-10 space-y-6 shadow-sm border border-gray-100">
            <Users className="text-orange-600" size={40} />
            <h3 className="text-xl font-black uppercase">Our Service</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Customer satisfaction is our ultimate goal. Our team is available round-the-clock to support your construction project.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
