import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Leaf, ShoppingCart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '#about' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className={`h-8 w-8 ${scrolled ? 'text-green-600' : 'text-white'}`} />
            <span className={`text-xl font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              GreenSickle Agro 
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? scrolled
                        ? 'text-green-600'
                        : 'text-yellow-300'
                      : scrolled
                      ? 'text-gray-700 hover:text-green-600'
                      : 'text-white hover:text-yellow-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button className={`p-2 rounded-full ${scrolled ? 'text-gray-700 hover:text-green-600' : 'text-white hover:text-yellow-300'}`}>
                <ShoppingCart className="h-5 w-5" />
              </button>
              <Link
                to="/admin/login"
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/admin/login'
                    ? scrolled
                      ? 'text-green-600 bg-green-50'
                      : 'text-yellow-300 bg-white/10'
                    : scrolled
                    ? 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    : 'text-white hover:text-yellow-300 hover:bg-white/10'
                }`}
              >
                <User className="h-4 w-4" />
                Admin
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/admin/login'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4" />
              Admin Login
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;