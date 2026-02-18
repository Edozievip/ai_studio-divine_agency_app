
import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ShoppingCart, MessageSquare, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllOrders, getAllInquiries } from '../db';
import { Order, Inquiry } from '../types';

const Admin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const o = await getAllOrders();
      const i = await getAllInquiries();
      setOrders(o.sort((a, b) => b.timestamp - a.timestamp));
      setInquiries(i.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-black text-gray-400 uppercase tracking-widest">
      Loading Records...
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <LayoutDashboard size={40} className="text-orange-600" />
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter">ADMIN <span className="text-orange-600 italic">DASHBOARD</span></h1>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Divine Agency Management</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-gray-900 border border-gray-800 p-4 rounded text-center min-w-[120px]">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Total Orders</p>
              <p className="text-2xl font-black text-white">{orders.length}</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded text-center min-w-[120px]">
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Inquiries</p>
              <p className="text-2xl font-black text-white">{inquiries.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 gap-12">
          {/* Orders Table */}
          <section className="bg-white border shadow-sm">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-black uppercase flex items-center">
                <ShoppingCart size={20} className="mr-2 text-orange-600" />
                Recent Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Items</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {orders.length > 0 ? orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-bold">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold">{order.customerName}</div>
                        <div className="text-xs text-gray-500">{order.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {order.items.map(item => `${item.quantity}x ${item.product.name}`).join(', ')}
                      </td>
                      <td className="px-6 py-4 font-black text-orange-600">₦{order.totalPrice.toLocaleString()}</td>
                      <td className="px-6 py-4 uppercase font-black text-[10px]">
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Pending</span>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-400">No orders found in IndexedDB</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Inquiries Table */}
          <section className="bg-white border shadow-sm">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-black uppercase flex items-center">
                <MessageSquare size={20} className="mr-2 text-orange-600" />
                Contact Inquiries
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 tracking-widest border-b">
                  <tr>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-sm">
                  {inquiries.length > 0 ? inquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                        <div className="flex items-center"><Clock size={12} className="mr-1" /> {new Date(inq.timestamp).toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 font-bold uppercase">{inq.name}<br/><span className="text-xs font-normal text-gray-400 uppercase">{inq.phone}</span></td>
                      <td className="px-6 py-4 text-gray-600 leading-relaxed italic">"{inq.message}"</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-gray-400">No inquiries found in IndexedDB</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Admin;
