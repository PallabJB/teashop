import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { cartCount, setIsCartOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collection', path: '/collection' },
        { name: 'Our Story', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 py-4 ${isScrolled
                ? 'glass !py-2 shadow-sm text-forest'
                : location.pathname === '/'
                    ? 'bg-transparent text-cream'
                    : 'glass !py-2 text-forest'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <Leaf strokeWidth={1.5} className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300" />
                    <span className="font-heading text-2xl tracking-widest uppercase">Koto</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 ${location.pathname === link.path ? 'text-gold' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    <button onClick={() => setIsCartOpen(true)} className="relative group p-2 cursor-pointer">
                        <ShoppingBag strokeWidth={1.5} className="w-5 h-5 hover:text-gold transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[10px] text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu strokeWidth={1.5} className="w-6 h-6 hover:text-gold transition-colors" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 bg-forest text-cream z-50 flex flex-col justify-center items-center"
                    >
                        <button
                            className="absolute top-8 right-8 p-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X strokeWidth={1.5} className="w-8 h-8 hover:text-gold transition-colors" />
                        </button>
                        <div className="flex flex-col gap-8 text-center">
                            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-heading text-4xl hover:text-gold transition-colors">Home</Link>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="font-heading text-4xl hover:text-gold transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
