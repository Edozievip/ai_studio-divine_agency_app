
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  if (cart.length === 0) return (
    <div className="py-24 text-center bg-gray-50 min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="bg-white p-8 rounded-full shadow-sm mb-6">
        <ShoppingBag size={64} className="text-gray-300" />
      </div>
      <h2 className="text-3xl font-black text-black uppercase mb-4">YOUR CART IS EMPTY</h2>
      <p className="text-gray-500 max-w-sm mb-10 font-light">Looks like you haven't added any construction materials yet. Start building your order today!</p>
      <Link to="/shop" className="bg-orange-600 text-white px-12 py-4 font-black uppercase tracking-widest hover:bg-black transition-all">
        Back to Shop
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black uppercase mb-12 tracking-tight">SHOPPING <span className="text-orange-600">CART</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Price</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <tr key={item.product.id} className="group hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-6 flex items-center space-x-4">
                        <img src={item.product.image} className="w-16 h-16 object-cover bg-gray-50 border shrink-0" alt="" />
                        <div>
                          <p className="font-bold text-black uppercase group-hover:text-orange-600 transition-colors">{item.product.name}</p>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-[10px] font-black text-red-500 uppercase flex items-center mt-2 hover:text-red-700"
                          >
                            <Trash2 size={12} className="mr-1" /> Remove
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-6 hidden sm:table-cell font-bold">₦{item.product.price.toLocaleString()}</td>
                      <td className="px-6 py-6">
                        <div className="flex items-center border w-fit">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="px-3 py-1 hover:bg-gray-200">-</button>
                          <span className="px-4 font-bold text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="px-3 py-1 hover:bg-gray-200">+</button>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right font-black">₦{(item.product.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <Link to="/shop" className="inline-flex items-center text-sm font-bold uppercase text-gray-500 hover:text-black transition-colors">
              <ChevronLeft size={16} className="mr-1" /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-black text-white p-8 space-y-8 sticky top-28">
              <h3 className="text-xl font-black uppercase tracking-widest border-b border-gray-800 pb-4">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                  <span>Subtotal</span>
                  <span className="text-white">₦{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold uppercase text-xs">
                  <span>Delivery (Anambra)</span>
                  <span className="text-white">Calculated at Checkout</span>
                </div>
                <div className="pt-4 border-t border-gray-800 flex justify-between">
                  <span className="text-lg font-black uppercase">Total</span>
                  <span className="text-2xl font-black text-orange-500">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="block w-full bg-orange-600 hover:bg-white hover:text-black py-4 text-center font-black uppercase tracking-widest transition-all group"
              >
                Checkout Now <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="text-[10px] text-gray-500 leading-relaxed text-center font-bold">
                WE ACCEPT DIRECT TRANSFERS & DEPOSITS. <br />
                BULK ORDERS ELIGIBLE FOR SPECIAL RATES.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
