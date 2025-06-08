import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MobileNav from '../components/layout/MobileNav';
import NewsletterSignup from '../components/common/NewsletterSignup';
import ScrollToTop from '../components/common/ScrollToTop';

const MainLayout = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <NewsletterSignup />
      <Footer />
      <MobileNav />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;