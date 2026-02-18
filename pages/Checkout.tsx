
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { CartItem, Order } from '../types';
import { saveOrder } from '../db';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Awka'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      timestamp: Date.now(),
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: `${formData.address}, ${formData.city}`,
      items: cart,
      totalPrice: total,
      status: 'pending'
    };

    try {
      await saveOrder(newOrder);
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Order failed to process. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return (
    <div className="min-h-screen bg-white py-24 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <CheckCircle size={48} />
      </div>
      <h1 className="text-4xl font-black text-black uppercase mb-4">ORDER CONFIRMED</h1>
      <p className="text-gray-500 max-w-md mb-12 font-light">Thank you for choosing Divine Agency. We've received your order. Our agent will call you shortly to confirm delivery details.</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/" className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest hover:bg-orange-600 transition-all">Back Home</Link>
        <Link to="/shop" className="border-2 border-black px-10 py-4 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Continue Shop</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-black uppercase mb-12">SECURE <span className="text-orange-600">CHECKOUT</span></h1>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-12">
            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">1</div>
                <h3 className="text-xl font-black uppercase tracking-wider">Contact Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  required
                  type="text" 
                  placeholder="Full Name" 
                  className="bg-white border p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  required
                  type="tel" 
                  placeholder="Phone Number" 
                  className="bg-white border p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input 
                  required
                  type="email" 
                  placeholder="Email Address" 
                  className="bg-white border p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500 md:col-span-2"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">2</div>
                <h3 className="text-xl font-black uppercase tracking-wider">Site Address</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <textarea 
                  required
                  rows={3}
                  placeholder="Street Address / Site Location" 
                  className="bg-white border p-4 font-bold outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
                <select 
                  className="bg-white border p-4 font-bold outline-none"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                >
                  <option>Awka</option>
                  <option>Onitsha</option>
                  <option>Nnewi</option>
                  <option>Ekwulobia</option>
                  <option>Ihiala</option>
                  <option>Other (Anambra)</option>
                </select>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-xs">3</div>
                <h3 className="text-xl font-black uppercase tracking-wider">Payment</h3>
              </div>
              <div className="bg-gray-100 p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="text-gray-400" />
                  <span className="font-bold uppercase text-sm">Direct Bank Transfer / Pay on Delivery</span>
                </div>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  To ensure quality, we process payments via direct transfer or bank deposit. For bulk orders, site payment is available after offloading.
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white border p-8 space-y-8">
              <h3 className="text-xl font-black uppercase tracking-widest border-b pb-4">Your Order</h3>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm font-bold uppercase">
                    <span className="text-gray-500">{item.quantity}x {item.product.name}</span>
                    <span className="text-black">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-dashed space-y-4">
                <div className="flex justify-between font-black">
                  <span className="uppercase tracking-widest">Total Payable</span>
                  <span className="text-2xl text-orange-600">₦{total.toLocaleString()}</span>
                </div>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-black text-white py-5 font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
              >
                {isSubmitting ? 'PROCESSING...' : 'COMPLETE ORDER'}
              </button>
            </div>

            <div className="bg-orange-50 border border-orange-100 p-6 flex items-start space-x-4">
              <Truck className="text-orange-600 shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold uppercase text-orange-900">Next-Day Site Delivery</p>
                <p className="text-xs text-orange-800/70 mt-1">Orders confirmed before 2PM are delivered within 24 hours.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
