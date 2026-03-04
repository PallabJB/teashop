import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${API_URL}/api/contact`, formData);
            setShowSuccessModal(true);
            setFormData({ firstName: '', lastName: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            alert("There was an error sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="bg-cream min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                        className="font-heading text-5xl md:text-6xl text-forest "
                    >
                        Get in Touch
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-forest/70 mt-6 font-light text-lg"
                    >
                        We are here to assist with your tea journey.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2 className="font-heading text-3xl text-forest mb-8">Send a Message</h2>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-widest text-forest mb-2">First Name</label>
                                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="bg-transparent border-b border-forest/20 py-3 outline-none focus:border-gold transition-colors text-forest" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-widest text-forest mb-2">Last Name</label>
                                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="bg-transparent border-b border-forest/20 py-3 outline-none focus:border-gold transition-colors text-forest" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs uppercase tracking-widest text-forest mb-2">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-forest/20 py-3 outline-none focus:border-gold transition-colors text-forest" />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-xs uppercase tracking-widest text-forest mb-2">Message</label>
                                <textarea required rows="4" name="message" value={formData.message} onChange={handleChange} className="bg-transparent border-b border-forest/20 py-3 outline-none focus:border-gold transition-colors text-forest resize-none"></textarea>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="cursor-pointer bg-[#C2B280] text-dark px-12 py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#A8986B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4 border border-transparent hover:border-dark/10">
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                        className="space-y-16"
                    >
                        <div>
                            <h2 className="font-heading text-3xl text-forest mb-8">Our Boutique</h2>
                            <ul className="space-y-6 text-forest">
                                <li className="flex items-start gap-4">
                                    <MapPin className="w-5 h-5 text-[#C2B280] mt-1" />
                                    <div>
                                        <h4 className="uppercase tracking-widest text-sm font-semibold mb-1">Assam Estate</h4>
                                        <p className="text-forest/70 font-light">Assam<br />India</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Phone className="w-5 h-5 text-[#C2B280]" />
                                    <p className="text-forest/70 font-light">+91 9876-543210</p>
                                </li>
                                <li className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-[#C2B280]" />
                                    <p className="text-forest/70 font-light">concierge@kototea.com</p>
                                </li>
                            </ul>
                        </div>

                        <div className="aspect-video bg-gray-200 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
                            <iframe
                                src="https://maps.google.com/maps?q=Assam,%20India&t=&z=7&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="bg-cream p-10 max-w-md w-full text-center border border-[#C2B280]/30 shadow-2xl relative overflow-hidden"
                            style={{ transformPerspective: 1000 }}
                        >
                            {/* Decorative background circle */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C2B280]/20 rounded-full blur-2xl"></div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>

                            <h3 className="font-heading text-3xl text-forest mb-4">Thank You!</h3>
                            <p className="text-forest/70 font-light leading-relaxed mb-8">
                                Your message has been beautifully received. Our team will get back to you shortly.
                            </p>

                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full bg-[#C2B280] text-dark py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#A8986B] transition-colors cursor-pointer border border-transparent hover:border-dark/10"
                            >
                                Continue
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contact;
