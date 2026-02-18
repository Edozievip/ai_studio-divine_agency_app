
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, MessageCircle, Truck, Shield, RotateCcw } from 'lucide-react';
import { PRODUCTS, WHATSAPP_LINK } from '../constants';
import { CartItem } from '../types';

interface ProductDetailProps {
  onAddToCart: (item: CartItem) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-black mb-4">PRODUCT NOT FOUND</h2>
      <Link to="/shop" className="text-orange-600 font-bold uppercase hover:underline">Return to Shop</Link>
    </div>
  );

  const handleAddToCart = () => {
    onAddToCart({ product, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">
          <Link to="/" className="hover:text-black">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/shop" className="hover:text-black">Shop</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-orange-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-50 border border-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <span className="text-xs font-black text-orange-600 tracking-[0.3em] uppercase mb-2">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-black leading-tight uppercase mb-6">
              {product.name}
            </h1>
            
            <div className="flex items-end space-x-3 mb-8 pb-8 border-b border-gray-100">
              <span className="text-4xl font-black text-black">₦{product.price.toLocaleString()}</span>
              <span className="text-gray-400 font-bold text-sm mb-1 uppercase tracking-widest">per {product.unit}</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light">
              {product.description}
            </p>

            {/* Quantity & Actions */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center border-2 border-black p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 font-black"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 font-black"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-grow h-[52px] flex items-center justify-center space-x-2 font-black uppercase tracking-widest transition-all ${
                    isAdded ? 'bg-green-600 text-white' : 'bg-orange-600 text-white hover:bg-black'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{isAdded ? 'ADDED TO CART' : 'ADD TO CART'}</span>
                </button>
              </div>

              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                className="w-full h-[52px] border-2 border-black flex items-center justify-center space-x-2 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              >
                <MessageCircle size={20} />
                <span>Enquire via WhatsApp</span>
              </a>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-3 gap-4 py-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-orange-600"><Truck size={24} /></div>
                <p className="text-[10px] font-bold uppercase text-gray-500">Fast Site Delivery</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-orange-600"><Shield size={24} /></div>
                <p className="text-[10px] font-bold uppercase text-gray-500">Certified Grade</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="text-orange-600"><RotateCcw size={24} /></div>
                <p className="text-[10px] font-bold uppercase text-gray-500">Bulk Discounts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
