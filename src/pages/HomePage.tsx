import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import Testimonials from '../components/Testimonials';
import FarmStory from '../components/FarmStory';
import Newsletter from '../components/Newsletter';
import ContactForm from '../components/ContactForm';
import { useProducts } from '../contexts/ProductContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { products, featuredProducts } = useProducts();

  // Show featured products first, then fill with other products if needed
  const displayProducts = featuredProducts.length >= 3
    ? featuredProducts.slice(0, 6)
    : [...featuredProducts, ...products.filter(p => !p.featured)].slice(0, 6);

  return (
    <div>
      <Navbar />
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of rice grains and quality mining materials from Northern Nigeria.
            </p>
          </motion.div>

          {displayProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  View All Products
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Products Available</h3>
              <p className="text-gray-600 mb-8">
                Rice and mining materials will appear here once they are added to the inventory.
              </p>
              <Link
                to="/admin/login"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Admin Login
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      <FarmStory />
      <Testimonials />
      <Newsletter />
      <ContactForm />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">GreenSickle Agro</h3>
              <p className="text-gray-400">
                Fresh, organic produce delivered from our farm to your table.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Vegetables</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Fruits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dairy & Eggs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pantry</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>123 Farm Road, Green Valley</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: hello@GreenSickle Agrovest.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; GreenSickle Agro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;