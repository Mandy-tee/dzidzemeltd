import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AccountPage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <p className="mt-1">{user?.name || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <p className="mt-1">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          {user?.orders?.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Order #{order.id}</span>
                    <span className="text-gray-600 dark:text-gray-400">{order.date}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Status: {order.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No orders yet</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Addresses</h2>
          {user?.addresses?.length > 0 ? (
            <div className="space-y-4">
              {user.addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4">
                  <div className="font-medium mb-2">{address.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {address.street}<br />
                    {address.city}, {address.region}<br />
                    {address.country}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No addresses saved</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;