import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCartIcon,
  UserIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Logo from '../common/Logo';
import MiniCart from '../cart/MiniCart';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { getCartCount, toggleCart, isCartOpen } = useCart();
  const { currentUser } = useAuth();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white dark:bg-slate-900 shadow-md py-2'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center">
            <button
              className="lg:hidden mr-4"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>

            <Logo />
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-primary-500 ${location.pathname === link.path ? 'text-primary-500' : ''
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button> */}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>

            <Link
              to={currentUser ? '/account' : '/login'}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label={currentUser ? 'My account' : 'Login'}
            >
              <UserIcon className="w-5 h-5" />
            </Link>

            <button
              onClick={toggleCart}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 relative"
              aria-label="Cart"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />

            <motion.div
              className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white dark:bg-slate-900 shadow-xl"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-5 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                <Logo />
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-5 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
                <Link
                  to={currentUser ? '/account' : '/login'}
                  className="flex items-center py-3 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  {currentUser ? 'My Account' : 'Login / Register'}
                </Link>

                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center py-3 w-full text-left font-medium"
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="w-5 h-5 mr-3" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-5 h-5 mr-3" />
                      Dark Mode
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      {/* <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-4 pr-12 bg-white dark:bg-slate-800 border-0 focus:ring-0 text-lg"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <MagnifyingGlassIcon className="w-6 h-6 text-slate-400" />
                </button>
              </form>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSearchSubmit}
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  Search
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* Mini Cart */}
      <AnimatePresence>
        {isCartOpen && <MiniCart />}
      </AnimatePresence>
    </>
  );
};

export default Header;