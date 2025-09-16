'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/Header';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyPolicy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        privacyPolicy: false
      });
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/contact/contact-hero.png"
          alt="Contact Background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative z-10 h-full pt-20 overflow-y-auto">
        {/* Hero Section */}
        <section className="container-custom py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Contact
            </h1>
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
            >
              Get in touch and let us know about your project, or find out more about our 
              architectural design services. We'd love to hear from you.
            </motion.p>
          </motion.div>
        </section>

        {/* Contact Information & Form Section */}
        <section className="container-custom pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="space-y-8 bg-black/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700 shadow-2xl"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  Get in Touch
                </h2>
                
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Studio Location</h3>
                      <p className="text-gray-300 leading-relaxed">
                        Architecture & Design Studio<br />
                        [Your Studio Address]<br />
                        [City, State ZIP Code]
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Email</h3>
                      <a 
                        href="mailto:hello@yourstudio.com" 
                        className="text-orange-500 hover:text-orange-400 transition-colors duration-300"
                      >
                        hello@yourstudio.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-6 h-6 mt-1">
                      <svg className="w-full h-full text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Response Time</h3>
                      <p className="text-gray-300">
                        We typically respond within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Services Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                  className="mt-12 pt-8 border-t border-gray-800"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Our Services</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Architectural Design & Planning</li>
                    <li>• Interior Design & Space Planning</li>
                    <li>• Sustainable Design Solutions</li>
                    <li>• Project Consultation & Development</li>
                    <li>• Design Research & Innovation</li>
                  </ul>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="bg-black/70 backdrop-blur-md rounded-lg p-8 border border-gray-700 shadow-2xl"
              >
                <h2 className="text-2xl font-bold text-white mb-8">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                      placeholder="Project inquiry, consultation, etc."
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-vertical"
                      placeholder="Tell us about your project or how we can help..."
                    />
                  </div>

                  {/* Privacy Policy Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacyPolicy"
                      name="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onChange={handleInputChange}
                      required
                      className="mt-1 w-4 h-4 text-orange-500 bg-gray-800/50 border-gray-700 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <label htmlFor="privacyPolicy" className="text-sm text-gray-300 leading-relaxed">
                      I understand that my data will be stored in accordance with the privacy policy
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !formData.privacyPolicy}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                      isSubmitting || !formData.privacyPolicy
                        ? 'bg-gray-700 cursor-not-allowed'
                        : 'bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black'
                    }`}
                    whileHover={!isSubmitting && formData.privacyPolicy ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting && formData.privacyPolicy ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm"
                    >
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm"
                    >
                      Sorry, there was an error sending your message. Please try again or contact us directly.
                    </motion.div>
                  )}
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
