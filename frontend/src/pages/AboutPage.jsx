import { motion } from 'framer-motion';
import aboutImage from '../images/about.png';
import portfolioImage from '../images/portfolio.png'

const AboutPage = () => {
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
            The Rise of Dzidzeme Home Group Limited
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A Journey of Resilience and Innovation
          </motion.p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-heading font-bold mb-6">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              In the bustling city of Accra, Ghana, in 2017, Abigail Norkplim Agottor discovered a remarkable opportunity that would alter the course of her life. While working in the Internal Audit Department, Abigail noticed a surge in demand for a local rice brand distributed as Christmas goodies to her colleagues. This aromatic and delicious rice quickly became a favorite, leading Abigail to seize the opportunity and begin supplying it herself. This venture marked the birth of her entrepreneurial journey into the local rice market.
            </p>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Her product line to includes homemade palm oil, coconut oil, organic brown rice, ready-to-eat cereamix (tombrown), natural salt, coconut gari, millet and hibiscus drinks infused with natural herbs, kokonte flour, and dzenkple flour mix. The range also includes herbal teas, natural fruit juices, smoothies, biscuits, crunches, cocoa, lemongrass, coconut & ginger mix, bisap, garlic, potato, and turmeric gari.
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Today, Dzidzeme Home Group Limited stands as a beacon of hope and inspiration for aspiring entrepreneurs, proving that with hard work, dedication, and a supportive network, anything is possible.
            </p>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-primary-500 rounded-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-secondary-500 rounded-xl"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={aboutImage}
                  alt="About the Founder"
                  className="w-full h-full object-fill aspect-[4/3]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Founder Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold mb-6">Meet The Founder</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              The visionary leader behind Dzidzeme Home Group Limited, bringing authentic Ghanaian food products to you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-secondary-500 rounded-xl"></div>
                <div className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={portfolioImage}
                    alt="Abigail Agottor - Founder"
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-2xl font-heading font-bold mb-4">Abigail Norkplim Agottor</h3>
              <p className="text-primary-500 font-medium mb-6">Founder & CEO</p>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Abigail Norkplim Agottor’s journey from a humble beginning to the establishment of Dzidzeme Home Group Limited is a testament to resilience, innovation, and the power of community. Despite facing significant challenges, including a global pandemic and personal health struggles, Abigail’s determination and entrepreneurial spirit never wavered. Her ability to adapt, rebrand, and expand her business while empowering others around her showcases the true essence of leadership and success. 
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The success of Dzidzeme Home Group Limited was supported by a dedicated team. Abigail herself, with her extensive experience in tourism, hospitality management, business administration, internal auditing, and relationship management, led the team. She was responsible for production, processing, quality assurance, marketing, and product innovation.
                Dzidzeme Home Group Limited, under Abigail's leadership, is poised for continued growth and success. The company is also set to make a significant impact on the local market and beyond.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality and Healthy Food Products",
              description: "Her innovative spirit led her to experiment with sugar-free bread made from brown rice, catering to those with specific medical conditions."
            },
            {
              title: "Empowering the Youth and Community",
              description: "By mentoring secondary school leavers and exposing them to production processes, she ensured the development of a skilled workforce."
            },
            {
              title: "Supporting and Promoting Local Businesses",
              description: "Collaborating with other Ghanaian entrepreneurs, such as niche chocolate drink, Eku pure juice, and other Ghana-made cleaning products alongside her food products."
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-soft text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-heading font-semibold mb-4">{value.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;