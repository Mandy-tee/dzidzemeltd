import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/products/ProductCard';
import TestimonialCard from '../components/home/TestimonialCard';
import CategoryCard from '../components/home/CategoryCard';
import FeaturedBlogPost from '../components/home/FeaturedBlogPost';
import Hero from '../components/home/Hero';
import { productCategories, testimonials, featuredPosts } from '../data/homeData';
import useSWR from "swr";
import { apiFetcher } from '../api/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
}

const HomePage = () => {
  const { data: categories } = useSWR('/categories', apiFetcher);
  const { data: featuredProducts } = useSWR(`/products?limit=4&sort={"isFeatured":"desc"}`, apiFetcher);

  return (
    <div>
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Explore Our Categories</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Discover our wide range of authentic Ghanaian products carefully selected for quality and taste.
            </p>
          </div>

          <Slider {...settings}>
            {categories?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Slider>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Products</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Our best-selling authentic Ghanaian products that customers love.
              </p>
            </div>

            <Link
              to="/products"
              className="mt-4 md:mt-0 inline-flex items-center font-medium text-primary-500 hover:text-primary-600"
            >
              View All Products <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why Choose Us</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              We're dedicated to bringing you the finest Ghanaian products with exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Products",
                description: "All our products are sourced directly from Ghana, ensuring authentic taste and quality.",
                icon: "🌍"
              },
              {
                title: "Fast Delivery",
                description: "We offer reliable shipping to ensure your products arrive fresh and on time.",
                icon: "🚚"
              },
              {
                title: "Premium Quality",
                description: "We carefully select only the highest quality products for our customers.",
                icon: "✨"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-500 dark:bg-secondary-500">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">What Our Customers Say</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers have to say about our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">From Our Blog</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Learn more about Ghanaian cuisine, culture, and how to enjoy our products.
              </p>
            </div>

            <Link
              to="/blog"
              className="mt-4 md:mt-0 inline-flex items-center font-medium text-primary-500 hover:text-primary-600"
            >
              View All Posts <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <FeaturedBlogPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;