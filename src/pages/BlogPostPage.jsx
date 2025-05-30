import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarIcon, 
  ClockIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const BlogPostPage = () => {
  const { slug } = useParams();

  // In a real app, this would fetch the post data based on the slug
  const post = {
    title: "The Art of Making Perfect Jollof Rice",
    excerpt: "Master the techniques and secrets behind creating the most delicious Ghanaian jollof rice. Learn about the best ingredients and traditional cooking methods.",
    content: `
      <p>Jollof rice is more than just a dish in Ghana - it's a cultural icon that brings people together and represents the heart of our cuisine. In this comprehensive guide, we'll explore the essential ingredients, techniques, and secrets that make Ghanaian jollof rice truly special.</p>

      <h2>The Perfect Base</h2>
      <p>The key to exceptional jollof rice starts with selecting the right rice. Our premium Ghana Jasmine Rice is ideal for this dish, offering the perfect texture and ability to absorb flavors while maintaining its structure.</p>

      <h2>Essential Ingredients</h2>
      <ul>
        <li>Premium Ghana Jasmine Rice</li>
        <li>Fresh tomatoes and tomato paste</li>
        <li>Onions and garlic</li>
        <li>Scotch bonnet peppers</li>
        <li>Traditional Ghanaian spices</li>
        <li>High-quality cooking oil</li>
      </ul>

      <h2>The Cooking Process</h2>
      <p>The magic of jollof rice lies in the layering of flavors and the precise cooking technique. Start by preparing a rich tomato base, incorporating aromatic spices, and gradually adding the rice to create that signature orange-red color and incredible taste.</p>

      <h2>Tips for Success</h2>
      <ul>
        <li>Always parboil the rice before adding it to the sauce</li>
        <li>Use the right ratio of liquid to rice</li>
        <li>Cook on low heat for the best results</li>
        <li>Let the rice steam at the end for perfect texture</li>
      </ul>

      <p>Remember, great jollof rice requires patience and attention to detail. Take your time with each step, and you'll be rewarded with a dish that's truly worthy of celebration.</p>
    `,
    image: "https://images.pexels.com/photos/11899547/pexels-photo-11899547.jpeg",
    category: "Recipes",
    date: "March 15, 2025",
    readTime: "8 min",
    author: {
      name: "Abena Osei",
      avatar: "https://randomuser.me/api/portraits/women/23.jpg",
      bio: "Food writer and traditional Ghanaian cuisine expert"
    },
    tags: ["Recipes", "Traditional", "Cooking Tips", "Rice Dishes"]
  };

  const relatedPosts = [
    {
      id: 1,
      title: "Essential Spices in Ghanaian Cooking",
      slug: "ghanaian-cooking-spices",
      image: "https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg",
      date: "March 10, 2025",
      readTime: "6 min"
    },
    {
      id: 2,
      title: "How to Choose the Best Rice for Your Dishes",
      slug: "choosing-best-rice",
      image: "https://images.pexels.com/photos/1310779/pexels-photo-1310779.jpeg",
      date: "March 8, 2025",
      readTime: "5 min"
    },
    {
      id: 3,
      title: "Traditional Ghanaian Cooking Methods",
      slug: "traditional-cooking-methods",
      image: "https://images.pexels.com/photos/5638527/pexels-photo-5638527.jpeg",
      date: "March 5, 2025",
      readTime: "7 min"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-500"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium px-3 py-1 rounded-full mb-6">
            {post.category}
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center">
              <img 
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {post.author.bio}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                <span>{post.readTime} read</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="mb-12 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-auto"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags and Social Share */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-slate-200 dark:border-slate-700 mb-12">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                to={`/blog/tag/${tag.toLowerCase()}`}
                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-sm hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <HeartIcon className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ShareIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 mb-12">
          <div className="flex items-center mb-4">
            <img 
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h3 className="font-heading font-semibold text-lg mb-1">
                {post.author.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {post.author.bio}
              </p>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Abena is a passionate food writer and culinary expert specializing in traditional Ghanaian cuisine. With over 10 years of experience, she brings authentic recipes and cooking techniques to home cooks around the world.
          </p>
        </div>

        {/* Related Posts */}
        <div>
          <h2 className="text-2xl font-heading font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-slate-800 rounded-xl shadow-soft overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2 group-hover:text-primary-500 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    <span className="mr-3">{post.date}</span>
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;