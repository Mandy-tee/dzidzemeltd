import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../../contexts/CartContext';

const MiniCart = () => {
  const { cart, toggleCart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart} />
      
      <motion.div
        className="absolute top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-slate-900 shadow-xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-heading font-semibold">Your Cart</h2>
          <button onClick={toggleCart} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <ShoppingBagIcon className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/products"
              className="btn btn-primary"
              onClick={toggleCart}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {cart.map((item) => (
                <div key={item.id} className="py-4 px-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-slate-400 hover:text-accent-500"
                          aria-label="Remove item"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.variant || 'Standard'}
                      </p>
                      
                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="flex justify-between mb-4">
                <span>Subtotal:</span>
                <span className="font-semibold">${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-6">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              
              <Link
                to="/checkout"
                className="btn btn-primary w-full mb-3 text-center"
                onClick={toggleCart}
              >
                Checkout
              </Link>
              
              <button
                onClick={toggleCart}
                className="btn btn-outline w-full text-center"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MiniCart;