import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import logoImage from '../../images/logo.png';

const Logo = () => {
  const { theme } = useTheme();
  
  return (
    <Link to="/" className="flex items-center">
      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
        <img src={logoImage} alt="logo" />
      </div>
      <div className="ml-2 font-heading font-bold text-xl">
        <span className="text-primary-500">Dzidzeme Home </span>
        <span className={theme === 'dark' ? 'text-white' : 'text-slate-800'}>Group Ltd</span>
      </div>
    </Link>
  );
};

export default Logo;