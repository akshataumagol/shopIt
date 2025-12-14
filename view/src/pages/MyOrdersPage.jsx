import React, { useState, useEffect } from 'react';
import { orderAPI } from '../utils/api';
import { toast } from 'sonner';

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderAPI.getMyOrders();
        setOrders(data || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading orders...</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Order ID</th>
              <th className="border px-4 py-2 text-left">Created</th>
              <th className="border px-4 py-2 text-left">Items</th>
              <th className="border px-4 py-2 text-left">Total</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">#{order._id.slice(0, 8)}</td>
                  <td className="border px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{order.items?.length || 0} items</td>
                  <td className="border px-4 py-2 font-semibold">${order.total?.toFixed(2) || 0}</td>
                  <td className="border px-4 py-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {order.status || 'Processing'}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrdersPage;
