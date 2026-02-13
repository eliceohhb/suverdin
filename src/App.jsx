import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import ContactHub from './components/ContactHub';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
    return (
        <CartProvider>
            <Router basename="/suverdin">
                <ScrollToTop />
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/producto/:id" element={<ProductDetail />} />
                        <Route path="/carrito" element={<Checkout />} />
                        <Route path="/contacto" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </CartProvider>
    );
}

export default App;
