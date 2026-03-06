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

const HeroCarousel = ({ yText, opacity }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    // Determines the relative position of the slide vs the current active slide
    const getOffset = (index) => {
        let diff = index - current;
        if (diff > Math.floor(slides.length / 2)) diff -= slides.length;
        if (diff < -Math.floor(slides.length / 2)) diff += slides.length;
        return diff;
    };

    return (
        <motion.div
            style={{ opacity, y: yText }}
            className="relative h-[100svh] w-full overflow-hidden flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
            {/* Perspective Wrapper */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1500px" }}>
                {slides.map((slide, index) => {
                    const offset = getOffset(index);
                    const isActive = offset === 0;

                    return (
                        <motion.div
                            key={slide.id}
                            initial={false}
                            animate={{
                                x: offset === 0 ? "0%" : offset < 0 ? "-75%" : "75%",
                                z: offset === 0 ? 0 : -350,
                                rotateY: offset === 0 ? 0 : offset < 0 ? 45 : -45,
                                opacity: offset === 0 ? 1 : 0.3,
                                scale: offset === 0 ? 1 : 0.85
                            }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className={`absolute w-[80%] md:w-[650px] lg:w-[800px] aspect-[4/5] md:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl ${isActive ? 'z-20 border border-white/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]' : 'z-10 border border-white/5 pointer-events-none'}`}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {/* Dark/Glass Overlay */}
                            <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'bg-black/50 backdrop-blur-[2px]' : 'bg-black/80'}`}></div>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-16"
                                        style={{ transform: 'translateZ(50px)' }} // Parallax element POP
                                    >
                                        <span className="uppercase tracking-[0.4em] text-xs md:text-sm mb-4 md:mb-6 text-gold font-medium font-sans drop-shadow-md">
                                            {slide.subtitle}
                                        </span>
                                        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white mb-8 md:mb-10 font-light whitespace-pre-line leading-[1.1] drop-shadow-2xl">
                                            {slide.title}
                                        </h1>
                                        <Link
                                            to={slide.link}
                                            className="group/btn relative inline-flex items-center gap-4 px-6 py-3 md:px-8 md:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-gold/60 rounded-full text-xs md:text-sm uppercase tracking-widest text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/20"
                                        >
                                            <span className="relative z-10">{slide.linkText}</span>
                                            <div className="relative w-8 h-8 rounded-full bg-gold/90 group-hover:bg-gold flex items-center justify-center transition-colors duration-300">
                                                <ArrowRight className="w-4 h-4 text-black" strokeWidth={2} />
                                            </div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Cinematic Gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50 pointer-events-none z-30"></div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[1400px] flex justify-between px-4 md:px-12 z-40 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto p-3 md:p-4 bg-black/40 backdrop-blur-md text-white/70 hover:text-white border border-white/10 hover:border-white/50 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                    <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto p-3 md:p-4 bg-black/40 backdrop-blur-md text-white/70 hover:text-white border border-white/10 hover:border-white/50 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                >
                    <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
                </button>
            </div>

            {/* Bottom Dots Navigation */}
            <div className="absolute bottom-8 z-40 flex gap-3 p-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${current === i
                            ? 'w-12 bg-gold shadow-[0_0_10px_var(--color-gold)]'
                            : 'w-3 bg-white/40 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default HeroCarousel;
