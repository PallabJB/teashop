import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
    const scrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
    const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div className="bg-cream pt-32 pb-24">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-32">
                <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="uppercase tracking-[0.3em] text-sm text-gold font-sans mb-4 block"
                >
                    Our Heritage
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="font-heading text-5xl md:text-7xl text-forest mb-8"
                >
                    A Legacy Rooted in <br />Nature & Craft
                </motion.h1>
            </div>

            {/* Story section 1 */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center mb-40">
                <motion.div style={{ y: y1 }} ref={scrollRef} className="aspect-[3/4] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80"
                        alt="Tea farmer"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="font-heading text-4xl text-forest mb-8">Sourcing the Extraordinary</h2>
                    <p className="text-forest/80 text-lg leading-relaxed mb-6 font-light">
                        Our journey begins in the mist-shrouded peaks of ancient mountains. We partner exclusively with generations-old family farms dedicated to preserving biodiversity and traditional farming methods.
                    </p>
                    <p className="text-forest/80 text-lg leading-relaxed font-light">
                        Every leaf is a testament to the terroir—the unique combination of soil, altitude, and climate—and the meticulous care of those who cultivate it.
                    </p>
                </motion.div>
            </div>

            {/* Story section 2 */}
            <div className="bg-forest text-cream py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="order-2 md:order-1 flex flex-col justify-center"
                    >
                        <h2 className="font-heading text-4xl text-gold mb-8">The Art of Craftsmanship</h2>
                        <p className="text-cream/80 text-lg leading-relaxed mb-6 font-light">
                            We reject industrial shortcuts. Our teas are predominantly processed by hand, utilizing techniques perfected over centuries: wilting under the sun, gentle rolling on bamboo trays, and masterful roasting over charcoal.
                        </p>
                        <p className="text-cream/80 text-lg leading-relaxed font-light">
                            This labor-intensive artistry awakens the dormant aromas within the leaves, producing a complexity that cannot be replicated by machinery.
                        </p>
                    </motion.div>

                    <div className="order-1 md:order-2 aspect-[4/3] overflow-hidden bg-[#C2B280]">
                        <img
                            src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80"
                            alt="Tea craftsmanship"
                            className="w-full h-full object-cover opacity-80"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
