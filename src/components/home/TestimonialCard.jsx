import React from 'react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg 
            key={star} 
            className="w-5 h-5 text-yellow-400 inline-block" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 mb-6 italic">"{testimonial.text}"</p>
      
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.location}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;