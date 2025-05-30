import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

const FeaturedBlogPost = ({ post }) => {
  return (
    <motion.div
      className="card overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <div className="aspect-video overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-3">
          <div className="flex items-center mr-4">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            <span>{post.readTime} read</span>
          </div>
        </div>
        
        <Link to={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-heading font-semibold mb-3 group-hover:text-primary-500 transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="font-medium text-primary-500 hover:text-primary-600 transition-colors duration-200"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedBlogPost;