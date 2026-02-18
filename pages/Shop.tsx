
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Search, Grid, List, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('cat');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');

  const categories = ['All', 'Cement', 'Roofing', 'Tiles', 'Reinforcement', 'Aggregates', 'Hardware'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // newest/default
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-xs text-orange-500 font-bold uppercase tracking-widest mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <span>Shop</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">MATERIALS <span className="text-orange-600 italic">CATALOG</span></h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            {/* Search */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Search Products</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Dangote"
                  className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={20} />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat 
                        ? 'bg-orange-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200 space-y-4 sm:space-y-0">
              <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                Showing {filteredProducts.length} materials
              </p>
              <div className="flex items-center space-x-4">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-sm font-bold uppercase tracking-wider outline-none cursor-pointer hover:text-orange-600 transition-colors"
                >
                  <option value="newest">Latest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`} className="group bg-white p-4 hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                    <div className="aspect-square mb-4 overflow-hidden bg-gray-50">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] text-orange-600 font-black uppercase tracking-[0.2em] mb-1">{p.category}</p>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-orange-600 transition-colors uppercase">{p.name}</h3>
                      <p className="text-sm text-gray-500 mt-2 font-light line-clamp-2">{p.description}</p>
                    </div>
                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-xl font-black text-black">₦{p.price.toLocaleString()}</span>
                      <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-1 text-gray-500">Per {p.unit}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">No materials found</p>
                <button 
                  onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
                  className="mt-4 text-orange-600 font-black uppercase underline hover:text-black transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
