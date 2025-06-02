import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
              <h2 className="text-3xl font-heading font-bold mb-4">Page Not Found</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/"
                className="btn btn-primary hover:bg-secondary-500 inline-flex items-center"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              
              <button 
                onClick={() => window.history.back()}
                className="btn btn-outline inline-flex items-center"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-medium mb-4">You might be interested in:</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/products" 
                  className="text-primary-500 hover:text-secondary-500 font-medium"
                >
                  Browse Products
                </Link>
                <Link 
                  to="/blog" 
                  className="text-primary-500 hover:text-secondary-500 font-medium"
                >
                  Read Our Blog
                </Link>
                <Link 
                  to="/contact" 
                  className="text-primary-500 hover:text-secondary-500 font-medium"
                >
                  Contact Us
                </Link>
                <Link 
                  to="/about" 
                  className="text-primary-500 hover:text-secondary-500 font-medium"
                >
                  About Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;