import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Collection = () => {
    const { addToCart } = useCart();
    const [teas, setTeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Green', 'Black', 'Oolong', 'Matcha', 'Herbal'];

    useEffect(() => {
        const fetchTeas = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await axios.get(`${API_URL}/api/teas`);
                setTeas(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTeas();
    }, []);

    const filteredTeas = filter === 'All' ? teas : teas.filter(t => t.type === filter);

    return (
        <div className="bg-cream min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-heading text-5xl md:text-6xl text-forest mb-6">Our Collection</h1>
                    <p className="text-forest/70 max-w-2xl mx-auto font-light">
                        Discover our curated selection of fine teas, sourced directly from the world's most distinguished estates.
                    </p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-16"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`cursor-pointer px-6 py-2 rounded-full text-sm tracking-widest uppercase transition-all duration-300 ${filter === cat
                                ? 'bg-[#ADD8E6] text-dark border border-[#ADD8E6]'
                                : 'bg-transparent text-dark/70 border border-[#ADD8E6]/50 hover:bg-[#ADD8E6]/20 hover:text-dark'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse">
                                <div className="aspect-[4/5] bg-ivory mb-6"></div>
                                <div className="h-4 bg-ivory w-1/4 mb-2"></div>
                                <div className="h-6 bg-ivory w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                        <AnimatePresence>
                            {filteredTeas.map((tea, i) => (
                                <motion.div
                                    key={tea._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: i * 0.05 }}
                                    className="group relative"
                                >
                                    <Link to={`/tea/${tea._id}`} className="block">
                                        <div className="relative aspect-[4/5] overflow-hidden bg-ivory mb-6 max-h-[500px]">
                                            <img
                                                src={tea.image}
                                                alt={tea.name}
                                                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                                            />
                                            {/* Product Overlay */}
                                            <div className="absolute inset-0 bg-forest/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="bg-cream/90 backdrop-blur-sm text-forest px-6 py-3 uppercase tracking-widest text-xs translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                    View Details
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-gold mb-1">{tea.origin}</p>
                                            <Link to={`/tea/${tea._id}`}>
                                                <h3 className="font-heading text-2xl text-forest hover:text-gold transition-colors">{tea.name}</h3>
                                            </Link>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-forest">RS. {tea.price}</p>
                                            <button onClick={() => addToCart(tea)} className="mt-2 text-forest/40 hover:text-forest transition-colors cursor-pointer">
                                                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Collection;
