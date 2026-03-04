import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Utensils, Award, Heart, Star } from 'lucide-react';
import ReelsCarousel from '../components/ReelsCarousel';
import HeroCarousel from '../components/HeroCarousel';
import { useCart } from '../context/CartContext';

const RevealOnScroll = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
        >
            {children}
        </motion.div>
    );
};

const Home = () => {
    const { addToCart } = useCart();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const featured = [
        {
            name: "HIMALAYAN SPRING | 100 GM | FIRST FLUSH LOOSE BLACK TEA",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
            badge: false,
            stars: 4.5,
            reviews: 73,
            reviewDisplay: "(24)",
            price: "RS. 795.00"
        },
        {
            name: "SUMMER SOLSTICE MUSCATEL | 100 GM | SECOND FLUSH LOOSE BLACK TEA | TIN CADDY",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80",
            badge: true,
            stars: 4.5,
            reviews: 11,
            reviewDisplay: "(3)",
            price: "RS. 775.00"
        },
        {
            name: "SPRINGTIME BLOOM | 100 GM | FIRST FLUSH BLACK LOOSE TEA | TIN CADDY",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80",
            badge: true,
            stars: 4,
            reviews: 57,
            reviewDisplay: "(2)",
            price: "RS. 775.00"
        },
    ];

    const newArrivals = [
        {
            name: "SILVER TIPS IMPERIAL | 50 GM | MASCULINE MUSCATEL OOLONG",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80",
            badge: false,
            stars: 5,
            reviews: 12,
            reviewDisplay: "(12)",
            price: "RS. 1,250.00"
        },
        {
            name: "AUTUMNAL DEW | 100 GM | ROASTED AUTUMN FLUSH",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80",
            badge: false,
            stars: 4,
            reviews: 8,
            reviewDisplay: "(8)",
            price: "RS. 650.00"
        },
        {
            name: "MOONLIGHT PLUCK | 50 GM | RARE WHITE TEA",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80",
            badge: false,
            stars: 5,
            reviews: 34,
            reviewDisplay: "(34)",
            price: "RS. 2,100.00"
        },
        {
            name: "EMERALD GREEN | 100 GM | SPRING HARVEST GREEN TEA",
            brand: "MAKAIBARI TEA",
            image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
            badge: true,
            stars: 4.5,
            reviews: 42,
            reviewDisplay: "(42)",
            price: "RS. 550.00"
        },
    ];

    return (
        <div className="bg-cream">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-dark">
                <HeroCarousel yImage={yImage} yText={yText} opacity={opacity} />
            </section>

            {/* Philosophy Section */}
            <section className="py-32 px-6 bg-cream text-forest">
                <div className="max-w-4xl mx-auto text-center">
                    <RevealOnScroll>
                        <h2 className="font-heading text-4xl md:text-5xl mb-10">Our Philosophy</h2>
                        <p className="text-lg md:text-xl font-light leading-relaxed mb-16 opacity-80">
                            We believe every cup of tea holds a story—of the earth it grew in, the hands that crafted it, and the moment of pause it brings to your day. Sourced from the most pristine micro-climates, our teas are an invitation to slow down.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
                        {[
                            { icon: Droplets, title: "Pure Origins", desc: "Sourced directly from single estates untouched by industrial farming." },
                            { icon: Award, title: "Artisan Crafted", desc: "Hand-plucked and processed using centuries-old traditional methods." },
                            { icon: Utensils, title: "Mindful Ritual", desc: "Designed to elevate your daily routine into a grounding ceremony." }
                        ].map((item, i) => (
                            <RevealOnScroll key={i} delay={i * 0.2}>
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 bg-gold/5">
                                        <item.icon className="w-6 h-6 text-gold" strokeWidth={1} />
                                    </div>
                                    <h3 className="font-heading text-xl mb-3">{item.title}</h3>
                                    <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <section className="py-24 px-6 bg-ivory">
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-4xl md:text-5xl text-forest uppercase tracking-widest mb-4">Best Sellers</h2>
                            <p className="text-forest/70 font-sans text-sm md:text-base max-w-2xl mx-auto tracking-wide">
                                Fine teas crafted in harmony with nature, diligent nurture and cosmic energies of the moon and stars
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                        {featured.map((tea, i) => (
                            <RevealOnScroll key={i} delay={i * 0.15}>
                                <div className="group flex flex-col h-full">
                                    <div className="relative aspect-square md:aspect-[4/5] bg-beige mb-6 flex items-center justify-center overflow-hidden">
                                        <button className="absolute top-4 right-4 z-10 text-forest/40 hover:text-forest transition-colors">
                                            <Heart className="w-5 h-5" strokeWidth={1.5} />
                                        </button>
                                        <Link to="/collection" className="w-full h-full block md:p-4">
                                            <img
                                                src={tea.image}
                                                alt={tea.name}
                                                className="w-full h-full object-cover md:object-contain transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out md:mix-blend-multiply"
                                            />
                                        </Link>
                                    </div>

                                    <div className="flex flex-col flex-grow text-center px-1">
                                        <h4 className="text-[11px] uppercase tracking-[0.1em] text-forest/50 mb-3 text-left font-medium">{tea.brand}</h4>
                                        <div className="w-full h-[1px] bg-forest/10 mb-5"></div>

                                        <Link to="/collection" className="flex-grow">
                                            <h3 className="font-sans text-[11px] md:text-[13px] uppercase tracking-[0.15em] text-forest/80 leading-[1.8] mb-4 group-hover:text-gold transition-colors line-clamp-3 md:min-h-[70px]">
                                                {tea.name}
                                            </h3>
                                        </Link>

                                        <div className="flex flex-col items-center justify-center gap-1.5 mb-5 w-full">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star
                                                            key={index}
                                                            className={`w-3.5 h-3.5 ${index < Math.floor(tea.stars) ? 'text-gold fill-gold' : 'text-gray-300 fill-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[11px] text-forest/60 tracking-widest font-sans uppercase">{tea.reviews} Reviews</span>
                                            </div>
                                        </div>

                                        <p className="text-[13px] tracking-[0.15em] text-forest/80 mb-6 font-sans mt-auto">{tea.price}</p>

                                        <button onClick={() => addToCart(tea)} className="cursor-pointer w-full py-3 bg-[#C2B280] text-dark hover:bg-[#A8986B] transition-colors text-xs uppercase tracking-[0.2em] font-medium border border-transparent hover:border-dark/10">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section >

            {/* New Arrivals */}
            < section className="py-24 px-6 bg-cream border-t border-forest/5" >
                <div className="max-w-7xl mx-auto">
                    <RevealOnScroll>
                        <div className="text-center mb-16">
                            <h2 className="font-heading text-4xl md:text-5xl text-forest uppercase tracking-widest mb-4">New Arrivals</h2>
                            <p className="text-forest/70 font-sans text-sm md:text-base max-w-2xl mx-auto tracking-wide">
                                Discover the freshest seasonal harvests, directly from our mist-kissed estates to your cup
                            </p>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {newArrivals.map((tea, i) => (
                            <RevealOnScroll key={`new-${i}`} delay={i * 0.15}>
                                <div className="group flex flex-col h-full">
                                    <div className="relative aspect-square md:aspect-[4/5] bg-beige mb-6 flex items-center justify-center overflow-hidden">

                                        <button className="absolute top-4 right-4 z-10 text-forest/40 hover:text-forest transition-colors">
                                            <Heart className="w-5 h-5" strokeWidth={1.5} />
                                        </button>
                                        <Link to="/collection" className="w-full h-full block md:p-4">
                                            <img
                                                src={tea.image}
                                                alt={tea.name}
                                                className="w-full h-full object-cover md:object-contain transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out md:mix-blend-multiply"
                                            />
                                        </Link>
                                    </div>

                                    <div className="flex flex-col flex-grow text-center px-1">
                                        <h4 className="text-[11px] uppercase tracking-[0.1em] text-forest/50 mb-3 text-left font-medium">{tea.brand}</h4>
                                        <div className="w-full h-[1px] bg-forest/10 mb-5"></div>

                                        <Link to="/collection" className="flex-grow">
                                            <h3 className="font-sans text-[11px] md:text-[13px] uppercase tracking-[0.15em] text-forest/80 leading-[1.8] mb-4 group-hover:text-gold transition-colors line-clamp-3 md:min-h-[70px]">
                                                {tea.name}
                                            </h3>
                                        </Link>

                                        <div className="flex flex-col items-center justify-center gap-1.5 mb-5 w-full">
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, index) => (
                                                        <Star
                                                            key={`star-${index}`}
                                                            className={`w-3.5 h-3.5 ${index < Math.floor(tea.stars) ? 'text-gold fill-gold' : 'text-gray-300 fill-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-[11px] text-forest/60 tracking-widest font-sans">{tea.reviewDisplay}</span>
                                            </div>
                                        </div>

                                        <p className="text-[13px] tracking-[0.15em] text-forest/80 mb-6 font-sans mt-auto">{tea.price}</p>

                                        <button onClick={() => addToCart(tea)} className="cursor-pointer w-full py-3 bg-[#C2B280] text-dark hover:bg-[#A8986B] transition-colors text-xs uppercase tracking-[0.2em] font-medium border border-transparent hover:border-dark/10">
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </section >

            {/* Gallery - Reels Carousel */}
            < section className="py-24 bg-cream overflow-hidden" >
                <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                    <RevealOnScroll>
                        <h2 className="font-heading text-3xl text-forest mb-4">Follow The Journey</h2>
                        <p className="text-forest/60 text-sm uppercase tracking-widest">@kototea</p>
                    </RevealOnScroll>
                </div>

                <ReelsCarousel />
            </section >
        </div >
    );
};

export default Home;
