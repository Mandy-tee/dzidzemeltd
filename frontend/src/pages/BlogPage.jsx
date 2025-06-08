import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const blogPosts = [
  {
    id: 1,
    title: "The Art of Making Perfect Jollof Rice",
    slug: "perfect-jollof-rice-guide",
    excerpt: "Master the techniques and secrets behind creating the most delicious Ghanaian jollof rice. Learn about the best ingredients and traditional cooking methods.",
    image: "https://images.pexels.com/photos/13915043/pexels-photo-13915043.jpeg",
    category: "Recipes",
    date: "March 15, 2025",
    readTime: "8 min",
    author: {
      name: "Abena Osei",
      avatar: "https://randomuser.me/api/portraits/women/16.jpg"
    }
  },
  {
    id: 2,
    title: "Health Benefits of Coconut Oil in African Cuisine",
    slug: "coconut-oil-health-benefits",
    excerpt: "Discover the numerous health benefits of using coconut oil in your cooking and how it's traditionally used in Ghanaian dishes.",
    image: "https://images.pexels.com/photos/11921158/pexels-photo-11921158.jpeg",
    category: "Health & Wellness",
    date: "March 12, 2025",
    readTime: "6 min",
    author: {
      name: "Dr. Kwame Addo",
      avatar: "https://randomuser.me/api/portraits/men/53.jpg"
    }
  },
  {
    id: 3,
    title: "Traditional Ghanaian Breakfast Ideas",
    slug: "ghanaian-breakfast-ideas",
    excerpt: "Start your day the Ghanaian way with these nutritious and delicious traditional breakfast recipes using our premium products.",
    image: "https://images.pexels.com/photos/32293399/pexels-photo-32293399/free-photo-of-breakfast-omelette-and-coffee-on-a-table.jpeg",
    category: "Recipes",
    date: "March 10, 2025",
    readTime: "5 min",
    author: {
      name: "Efua Mensah",
      avatar: "https://randomuser.me/api/portraits/women/36.jpg"
    }
  },
  {
    id: 4,
    title: "Sustainable Farming Practices in Ghana",
    slug: "sustainable-farming-ghana",
    excerpt: "Learn about how our partner farmers are implementing sustainable practices to produce high-quality ingredients while protecting the environment.",
    image: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
    category: "Sustainability",
    date: "March 8, 2025",
    readTime: "7 min",
    author: {
      name: "Yaw Asante",
      avatar: "https://randomuser.me/api/portraits/men/16.jpg"
    }
  },
  {
    id: 5,
    title: "The Rich History of Palm Oil in West African Cooking",
    slug: "palm-oil-history",
    excerpt: "Explore the cultural significance and culinary applications of palm oil in traditional West African cuisine.",
    image: "https://images.pexels.com/photos/3066951/pexels-photo-3066951.jpeg",
    category: "Culture",
    date: "March 5, 2025",
    readTime: "6 min",
    author: {
      name: "Kofi Owusu",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    }
  },
  {
    id: 6,
    title: "Modern Twists on Traditional Ghanaian Dishes",
    slug: "modern-ghanaian-cuisine",
    excerpt: "Discover innovative ways to incorporate traditional Ghanaian ingredients into contemporary recipes that appeal to modern palates.",
    image: "https://images.pexels.com/photos/17952748/pexels-photo-17952748/free-photo-of-fried-cubes-and-rice-on-white-plate.jpeg",
    category: "Recipes",
    date: "March 3, 2025",
    readTime: "7 min",
    author: {
      name: "Ama Serwaa",
      avatar: "https://randomuser.me/api/portraits/women/89.jpg"
    }
  }
];

const categories = [
  "All",
  "Recipes",
  "Culture",
  "Health & Wellness",
  "Sustainability",
  "Tips & Tricks"
];

const BlogPage = () => {
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
            Our Blog
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover recipes, cooking tips, and stories about Ghanaian cuisine and culture
          </motion.p>
        </div>

        {/* Categories */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex space-x-4 min-w-max px-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link 
            to={`/blog/${blogPosts[0].slug}`}
            className="group block bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative overflow-hidden">
                <img 
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={blogPosts[0].author.avatar}
                    alt={blogPosts[0].author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{blogPosts[0].author.name}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {blogPosts[0].date}
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4 group-hover:text-primary-500 transition-colors">
                  {blogPosts[0].title}
                </h2>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {blogPosts[0].excerpt}
                </p>
                
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center mr-4">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{blogPosts[0].readTime} read</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden h-full"
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-slate-500 dark:text-slate-400">{post.date}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>{post.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="btn btn-outline inline-flex items-center">
            Load More Articles
            <ArrowRightIcon className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;