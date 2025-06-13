import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  StarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { productById, relatedProducts } from '../data/productData';
import ProductCard from '../components/products/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlist, setIsWishlist] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      const fetchedProduct = productById(id);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setRelated(relatedProducts(id, fetchedProduct.category));
      }
      
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(99, value));
    setQuantity(newQuantity);
  };
  
  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };
  
  const shareProduct = () => {
    // In a real app, this would use the Web Share API
    toast.success('Share options opened');
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6"></div>
          <div className="text-center text-slate-500 dark:text-slate-400">Loading product details...</div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container-custom">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-8 text-center">
            <ExclamationTriangleIcon className="w-16 h-16 mx-auto text-accent-500 mb-4" />
            <h1 className="text-2xl font-heading font-bold mb-4">Product Not Found</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We couldn't find the product you're looking for. It may have been removed or the URL might be incorrect.
            </p>
            <Link to="/products" className="btn btn-primary">
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
            <Link to="/" className="hover:text-primary-500">Home</Link>
            <ChevronRightIcon className="w-4 h-4 mx-2" />
            <Link to="/products" className="hover:text-primary-500">Products</Link>
            <ChevronRightIcon className="w-4 h-4 mx-2" />
            <Link to={`/products?category=${product.category}`} className="hover:text-primary-500 capitalize">
              {product.category}
            </Link>
            <ChevronRightIcon className="w-4 h-4 mx-2" />
            <span className="text-slate-800 dark:text-slate-200 truncate">{product.name}</span>
          </div>
        </div>
        
        {/* Back button */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-500"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="relative bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto aspect-square object-cover"
                />
                
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              {/* Additional images would go here in a real product */}
              <div className="mt-4 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((index) => (
                  <div 
                    key={index}
                    className={`border-2 rounded-md overflow-hidden cursor-pointer ${
                      index === 1 ? 'border-primary-500' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={`${product.name} view ${index}`} 
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-heading font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon 
                      key={star}
                      className={`w-5 h-5 ${
                        star <= product.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-slate-600 dark:text-slate-400">
                  {product.reviews} reviews
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  {product.oldPrice && (
                    <span className="text-slate-400 line-through text-lg mr-3">
                      ₵{product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-slate-800 dark:text-white">
                    ₵{product.price.toFixed(2)}
                  </span>
                </div>
                
                {product.stock > 0 ? (
                  <div className="flex items-center mt-2 text-success-500">
                    <CheckIcon className="w-5 h-5 mr-1" />
                    <span>In Stock ({product.stock} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center mt-2 text-accent-500">
                    <ExclamationTriangleIcon className="w-5 h-5 mr-1" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {product.description}
              </p>
              
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="w-24 text-slate-600 dark:text-slate-400">SKU:</span>
                  <span>{product.sku}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-24 text-slate-600 dark:text-slate-400">Category:</span>
                  <Link 
                    to={`/products?category=${product.category}`}
                    className="text-primary-500 hover:text-primary-600 capitalize"
                  >
                    {product.category}
                  </Link>
                </div>
                <div className="flex items-center mb-2">
                  <span className="w-24 text-slate-600 dark:text-slate-400">Variant:</span>
                  <span>{product.variant}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-slate-600 dark:text-slate-400">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Link 
                        key={index}
                        to={`/products?tag=${tag}`}
                        className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-300"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center">
                  <span className="w-24 text-slate-600 dark:text-slate-400">Quantity:</span>
                  <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-12 text-center border-0 focus:ring-0 bg-transparent"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-r-lg"
                      disabled={quantity >= 99}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary flex-1 flex items-center justify-center"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                
                <button
                  onClick={toggleWishlist}
                  className={`btn ${
                    isWishlist 
                      ? 'bg-accent-100 text-accent-500 hover:bg-accent-200 dark:bg-accent-900 dark:text-accent-300 dark:hover:bg-accent-800'
                      : 'btn-outline'
                  } px-4`}
                >
                  <HeartIcon className={`w-5 h-5 ${isWishlist ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={shareProduct}
                  className="btn btn-outline px-4"
                >
                  <ShareIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 space-y-4">
                <div className="flex items-start">
                  <div className="mr-3 text-primary-500">
                    <ShieldCheckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Secure Payments</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      We support multiple payment methods including credit cards, debit cards, and mobile money.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-3 text-primary-500">
                    <TruckIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Fast Delivery</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Free shipping on orders over $50. Delivery within 2-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="border-t border-slate-200 dark:border-slate-700">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('description')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Description
              </button>
              
              <button
                onClick={() => setActiveTab('specifications')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'specifications'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Specifications
              </button>
              
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Product Description</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {product.description}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    Our {product.name} is sourced directly from Ghana, ensuring the highest quality and authentic taste. We work closely with local farmers and producers to bring you the finest Ghanaian products.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Product Specifications</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400 w-1/3">Product Name</td>
                        <td className="py-3 font-medium">{product.name}</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400">SKU</td>
                        <td className="py-3">{product.sku}</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400">Category</td>
                        <td className="py-3 capitalize">{product.category}</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400">Weight</td>
                        <td className="py-3">{product.weight}</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400">Dimensions</td>
                        <td className="py-3">{product.dimensions.height} × {product.dimensions.width} × {product.dimensions.depth}</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 text-slate-600 dark:text-slate-400">Variant</td>
                        <td className="py-3">{product.variant}</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-slate-600 dark:text-slate-400">Country of Origin</td>
                        <td className="py-3">Ghana</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-heading font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star}
                          className={`w-5 h-5 ${
                            star <= product.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-600 dark:text-slate-300 font-medium">
                      Based on {product.reviews} reviews
                    </span>
                  </div>
                  
                  {/* Sample reviews - in a real app these would come from an API */}
                  <div className="space-y-6">
                    {[
                      {
                        name: "Michael Smith",
                        rating: 5,
                        date: "March 15, 2025",
                        content: "This product exceeded my expectations! The quality is exceptional and it tastes exactly like what I remember from my trip to Ghana. Highly recommend!",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                      },
                      {
                        name: "Sarah Johnson",
                        rating: 4,
                        date: "March 10, 2025",
                        content: "Great product overall. Shipping was fast and the packaging was secure. The only reason I'm giving 4 stars instead of 5 is because I wish it came in larger sizes.",
                        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                      }
                    ].map((review, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start">
                          <div className="mr-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img 
                                src={review.avatar} 
                                alt={review.name}
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.name}</h4>
                              <span className="text-sm text-slate-500 dark:text-slate-400">{review.date}</span>
                            </div>
                            
                            <div className="flex items-center mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon 
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-slate-300 dark:text-slate-600'
                                  }`}
                                />
                              ))}
                            </div>
                            
                            <p className="text-slate-600 dark:text-slate-300">
                              {review.content}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <button className="btn btn-primary">Write a Review</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;