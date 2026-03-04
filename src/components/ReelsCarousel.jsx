import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

const reels = [
    {
        id: 1,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80",
        text: "KOTO'S FINEST LEAVES ARE PLUCKED",
    },
    {
        id: 2,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80",
        text: "MIST-KISSED MOUNTAIN PEAKS",
    },
    {
        id: 3,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        poster: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&q=80",
        text: "CENTURIES OF CRAFTSMANSHIP",
    },
    {
        id: 4,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        poster: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80",
        text: "THE PERFECT INFUSION",
    },
    {
        id: 5,
        video: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        poster: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80",
        text: "A GROUNDING CEREMONY",
    }
];

const ReelsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(2);
    const [isMuted, setIsMuted] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % reels.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reels.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    const getLayout = (relativeIndex) => {
        const isMobile = windowWidth < 768;
        const xOffset = isMobile ? 220 : 300;

        if (relativeIndex === 0) {
            return { scale: 1, x: 0, zIndex: 30, brightness: 1, opacity: 1 };
        } else if (relativeIndex === 1) {
            return { scale: 0.85, x: xOffset, zIndex: 20, brightness: 0.6, opacity: 1 };
        } else if (relativeIndex === -1) {
            return { scale: 0.85, x: -xOffset, zIndex: 20, brightness: 0.6, opacity: 1 };
        } else if (relativeIndex === 2) {
            return { scale: 0.7, x: xOffset * 1.8, zIndex: 10, brightness: 0.3, opacity: isMobile ? 0 : 1 };
        } else if (relativeIndex === -2) {
            return { scale: 0.7, x: -xOffset * 1.8, zIndex: 10, brightness: 0.3, opacity: isMobile ? 0 : 1 };
        } else {
            return { scale: 0.5, x: 0, zIndex: 0, brightness: 0, opacity: 0 };
        }
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
            {reels.map((reel, index) => {
                let relativeIndex = index - currentIndex;
                // Handle circular wrapping for 5 items
                if (relativeIndex > 2) relativeIndex -= reels.length;
                if (relativeIndex < -2) relativeIndex += reels.length;

                const layout = getLayout(relativeIndex);
                const isActive = relativeIndex === 0;

                return (
                    <motion.div
                        key={reel.id}
                        initial={false}
                        animate={{
                            scale: layout.scale,
                            x: layout.x,
                            zIndex: layout.zIndex,
                            opacity: layout.opacity,
                            filter: `brightness(${layout.brightness})`
                        }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute w-[260px] md:w-[320px] h-[450px] md:h-[550px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl bg-forest-dark"
                        onClick={() => {
                            if (!isActive) setCurrentIndex(index);
                        }}
                    >
                        <video
                            src={reel.video}
                            poster={reel.poster}
                            autoPlay={isActive}
                            loop
                            muted={isMuted}
                            playsInline
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/70 pointer-events-none" />

                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
                            >
                                <h3 className="text-white font-sans text-xl md:text-2xl uppercase tracking-[0.2em] font-medium leading-relaxed drop-shadow-lg">
                                    {reel.text}
                                </h3>
                            </motion.div>
                        )}

                        <button
                            onClick={toggleMute}
                            className={`absolute bottom-4 right-4 p-2.5 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors ${!isActive && 'hidden'}`}
                        >
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                    </motion.div>
                );
            })}

            {/* Navigation Overlays */}
            <button
                onClick={handlePrev}
                className="absolute left-4 md:left-12 z-40 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-white transition-all transform hover:scale-105"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 md:right-12 z-40 p-3 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full text-white transition-all transform hover:scale-105"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ReelsCarousel;
