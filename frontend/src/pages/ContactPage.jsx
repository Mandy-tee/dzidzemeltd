import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    subscribe: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        subscribe: false
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Have questions about our products or services? We're here to help!
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <EnvelopeIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">Email</h3>
                    <a 
                      href="mailto:info@ghanafoods.com"
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-500"
                    >
                      dzidzemehome@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <PhoneIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">Phone</h3>
                    <a 
                      href="tel:+233200123456"
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-500"
                    >
                      +233 20 012 3456
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      123 Independence Avenue<br />
                      Accra, Ghana
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-4">Business Hours</h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>8:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft p-6">
              <h2 className="text-xl font-heading font-semibold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-1 font-medium">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="John"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block mb-1 font-medium">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="+233 20 123 4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-input"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="subscribe"
                      checked={formData.subscribe}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Subscribe to our newsletter to receive updates about new products and promotions.
                    </span>
                  </label>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary bg-secondary-500 hover:bg-primary-500 w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                          <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden">
          <div className="aspect-[16/9]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.7297039537213!2d-0.1870825846885601!3d5.556133595960527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1645564750986!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Ghana Foods Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;