import { useState, useLayoutEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import useSWR from "swr";
import { apiFetcher } from '../api/client';

const priceRanges = [
  { value: 'any', label: 'Any Price' },
  { value: 'under_10', label: 'Under ₵10' },
  { value: 'from_10_to_25', label: 'From ₵10 to ₵25' },
  { value: 'from_25_to_50', label: 'From ₵25 to ₵50' },
  { value: 'over_50', label: 'Over ₵50' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Arrivals' },
];

const priceRangeFilter = (range) => {
  switch (range) {
    case 'over_50':
      return { price: { $gt: 50 } };
    case 'from_25_to_50':
      return { price: { $lte: 50, $gte: 25 } };
    case 'from_10_to_25':
      return { price: { $lte: 25, $gte: 10 } };
    case 'under_10':
      return { price: { $lt: 10 } };
    default:
      return {};
  }
}

const sortFilter = (sort) => {
  switch (sort) {
    case 'featured':
      return { isFeatured: 'desc' };
    case 'price_low':
      return { price: 'asc' };
    case 'price_high':
      return { price: 'desc' };
    case 'newest':
      return { createdAt: 'desc' };
    default:
      return { isFeatured: 'desc' };
  }
}

const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sort, setSort] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products, isLoading } = useSWR(
    `/products?limit=0&filter=${JSON.stringify({ ...((searchParams.get('category') && searchParams.get('category') != 'all') ? { category: searchParams.get('category') } : {}), ...priceRangeFilter(searchParams.get('price')), ...{ $or: [{ name: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } }] } })}&sort=${JSON.stringify(sortFilter(sort))}`,
    apiFetcher
  );
  const { data: categories } = useSWR('/categories', apiFetcher);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams.get('category'), searchParams.get('price')]);

  const resetFilters = () => {
    navigate('/products');
    setSort('featured');
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-6"></div>
          <div className="text-center text-slate-500 dark:text-slate-400">Loading products...</div>
        </div>
      </div>
    );
  }

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
                  {categories?.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category.id}`}
                        name="category"
                        checked={searchParams.get('category') === category.id}
                        onChange={() => {
                          const price = searchParams.get('price');
                          navigate(`?category=${category.id}&price=${price || 'any'}`)
                        }}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                      >
                        {category.name}
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
                        id={`price-${range.value}`}
                        name="priceRange"
                        checked={searchParams.get('price') === range.value}
                        onChange={() => {
                          const category = searchParams.get('category');
                          navigate(`?price=${range.value}&category=${category || 'all'}`)
                        }}
                        className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                      />
                      <label
                        htmlFor={`price-${range.value}`}
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
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
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
                      {categories?.map((category) => (
                        <div key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            id={`mobile-category-${category.id}`}
                            name="mobile-category"
                            checked={searchParams.get('category') === category.id}
                            onChange={() => {
                              const price = searchParams.get('price');
                              navigate(`?category=${category.id}&price=${price || 'any'}`);
                            }}
                            className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                          />
                          <label
                            htmlFor={`mobile-category-${category.id}`}
                            className="ml-2 text-sm text-slate-600 dark:text-slate-300"
                          >
                            {category.name}
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
                            id={`mobile-price-${range.value}`}
                            name="mobile-priceRange"
                            checked={searchParams.get('price') === range.value}
                            onChange={() => {
                              const category = searchParams.get('category');
                              navigate(`?price=${range.value}&category=${category || 'all'}`)
                            }}
                            className="w-4 h-4 text-primary-500 focus:ring-primary-500 border-slate-300 dark:border-slate-600"
                          />
                          <label
                            htmlFor={`mobile-price-${range.value}`}
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          setSearchQuery(e.target.value);
                        }
                      }}
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
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
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
                    {products?.length} {products?.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(searchParams.get('category') || searchParams.get('price') || searchQuery) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchParams.get('category') && (
                  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                    <span>Category: {categories.find(c => c.id === searchParams.get('category'))?.name || 'All'}</span>
                    <button className="ml-2">
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {searchParams.get('price') && (
                  <div className="inline-flex items-center bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                    <span>Price: {priceRanges.find(p => p.value === searchParams.get('price'))?.label}</span>
                    <button className="ml-2">
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
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
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