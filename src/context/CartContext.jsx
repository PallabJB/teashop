import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('koto-cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('koto-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id || item.name === product.name);
            if (existing) {
                return prev.map(item =>
                    (item._id === product._id || item.name === product.name)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1, _id: product._id || Math.random().toString() }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart(prev => prev.map(item =>
            item._id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => {
        if (!item.price) return total;
        const priceStr = String(item.price);
        // Fix parsing for 'RS.' and commas
        const match = priceStr.replace(/,/g, '').match(/\d+(\.\d+)?/);
        const parsedPrice = match ? parseFloat(match[0]) : 0;
        const quantity = parseInt(item.quantity) || 1;
        return total + (parsedPrice * quantity);
    }, 0);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            cartTotal, cartCount, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};
