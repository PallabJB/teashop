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
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center group bg-black" style={{ perspective: "1000px" }}>
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    <motion.div style={{ y: yImage }} className="absolute inset-0 w-full h-full">
                        {/* More dynamic gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 z-10 transition-colors duration-500"></div>
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
                    style={{ y: yText, opacity, transformStyle: "preserve-3d" }}
                    className="relative z-20 text-center text-cream px-4 max-w-4xl mx-auto flex flex-col items-center drop-shadow-2xl"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 30, rotateX: 45, z: -50 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: -45, z: -50 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="uppercase tracking-[0.4em] text-xs md:text-sm mb-6 text-gold/90 font-medium font-sans drop-shadow-md"
                        style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.5)" }}
                    >
                        {slides[current].subtitle}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 50, rotateX: 20, z: -100 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                        exit={{ opacity: 0, y: -40, rotateX: -20, z: -100 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-10 font-light whitespace-pre-line leading-[1.1] tracking-tight"
                        style={{
                            textShadow: "0px 10px 30px rgba(0,0,0,0.8), 0px 4px 10px rgba(0,0,0,0.4), 0px 1px 2px rgba(255,255,255,0.2)"
                        }}
                    >
                        {slides[current].title}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20, z: -50 }}
                        animate={{ opacity: 1, y: 0, z: 0 }}
                        exit={{ opacity: 0, y: -20, z: -50 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    >
                        <Link
                            to={slides[current].link}
                            className="group/btn relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-full text-sm uppercase tracking-widest text-white transition-all duration-500 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 hover:scale-105"
                        >
                            <span className="relative z-10">{slides[current].linkText}</span>
                            <div className="relative z-10 w-8 h-8 rounded-full bg-gold/80 group-hover:bg-gold flex items-center justify-center transition-colors duration-300">
                                <ArrowRight className="w-4 h-4 text-black" strokeWidth={2} />
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons (Glassmorphic) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-12 z-30 p-4 bg-black/20 text-white/80 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-full transition-all duration-500 transform hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
            >
                <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-12 z-30 p-4 bg-black/20 text-white/80 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 rounded-full transition-all duration-500 transform hover:scale-110 shadow-[0_8px_32px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
            >
                <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Pagination Dots (3D Style) */}
            <div className="absolute bottom-10 z-30 flex gap-4 p-4 rounded-full bg-black/20 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-500 ease-in-out relative flex items-center justify-center ${current === i
                            ? 'w-10 bg-gold shadow-[0_0_10px_var(--color-gold)]'
                            : 'w-2 bg-white/40 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
