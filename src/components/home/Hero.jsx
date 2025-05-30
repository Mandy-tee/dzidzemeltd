import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logoImage from '../../images/logo.png';
import juiceImage from '../../images/juice.png';
import brownriceImage from '../../images/brownrice.png';
import cereamixImage from '../../images/cereamix.png';
import coconutoilImage from '../../images/coconutoil.png';
import garimixImage from '../../images/garimix.png';
import jasminericeImage from '../../images/jasminerice.png';
import palmoil2Image from '../../images/palmoil2.png';
import soboloImage from '../../images/sobolo.png';
import winesImage from '../../images/wines.png';
import plainriceImage from '../../images/plainrice.png';


const images = [juiceImage, brownriceImage, cereamixImage, coconutoilImage, garimixImage, jasminericeImage, palmoil2Image, soboloImage, winesImage, plainriceImage];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <section className="relative pt-20 lg:pt-24 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={logoImage}
          alt="Ghanaian food background"
          className="w-full h-full object-fill opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/30 via-primary-500/20 to-white dark:to-slate-900"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
              Experience the <span className="text-primary-500">Authentic</span> Taste of Ghana
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl">
              Naturally healthy and organic food products delivered directly to your doorstep. Proudly made in Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn btn-primary text-center px-8 py-3 text-lg hover:bg-secondary-500">
                Shop Now
              </Link>
              <Link to="/about" className="btn btn-outline text-center px-8 py-3 text-lg hover:bg-secondary-500" >
                Learn More
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary-500 rounded-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-secondary-500 rounded-xl"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                <img
                  src={images[currentImageIndex]}
                  alt="Ghanaian food product"
                  className="w-full h-full object-fill aspect-[4/3] transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
