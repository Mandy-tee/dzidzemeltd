import React, { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // This would be an API call in a real application
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast.success('Thanks for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="bg-primary-500 dark:bg-secondary-500 py-12 md:py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and updates on new Ghanaian products!
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn bg-secondary-500 hover:bg-secondary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-70"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;