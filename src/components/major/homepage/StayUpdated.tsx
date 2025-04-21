'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const StayUpdated = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Reset states
        setError('');
        setIsSubmitting(true);
        
        // Basic email validation
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            setIsSubmitting(false);
            return;
        }
        
        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success state
            setIsSuccess(true);
            setEmail('');
        } catch (err) {
            setError('Failed to subscribe. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full py-16 relative">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url(/EgyptGOD.webp)] bg-center bg-cover bg-no-repeat"></div>
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div> 
            </div>
            
            {/* Content */}
            <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                    className="max-w-full mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-[20px] font-bold text-[#faf0fa] mb-4">
                        Stay Updated
                    </h2>
                    <p className="text-[15px] text-[#faf0fa] mb-8 font-fe tracking-wide">
                        Subscribe to our newsletter for the latest news, updates, and exclusive offers.
                    </p>
                    
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#E8B77C] p-6 rounded-lg border border-[#131417] text-[#131417] font-fe text-[15px]"
                        >
                            <p className="">Thank you for subscribing!</p>
                            <p className="mt-2">We &apos; ll keep you updated with the latest news.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email address"
                                    className="w-full px-4 py-3 bg-transparent border-b-2 border-[#faf0fa] text-[#faf0fa] focus:outline-none focus:border-b-2 focus:border-[#444656]] transition-colors"
                                    disabled={isSubmitting}
                                />
                                {error && (
                                    <p className="absolute -bottom-6 left-0 text-red-500 text-sm font-fe">
                                        {error}
                                    </p>
                                )}
                            </div>
                            
                            <div className="mt-6">
                                <Button
                                    type="submit"
                                    variant="third"
                                    size="small"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                >
                                    {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                                </Button>
                            </div>
                        
                            <p className="text-[12px] text-[#faf0fa] font-fe mt-4 text-center tracking-wide">
                                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default StayUpdated;