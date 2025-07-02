import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { imageBaseURL } from '../../api/client';

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
            src={`${imageBaseURL}${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

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

      <div className="p-4 flex flex-col justify-between h-[150px]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {product.category.name}
          </span>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-primary-500 transition-colors duration-200">{product.name}</h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.oldPrice && (
              <span className="text-slate-400 line-through mr-2">₵{product.oldPrice.toFixed(2)}</span>
            )}
            <span className="font-semibold">₵{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="text-primary-500 hover:text-secondary-500 p-1"
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