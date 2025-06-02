import React from 'react';
import { Link } from 'react-router-dom';
import mtnlogoImage from '../../images/mtnlogo.png';
import Logo from '../common/Logo';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaTiktok
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Fruit Juices', path: '/products?category=juices' },
      { name: 'Grains & Rice', path: '/products?category=grains' },
      { name: 'Oils', path: '/products?category=oils' },
      { name: 'Wines', path: '/products?category=wines' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Wholesale', path: '/wholesale' },
    ],
    help: [
      { name: 'Shipping & Returns', path: '/shipping' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Track Order', path: '/track-order' },
    ],
  };
  
  const socialLinks = [
    { icon: <FaFacebookF className="w-5 h-5" />, url: 'https://facebook.com/Dzidzemehomeventures', label: 'Facebook' },
    { icon: <FaInstagram className="w-5 h-5" />, url: 'https://instagram.com/ahuntorfoods', label: 'Instagram' },
    { icon: <FaLinkedinIn className="w-5 h-5" />, url: 'https://linkedin.com/in/abigail-norkplim-agottor-44034a66', label: 'LinkedIn' },
    { icon: <FaTiktok className="w-5 h-5" />, url: 'https://tiktok.com/@dhome_foods', label: 'TikTok' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-800 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-md">
              Bringing the authentic taste of Ghana to your homes. Our carefully curated selection
              of premium Ghanaian ingredients offers natural and organic Ghana-made food products.
            </p>
            
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white transition-colors duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            &copy; {currentYear} Dzidzeme Home Group Ltd. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" 
              alt="Stripe" 
              className="h-6 object-contain"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" 
              alt="Visa" 
              className="h-6 object-contain"
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
              alt="Mastercard" 
              className="h-6 object-contain"
            />
            <img 
              src={mtnlogoImage} 
              alt="MTN Mobile Money" 
              className="h-6 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;