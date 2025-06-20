import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  ChevronRightIcon,
  ArrowLeftIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { apiClient } from '../api/client';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);


  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (!currentUser) return navigate('/login?returnUrl=/checkout');
      const data = new FormData(e.target);
      // Create Order via Backend API
      const response = await apiClient.post('/orders', {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        phone: data.get('phone'),
        address: data.get('address'),
        city: data.get('city'),
        region: data.get('region'),
        postalCode: data.get('postalCode'),
        country: data.get('country'),
        items: cart.map(item => ({
          product: item.id,
          price: item.price,
          quantity: item.quantity
        })),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Clear the cart
      clearCart();
      // Load Hubtel Invoice URL for payment
      window.location.replace(response.data.checkoutUrl);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold">Checkout</h1>

          <div className="hidden sm:flex items-center text-sm font-medium">
            <Link to="/cart" className="text-slate-800 dark:text-slate-200">
              Cart
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2 text-slate-400" />
            <span className="text-primary-500 dark:text-secondary-500">
              Checkout
            </span>
          </div>
        </div>

        <div className="mb-6">
          <Link
            to={"/cart"}
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-500"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-heading font-semibold">
                  Shipping Information
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-1 font-medium">
                        First Name *
                      </label>
                      <input
                        required
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block mb-1 font-medium">
                        Last Name *
                      </label>
                      <input
                        required
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="email" className="block mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        required
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block mb-1 font-medium">
                      Address *
                    </label>
                    <input
                      required
                      type="text"
                      id="address"
                      name="address"
                      className={`form-input border-accent-500 focus:ring-accent-500`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block mb-1 font-medium">
                        City *
                      </label>
                      <input
                        required
                        type="text"
                        id="city"
                        name="city"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>

                    <div>
                      <label htmlFor="region" className="block mb-1 font-medium">
                        State / Region
                      </label>
                      <input
                        required
                        type="text"
                        id="region"
                        name="region"
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block mb-1 font-medium">
                        Postal Code *
                      </label>
                      <input
                        required
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        className={`form-input border-accent-500 focus:ring-accent-500`}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="country" className="block mb-1 font-medium">
                      Country *
                    </label>
                    <select
                      required
                      id="country"
                      name="country"
                      className="form-input"
                    >
                      <option value="Ghana">Ghana</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div className="flex justify-between mt-8">
                    <Link to="/cart" className="btn btn-outline">
                      Back to Cart
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary hover:bg-secondary-500"
                    >
                      {loading ? 'Loading...' : 'Continue to Payment'}
                    </button>
                  </div>
                </motion.div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-heading font-semibold mb-6">Order Summary</h2>

              <div className="divide-y divide-slate-200 dark:divide-slate-700 mb-6 max-h-[50vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 flex items-center justify-between">
                    <div className="flex items-center flex-grow min-w-0">
                      <div className="relative mr-4 flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                          <img
                            src={`https://lh3.googleusercontent.com/d/${item.image}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="min-w-0 flex-grow">
                        <h4 className="font-medium truncate">{item.name}</h4>
                      </div>
                    </div>

                    <div className="font-medium ml-4 flex-shrink-0">
                      ₵{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium">₵{getCartTotal().toFixed(2)}</span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-xl">₵{getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <div className="text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-center mb-2">
                  <LockClosedIcon className="w-4 h-4 mr-1" />
                  <span>Secure Checkout</span>
                </div>
                <p className="text-center">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;