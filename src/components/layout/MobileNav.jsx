import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  NewspaperIcon, 
  PhoneIcon 
} from '@heroicons/react/24/outline';

const MobileNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: <HomeIcon className="w-6 h-6" />, path: '/' },
    { name: 'Shop', icon: <ShoppingBagIcon className="w-6 h-6" />, path: '/products' },
    { name: 'Blog', icon: <NewspaperIcon className="w-6 h-6" />, path: '/blog' },
    { name: 'Contact', icon: <PhoneIcon className="w-6 h-6" />, path: '/contact' },
  ];
  
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 shadow-soft-lg border-t border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center py-3 px-5 ${
              location.pathname === item.path
                ? 'text-primary-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;