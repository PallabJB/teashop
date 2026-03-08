import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Plus, Minus } from 'lucide-react';

const Checkout = () => {
    const { cart, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');

    const handleExpiryChange = (e) => {
        let inputVal = e.target.value;
        if (inputVal.length === expiryDate.length - 1 && expiryDate.endsWith('/')) {
            inputVal = inputVal.slice(0, -1);
        }
        let digits = inputVal.replace(/\D/g, '').slice(0, 4);

        if (digits.length > 2) {
            setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`);
        } else if (digits.length === 2 && inputVal.length > expiryDate.length) {
            setExpiryDate(`${digits}/`);
        } else {
            setExpiryDate(digits);
        }
    };

    const handleCvcChange = (e) => {
        setCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
    };

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



    if (cart.length === 0 && !isSuccess) {
        return (
            <div className="bg-cream min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
                <h1 className="font-heading text-4xl text-forest mb-6">Your cart is empty</h1>
                <p className="text-forest/70 mb-8">It seems you haven't selected any teas yet.</p>
                <button
                    onClick={() => navigate('/collection')}
                    className="cursor-pointer bg-[#87CEEB] text-dark px-10 py-3 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#4682B4] transition-colors"
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
                                        <input required type="email" onInput={(e) => e.target.value = e.target.value.toLowerCase()} pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" title="Please enter a valid email address (e.g. user@domain.com)" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="your@email.com" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Phone Number *</label>
                                        <input required type="tel" pattern="[0-9]{10}" maxLength="10" title="Please enter exactly 10 digits without spaces or dashes" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="1234567890" />
                                    </div>
                                </div>
                            </section>

                            {/* Shipping Address */}
                            <section>
                                <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Shipping Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">First Name *</label>
                                        <input required type="text" pattern="[A-Za-z\s\-]{2,50}" title="Must be at least 2 characters and contain only letters" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="Jane" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Last Name *</label>
                                        <input required type="text" pattern="[A-Za-z\s\-]{2,50}" title="Must be at least 2 characters and contain only letters" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="Doe" />
                                    </div>
                                    <div className="flex flex-col md:col-span-2">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Street Address *</label>
                                        <input required type="text" minLength="5" title="Please enter a full street address" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="123 Tea Garden Blvd" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">City *</label>
                                        <input required type="text" pattern="[A-Za-z\s\-]{2,50}" title="City must contain only letters" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="Assam" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-xs uppercase tracking-widest text-forest/70 mb-2">Postal Code *</label>
                                        <input required type="text" pattern="[0-9]{6}" maxLength="6" title="Please enter exactly 6 digits" className="bg-transparent border border-forest/20 p-3 outline-none focus:border-[#87CEEB] transition-colors text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" placeholder="123456" />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section>
                                <h2 className="font-heading text-2xl text-forest mb-6 pb-2 border-b border-forest/10">Payment Method</h2>
                                <div className="space-y-4">
                                    <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-[#87CEEB] bg-[#87CEEB]/5' : 'border-forest/20 bg-transparent'}`}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="accent-[#87CEEB]"
                                            />
                                            <span className="font-medium text-forest">Credit Card</span>
                                        </div>
                                    </label>

                                    {paymentMethod === 'card' && (
                                        <div className="p-4 border border-t-0 border-forest/20 bg-white/30 space-y-4">
                                            <div className="flex flex-col">
                                                <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">Card Number *</label>
                                                <input required type="text" pattern="[0-9]{16}" maxLength="16" title="Please enter exactly 16 digits without spaces" placeholder="0000111122223333" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#87CEEB] text-sm text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">Expiration Date (MM/YY) *</label>
                                                    <input required type="text" value={expiryDate} onChange={handleExpiryChange} pattern="(0[1-9]|1[0-2])\/[0-9]{2}" maxLength="5" title="Please enter a valid date in MM/YY format" placeholder="MM/YY" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#87CEEB] text-sm text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] uppercase tracking-widest text-forest/70 mb-1">CVC *</label>
                                                    <input required type="text" value={cvc} onChange={handleCvcChange} pattern="[0-9]{3,4}" maxLength="4" title="Please enter exactly 3 or 4 digits" placeholder="123" className="bg-white border border-forest/10 p-2 outline-none focus:border-[#87CEEB] text-sm text-forest invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 invalid:[&:not(:placeholder-shown):not(:focus)]:text-red-600" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <label className={`block border p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-[#87CEEB] bg-[#87CEEB]/5' : 'border-forest/20 bg-transparent'}`}>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                value="cod"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="accent-[#87CEEB]"
                                            />
                                            <span className="font-medium text-forest">Cash on Delivery</span>
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="cursor-pointer w-full bg-[#87CEEB] text-dark py-4 uppercase tracking-[0.2em] text-sm font-medium hover:bg-[#4682B4] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {/* Success Popup Modal */}
            <AnimatePresence>
                {isSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="bg-cream p-10 max-w-md w-full text-center border border-[#87CEEB]/30 shadow-2xl relative overflow-hidden"
                            style={{ transformPerspective: 1000 }}
                        >
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#87CEEB]/20 rounded-full blur-2xl"></div>

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>

                            <h3 className="font-heading text-3xl text-forest mb-4">Order Placed!</h3>
                            <p className="text-forest/70 font-light leading-relaxed mb-8">
                                Thank you for your purchase. Your tea is being prepared for its journey. You will be redirected shortly...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;
