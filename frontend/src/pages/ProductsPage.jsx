import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FunnelIcon, 
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import { allProducts } from '../data/productData';

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'featured',
  });
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load products
    setProducts(allProducts);
    
    // Check if there's a category filter in the URL
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
    }
  }, [location]);
  
  useEffect(() => {
    applyFilters();
  }, [filters, products, searchQuery]);
  
  const applyFilters = () => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter(product => 
        product.price >= min && (max ? product.price <= max : true)
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        // No sorting needed, products are already in featured order
        break;
    }
    
    setFilteredProducts(result);
  };
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      sort: 'featured',
    });
    setSearchQuery('');
  };
  
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'juices', label: 'Fruit Juices' },
    { value: 'oils', label: 'Oils' },
    { value: 'grains', label: 'Grains & Flour' },
    { value: 'wines', label: 'Wines' },
    { value: 'snacks', label: 'Snacks' },
    { value: 'fish', label: 'Dried Fish' },
    { value: 'cereals', label: 'Cereals' },
  ];
  
  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-10', label: 'Under ₵10' },
    { value: '10-25', label: 'From ₵10 to ₵25' },
    { value: '25-50', label: 'From ₵25 to ₵50' },
    { value: '50-', label: 'Over ₵50' },
  ];
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'rating', label: 'Highest Rated' },
  ];
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 shadow-soft rounded-lg"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5" />
              <span>Filter & Sort</span>
            </button>
          </div>
          
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 h-fit bg-white dark:bg-slate-800 rounded-lg shadow-soft p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-lg">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                Reset All
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Categories Filter */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.value || 'all'}`}
                        name="category"
                        checked={filters.category === category.value}
                        onChange={() => handleFilterChange('category', category.value)}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                      />
                      <label 
                        htmlFor={`category-${category.value || 'all'}`}
                        className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${range.value || 'all'}`}
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => handleFilterChange('priceRange', range.value)}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                      />
                      <label 
                        htmlFor={`price-${range.value || 'all'}`}
                        className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          
          {/* Mobile Filters */}
          {isFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden bg-black bg-opacity-50 flex items-center justify-center p-4">
              <motion.div 
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h2 className="font-heading font-semibold text-lg">Filters</h2>
                  <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-4 space-y-6">
                  {/* Sort */}
                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.value} className="flex items-center">
                          <input
                            type="radio"
                            id={`mobile-category-${category.value || 'all'}`}
                            name="mobile-category"
                            checked={filters.category === category.value}
                            onChange={() => handleFilterChange('category', category.value)}
                            className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                          />
                          <label 
                            htmlFor={`mobile-category-${category.value || 'all'}`}
                            className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            {category.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <div key={range.value} className="flex items-center">
                          <input
                            type="radio"
                            id={`mobile-price-${range.value || 'all'}`}
                            name="mobile-priceRange"
                            checked={filters.priceRange === range.value}
                            onChange={() => handleFilterChange('priceRange', range.value)}
                            className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                          />
                          <label 
                            htmlFor={`mobile-price-${range.value || 'all'}`}
                            className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 border border-slate-300 dark:border-slate-600 rounded-lg"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex-1 py-2 bg-primary-500 text-white rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-grow">
            {/* Top Bar with Search, Sort and Results Count */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full md:w-auto flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <svg 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                <div className="w-full md:w-auto flex gap-4 items-center">
                  <div className="hidden lg:block min-w-[200px]">
                    <label htmlFor="sort-desktop" className="sr-only">Sort by</label>
                    <select
                      id="sort-desktop"
                      value={filters.sort}
                      onChange={(e) => handleFilterChange('sort', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(filters.category || filters.priceRange || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.category && (
                  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                    <span>Category: {categories.find(c => c.value === filters.category)?.label}</span>
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="ml-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {filters.priceRange && (
                  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                    <span>Price: {priceRanges.find(p => p.value === filters.priceRange)?.label}</span>
                    <button
                      onClick={() => handleFilterChange('priceRange', '')}
                      className="ml-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {searchQuery && (
                  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                    <span>Search: "{searchQuery}"</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 px-3 py-1 rounded-full text-sm"
                >
                  Clear All
                </button>
              </div>
            )}
            
            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-soft p-8 text-center">
                <FunnelIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  We couldn't find any products matching your current filters or search criteria.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;