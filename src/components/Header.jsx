import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <header
            className={`site-header ${scrolled ? 'floating-colorful-navbar' : ''}`}
            style={{
                position: 'fixed',
                top: scrolled ? '1.5rem' : '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: scrolled ? 'auto' : '100%',
                maxWidth: 'var(--container-max)',
                zIndex: 100,
                padding: scrolled ? '0.75rem 2rem' : '2rem 3rem',
                transition: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
                background: scrolled ? '' : 'transparent',
                backdropFilter: scrolled ? '' : 'none',
                borderRadius: scrolled ? '100px' : '0',
                boxShadow: scrolled ? '' : 'none',
                border: scrolled ? '' : 'none',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '3rem', padding: '0' }}>

                {/* Logo Section */}
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textDecoration: 'none'
                    }}
                >
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--vibrant-gradient)',
                        borderRadius: 'var(--radius-organic)',
                        boxShadow: '0 4px 15px rgba(209,108,77,0.3)'
                    }}></div>
                    <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.4rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--primary)',
                        textTransform: 'uppercase',
                        display: scrolled ? 'none' : 'block'
                    }}>
                        SUVERDIN
                    </span>
                </Link>

                {/* Navigation - Desktop */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    {['Inicio', 'Productos', 'Contacto'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Inicio' ? '/' : item === 'Productos' ? '/#catalog' : '/contacto'}
                            className="nav-link"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                color: 'var(--primary)',
                                opacity: 0.7,
                                transition: 'all 0.3s',
                                textDecoration: 'none',
                                position: 'relative'
                            }}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Link to="/carrito" className="cart-link" style={{ position: 'relative', display: 'flex', color: 'var(--primary)', transition: 'transform 0.3s' }}>
                        <ShoppingBag size={22} strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    background: 'var(--vibrant-gradient)',
                                    color: 'white',
                                    fontSize: '0.65rem',
                                    fontWeight: 700,
                                    width: 18,
                                    height: 18,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 10px rgba(209,108,77,0.3)'
                                }}
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </Link>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ display: 'none', color: 'var(--primary)', background: 'transparent', border: 'none' }}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 1rem)',
                            left: 0,
                            right: 0,
                            padding: '2rem',
                            background: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}
                    >
                        {['Inicio', 'Productos', 'Contacto'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Inicio' ? '/' : item === 'Productos' ? '/#catalog' : '/contacto'}
                                onClick={closeMenu}
                                style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
                            >
                                {item}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .desktop-nav { display: none !important; }
                    .mobile-menu-btn { display: block !important; }
                }
                .nav-link:hover {
                    opacity: 1 !important;
                    color: var(--secondary) !important;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--vibrant-gradient);
                    transition: width 0.3s;
                }
                .nav-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </header>
    );
};

export default Header;
