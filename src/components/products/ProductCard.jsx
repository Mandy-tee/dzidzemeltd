import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };
  
  return (
    <motion.div
      className="card overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {product.discount && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="bg-white text-slate-800 p-2 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors duration-200"
              aria-label="Add to cart"
            >
              <ShoppingBagIcon className="w-5 h-5" />
            </button>
            
            {/* <Link 
              to={`/products/${product.id}`}
              className="bg-white text-slate-800 p-2 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors duration-200"
              aria-label="View product"
            >
              <EyeIcon className="w-5 h-5" />
            </Link> */}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {product.category}
          </span>
          
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                className={`w-4 h-4 ${star <= product.rating ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium mb-1 hover:text-primary-500 transition-colors duration-200">{product.name}</h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.oldPrice && (
              <span className="text-slate-400 line-through mr-2">${product.oldPrice.toFixed(2)}</span>
            )}
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="text-primary-500 hover:text-primary-600 p-1"
            aria-label="Add to cart"
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;