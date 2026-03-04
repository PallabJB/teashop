import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80",
        subtitle: "The Art of Infusion",
        title: "Experience the\nArt of Tea",
        link: "/collection",
        linkText: "Explore Collection"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80",
        subtitle: "Heritage & Craft",
        title: "Pioneers of\nOrganic Tea",
        link: "/about",
        linkText: "Our Story"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
        subtitle: "Pure Origins",
        title: "From Mountain\nTo Cup",
        link: "/collection",
        linkText: "Shop Single Origin"
    }
];

const HeroCarousel = ({ yImage, yText, opacity }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center group">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-full">
                        <div className="absolute inset-0 bg-black/40 z-10 transition-colors duration-500"></div>
                        <img
                            src={slides[current].image}
                            alt="Hero background"
                            className="w-full h-[120%] object-cover object-center transform scale-105"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    style={{ y: yText, opacity }}
                    className="relative z-20 text-center text-cream px-4 max-w-4xl mx-auto flex flex-col items-center"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.8 }}
                        className="uppercase tracking-[0.3em] text-sm mb-6 text-gold font-sans"
                    >
                        {slides[current].subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 1 }}
                        className="font-heading text-6xl md:text-8xl text-cream mb-8 font-light whitespace-pre-line leading-tight"
                    >
                        {slides[current].title}
                    </motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
                        <Link to={slides[current].link} className="inline-flex items-center gap-3 border-b border-gold pb-2 text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300">
                            {slides[current].linkText} <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-6 md:left-12 z-30 p-3 bg-white/0 text-white/0 group-hover:bg-white/10 group-hover:text-white backdrop-blur-md border border-white/0 group-hover:border-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 md:right-12 z-30 p-3 bg-white/0 text-white/0 group-hover:bg-white/10 group-hover:text-white backdrop-blur-md border border-white/0 group-hover:border-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-12 z-30 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-500 ease-out ${current === i ? 'w-8 bg-gold' : 'bg-white/50 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
