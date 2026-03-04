import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Plus, Minus } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate order API processing
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            clearCart();

            // Redirect after showing success for a bit
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="bg-cream min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <CheckCircle className="w-24 h-24 text-[#C2B280] mx-auto mb-6" />
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl text-forest mb-4"
                >
                    Order Confirmed
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-forest/70 max-w-md mx-auto"
                >
                    Thank you for your purchase. We are preparing your tea for its journey. You will be redirected shortly...
                </motion.p>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="bg-cream min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
                <h1 className="font-heading text-4xl text-forest mb-6">Your cart is empty</h1>
                <p className="text-forest/70 mb-8">It seems you haven't selected any teas yet.</p>
                <button
                    onClick={() => navigate('/collection')}
                    className="cursor-pointer bg-[#C2B280] text-dark px-10 py-3 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#A8986B] transition-colors"
                >
                    Explore Collection
                </button>
            </div>
        );
    }

    return (
        <div className="bg-cream min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <h1 className="font-heading text-4xl md:text-5xl text-forest">Checkout</h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Form Section */}
                    <div className="lg:col-span-7 space-y-12">
                        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
                            {/* Contact Information */}
                            <section>
                                <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Email Address *</label>
                                        <input required type="email" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Phone Number *</label>
                                        <input required type="tel" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section>
                                <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">First Name *</label>
                                        <input required type="text" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Last Name *</label>
                                        <input required type="text" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                    <div className="flex flex-col md:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Street Address *</label>
                                        <input required type="text" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">City *</label>
                                        <input required type="text" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Postal Code *</label>
                                        <input required type="text" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#C2B280] transition-colors text-forest" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section>
                                <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Payment Method</h2>
                                <div className="space-y-4">
                                    <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#C2B280] bg-[#C2B280]/5' : 'border-forest/20 bg-transparent'}`}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="accent-[#C2B280]"
                                            />
                                            <span className="font-medium text-forest">Credit Card</span>
                                        </div>
                                    </label>

                                    {paymentMethod === 'card' && (
                                        <div className="p-4 border border-t-0 border-forest/20 bg-white/30 space-y-4">
                                            <div className="flex flex-col">
                                                <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">Card Number *</label>
                                                <input required type="text" placeholder="0000 0000 0000 0000" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#C2B280] text-sm text-forest" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">Expiration Date (MM/YY) *</label>
                                                    <input required type="text" placeholder="MM/YY" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#C2B280] text-sm text-forest" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">CVC *</label>
                                                    <input required type="text" placeholder="123" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#C2B280] text-sm text-forest" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#C2B280] bg-[#C2B280]/5' : 'border-forest/20 bg-transparent'}`}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="accent-[#C2B280]"
                                            />
                                            <span className="font-medium text-forest">Cash on Delivery</span>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="cursor-pointer w-full bg-[#C2B280] text-dark py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#A8986B] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? "Processing..." : "Place Order"}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-5">
                        <div className="bg-white/50 border border-forest/10 p-6 md:p-8 sticky top-32">
                            <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map(item => (
                                    <div key={item._id} className="flex gap-4 pb-4 border-b border-forest/5 last:border-0 last:pb-0">
                                        <div className="w-20 h-20 bg-beige flex-shrink-0 relative">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow flex flex-col pt-1">
                                            <div className="flex justify-between items-start mb-2 gap-2">
                                                <h3 className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-forest flex-grow leading-relaxed">
                                                    {item.name}
                                                </h3>
                                                <p className="text-forest text-xs md:text-sm whitespace-nowrap mt-0.5">
                                                    RS. {((String(item.price).replace(/,/g, '').match(/\d+(\.\d+)?/) ? parseFloat(String(item.price).replace(/,/g, '').match(/\d+(\.\d+)?/)[0]) : 0) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center border border-forest/20 text-forest/80">
                                                    <button type="button" onClick={() => updateQuantity(item._id, item.quantity - 1)} className="p-1 px-2 hover:bg-forest/5 transition-colors cursor-pointer"><Minus strokeWidth={1.5} className="w-3 h-3" /></button>
                                                    <span className="text-[10px] md:text-xs px-2 w-6 text-center">{item.quantity}</span>
                                                    <button type="button" onClick={() => updateQuantity(item._id, item.quantity + 1)} className="p-1 px-2 hover:bg-forest/5 transition-colors cursor-pointer"><Plus strokeWidth={1.5} className="w-3 h-3" /></button>
                                                </div>
                                                <button type="button" onClick={() => removeFromCart(item._id)} className="text-[9px] md:text-[10px] uppercase tracking-widest text-forest/40 hover:text-forest transition-colors underline underline-offset-4 cursor-pointer">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-forest/10 text-sm text-forest/80">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>RS. {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>Calculated next</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-forest/20 text-forest font-heading text-xl">
                                <span>Total</span>
                                <span>RS. {cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
