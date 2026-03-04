import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const navigate = useNavigate();

    // Prevent propagation when clicking inside the cart panel
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-dark/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Cart Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4 }}
                        onClick={stopPropagation}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-cream shadow-2xl z-[70] flex flex-col pt-safe"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-dark/10">
                            <h2 className="font-heading text-2xl text-dark">Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors text-dark">
                                <X strokeWidth={1.5} className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-dark/50 gap-4">
                                    <ShoppingBag strokeWidth={1} className="w-16 h-16" />
                                    <p className="font-sans uppercase tracking-widest text-sm">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="cursor-pointer mt-4 px-8 py-3 bg-[#C2B280] text-dark uppercase tracking-[0.2em] text-xs font-medium hover:bg-[#A8986B] transition-colors border border-transparent hover:border-dark/10"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map(item => (
                                    <div key={item._id} className="flex gap-4 border-b border-dark/5 pb-6">
                                        <div className="w-24 h-24 bg-beige flex-shrink-0 relative overflow-hidden">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col flex-grow text-dark">
                                            <h3 className="text-[11px] font-medium uppercase tracking-[0.1em] line-clamp-2 leading-relaxed mb-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-dark/70 text-sm mb-3">
                                                {typeof item.price === 'string' ? item.price : `RS. ${item.price}`}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center border border-dark/20 text-dark">
                                                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1.5 px-3 hover:bg-dark/5 transition-colors"><Minus strokeWidth={1.5} className="w-3 h-3" /></button>
                                                    <span className="text-xs px-2 w-6 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1.5 px-3 hover:bg-dark/5 transition-colors"><Plus strokeWidth={1.5} className="w-3 h-3" /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item._id)} className="text-[10px] uppercase tracking-widest text-dark/40 hover:text-dark transition-colors underline underline-offset-4 pointer-cursor">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-dark/10 bg-ivory">
                                <div className="flex justify-between items-center mb-6 text-dark font-heading text-xl">
                                    <span>Subtotal</span>
                                    <span>RS. {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsCartOpen(false);
                                        navigate('/checkout');
                                    }}
                                    className="cursor-pointer w-full py-4 bg-[#C2B280] text-dark hover:bg-[#A8986B] transition-colors text-sm uppercase tracking-[0.2em] font-medium border border-transparent hover:border-dark/10 flex justify-center items-center gap-2"
                                >
                                    Checkout
                                </button>
                                <p className="text-center text-[10px] text-dark/50 mt-4 uppercase tracking-[0.15em]">Shipping & taxes calculated at checkout</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
