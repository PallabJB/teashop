import { Leaf, Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#00FFFF] text-dark py-8 px-6 md:px-12 border-t border-dark/10 relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-4 text-dark">
                        <Leaf strokeWidth={1.5} className="w-6 h-6 text-dark" />
                        <span className="font-heading text-2xl tracking-widest uppercase">Koto</span>
                    </Link>
                    <p className="text-dark/70 text-sm font-sans leading-relaxed">
                        Cultivating the finest single-origin teas through generations of craftsmanship and harmony with nature.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-heading text-dark mb-4 uppercase tracking-widest text-sm font-bold">Explore</h4>
                    <ul className="space-y-3 text-sm text-dark/80">
                        <li><Link to="/collection" className="hover:text-black transition-colors">Shop All Teas</Link></li>
                        <li><Link to="/about" className="hover:text-black transition-colors">Our Story</Link></li>
                        <li><Link to="/contact" className="hover:text-black transition-colors">Brewing Guide</Link></li>
                        <li><Link to="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Policies */}
                <div>
                    <h4 className="font-heading text-dark mb-4 uppercase tracking-widest text-sm font-bold">Help</h4>
                    <ul className="space-y-3 text-sm text-dark/80">
                        <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-heading text-dark mb-4 uppercase tracking-widest text-sm font-bold">Newsletter</h4>
                    <p className="text-dark/70 text-sm mb-4">Subscribe to receive updates, access to exclusive blends, and more.</p>
                    <form className="flex border-b border-dark/30 focus-within:border-dark transition-colors">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent border-none outline-none py-1 text-sm w-full text-dark placeholder:text-dark/40"
                        />
                        <button type="submit" className="text-dark font-bold text-sm tracking-widest uppercase hover:text-black transition-colors">Subscribe</button>
                    </form>

                    <div className="flex gap-4 mt-6">
                        <a href="#" className="text-dark/60 hover:text-black transition-colors"><Instagram strokeWidth={1.5} className="w-5 h-5" /></a>
                        <a href="#" className="text-dark/60 hover:text-black transition-colors"><Twitter strokeWidth={1.5} className="w-5 h-5" /></a>
                        <a href="#" className="text-dark/60 hover:text-black transition-colors"><Facebook strokeWidth={1.5} className="w-5 h-5" /></a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-dark/10 text-center text-xs text-dark/60 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Koto Tea. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
