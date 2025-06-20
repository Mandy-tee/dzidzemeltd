import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-xl shadow-soft group mr-5"
    >
      <Link to={`/products?category=${category.id}`}>
        <div className="aspect-square">
          <img
            src={`https://lh3.googleusercontent.com/d/${category.image}`}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-medium text-lg md:text-xl">{category.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;