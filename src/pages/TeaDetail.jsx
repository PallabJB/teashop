import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Droplets, Thermometer, Clock, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { teas } from '../data/teas';

const TeaDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const tea = teas.find(t => t._id === id);

    if (!tea) return <div className="min-h-screen bg-cream flex items-center justify-center text-forest">Tea not found</div>;

    return (
        <div className="bg-cream min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-6">
                <Link to="/collection" className="inline-flex items-center gap-2 text-forest/50 hover:text-forest transition-colors mb-8 mt-4 uppercase tracking-widest text-xs">
                    <ChevronLeft className="w-4 h-4" /> Back to Collection
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="aspect-[4/5] overflow-hidden bg-ivory"
                    >
                        <img
                            src={tea.image}
                            alt={tea.name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-gold tracking-[0.2em] uppercase text-sm mb-4">{tea.type} • {tea.origin}</span>
                        <h1 className="font-heading text-5xl lg:text-7xl text-forest mb-8">{tea.name}</h1>
                        <p className="text-forest/80 text-lg leading-relaxed mb-10 font-light max-w-lg">
                            {tea.description}
                        </p>

                        <div className="flex items-center gap-6 mb-12">
                            <span className="font-heading text-3xl text-forest">RS. {tea.price}</span>
                            <button onClick={() => addToCart(tea)} className="cursor-pointer bg-[#87CEEB] text-dark px-12 py-4 uppercase tracking-[0.2em] font-medium text-sm hover:bg-[#4682B4] transition-colors border border-transparent hover:border-dark/10">
                                Add to Cart
                            </button>
                        </div>

                        <div className="space-y-8 border-t border-forest/10 pt-10">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="flex items-center gap-2 text-sm uppercase tracking-widest text-forest mb-3">
                                        <Droplets className="w-4 h-4 text-gold" /> Flavor Notes
                                    </h4>
                                    <ul className="text-forest/70 space-y-2">
                                        {tea.flavorNotes?.map((note, i) => (
                                            <li key={i} className="flex flex-col text-sm border-l border-gold pl-3 py-1">
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="flex items-center gap-2 text-sm uppercase tracking-widest text-forest mb-3">
                                        <Leaf className="w-4 h-4 text-gold" /> Origin
                                    </h4>
                                    <p className="text-forest/70 text-sm">{tea.origin}</p>

                                    <h4 className="flex items-center gap-2 text-sm uppercase tracking-widest text-forest mb-3 mt-6">
                                        <Thermometer className="w-4 h-4 text-gold" /> Brewing Guide
                                    </h4>
                                    <div className="flex gap-4 text-forest/70 text-sm">
                                        <span className="flex items-center gap-1">{tea.brewingTemp}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {tea.brewingTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Savor the Moment separator */}
            <div className="h-64 mt-32 bg-[#d8f9ff] flex items-center justify-center relative">
                <h2 className="relative z-10 font-heading text-4xl text-dark tracking-widest">Savor the Moment</h2>
            </div>
        </div>
    );
};

export default TeaDetail;
