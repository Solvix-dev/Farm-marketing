import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendNewsletterEmail, isValidEmail } from '../services/emailService';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send newsletter subscription email
      const success = await sendNewsletterEmail({ email });

      if (success) {
        setIsSubscribed(true);
        toast.success('Successfully subscribed to our newsletter!');
        setEmail('');

        // Reset subscription state after 5 seconds
        setTimeout(() => setIsSubscribed(false), 5000);
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Get the latest updates on rice varieties, mining materials availability, and exclusive offers.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting || isSubscribed}
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            className={`font-semibold px-8 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
              isSubscribed
                ? 'bg-green-400 text-gray-900 cursor-default'
                : isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <Check className="h-5 w-5" />
                Subscribed!
              </>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-green-100 text-sm mt-4"
        >
          We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;