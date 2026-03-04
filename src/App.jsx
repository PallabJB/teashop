import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Cart from './components/Cart';

// Context
import { CartProvider } from './context/CartContext';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import TeaDetail from './pages/TeaDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pb-16">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/tea/:id" element={<TeaDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <Chatbot />
          <Cart />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
