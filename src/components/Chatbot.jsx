import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Sparkles } from 'lucide-react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', content: "Welcome to Koto. I am your personal tea sommelier. How may I guide your sensory journey today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await response.json();
            setMessages(prev => [...prev, data]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Pardon me, my senses seem momentarily clouded. Please try again shortly." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer fixed bottom-6 right-6 z-50 p-4 bg-[#C2B280] text-dark rounded-full shadow-2xl border border-dark/10 hover:bg-[#A8986B] transition-colors"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquare strokeWidth={1.5} className="w-6 h-6" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] z-50 glass flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-white/40"
                    >
                        {/* Header */}
                        <div className="bg-forest text-cream p-4 flex justify-between items-center border-b border-gold/20">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-gold" />
                                <h3 className="font-heading tracking-wider">AI Sommelier</h3>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-cream/70 hover:text-cream transition-colors">
                                <X strokeWidth={1.5} className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow p-4 overflow-y-auto bg-cream/50 flex flex-col gap-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-gold text-forest rounded-br-sm self-end'
                                        : 'bg-white border border-gray-100 text-forest rounded-bl-sm self-start shadow-sm'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="bg-white border border-gray-100 text-forest p-3 rounded-2xl rounded-bl-sm self-start w-fit shadow-sm">
                                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about our teas..."
                                className="flex-grow bg-cream/50 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="p-2 bg-forest text-gold rounded-full hover:bg-forest-dark transition-colors disabled:opacity-50"
                            >
                                <Send strokeWidth={1.5} className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
