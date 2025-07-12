import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs.config';

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterData {
  email: string;
}

/**
 * Send contact form email using EmailJS
 */
export const sendContactEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Not provided',
      subject: data.subject,
      message: data.message,
      to_name: 'GreenSickle Agro Team',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * Send newsletter subscription email using EmailJS
 */
export const sendNewsletterEmail = async (data: NewsletterData): Promise<boolean> => {
  try {
    const templateParams = {
      from_email: data.email,
      to_name: 'GreenSickle Agro Team',
      message: `New newsletter subscription from: ${data.email}`,
      subject: 'New Newsletter Subscription',
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.NEWSLETTER_TEMPLATE_ID || EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Newsletter subscription sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send newsletter subscription:', error);
    return false;
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
