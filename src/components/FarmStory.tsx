import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, Leaf, Award, Heart } from 'lucide-react';

const FarmStory: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Families Fed' },
    { icon: Leaf, value: '100%', label: 'Organic Certified' },
    { icon: Award, value: '15+', label: 'Years of Excellence' },
    { icon: Heart, value: '100%', label: 'Sustainably Grown' },
  ];

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Farm-to-Table
              <span className="block text-green-600">Story</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              For over 15 years, GreenHarvest has been dedicated to providing the freshest, 
              most nutritious organic produce to our community. What started as a small family 
              farm has grown into a trusted source of premium fruits and vegetables, 
              all while maintaining our commitment to sustainable farming practices.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe in the power of fresh, organic food to nourish both body and soul. 
              Every seed we plant, every crop we tend, and every harvest we gather is done 
              with respect for the earth and love for our customers.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image with Parallax Effect */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <motion.img
                src="https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Farm landscape"
                className="w-full h-[600px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Overlay Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sustainable Farming Practices
                </h3>
                <p className="text-gray-600">
                  We use regenerative agriculture techniques that not only produce 
                  the best crops but also improve soil health and biodiversity.
                </p>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <Leaf className="h-12 w-12 text-green-600" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-600 rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FarmStory;