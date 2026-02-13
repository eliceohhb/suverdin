import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo-suverdin.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { totalItems } = useCart();

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        const handleScroll = () => setScrolled(window.scrollY > 50);

        checkMobile();
        handleScroll();

        window.addEventListener('resize', checkMobile);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <header
            className={`site-header ${scrolled ? 'floating-luxury-navbar' : ''}`}
            style={{
                position: 'fixed',
                top: isMobile ? (scrolled ? '0.5rem' : '0') : (scrolled ? '1rem' : '0'),
                left: '50%',
                transform: 'translateX(-50%)',
                width: isMobile ? 'calc(100% - 1rem)' : (scrolled ? 'auto' : '100%'),
                maxWidth: 'var(--container-max)',
                zIndex: 100,
                padding: isMobile ? '0.8rem 1.5rem' : (scrolled ? '1rem 3rem' : '2.5rem 4rem'),
                transition: 'all 0.5s cubic-bezier(0.2, 0, 0, 1)',
                background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderRadius: scrolled ? (isMobile ? '12px' : '100px') : '0',
                boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.05)' : 'none',
                border: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
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
                        textDecoration: 'none',
                        flexShrink: 0
                    }}
                >
                    <img
                        src={logo}
                        alt="Suverdin"
                        style={{
                            height: isMobile ? '45px' : '55px',
                            width: 'auto',
                            display: 'block'
                        }}
                    />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    {[
                        { name: 'Inicio', path: '/' },
                        { name: 'Productos', path: '/#catalog' },
                        { name: 'Contacto', path: '/contacto' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={(e) => {
                                if (item.name === 'Inicio' && window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else if (item.name === 'Productos') {
                                    if (window.location.pathname === '/') {
                                        e.preventDefault();
                                        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }
                            }}
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
                            {item.name}
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
                        {[
                            { name: 'Inicio', path: '/' },
                            { name: 'Productos', path: '/#catalog' },
                            { name: 'Contacto', path: '/contacto' }
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={(e) => {
                                    closeMenu();
                                    if (item.name === 'Inicio' && window.location.pathname === '/') {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    } else if (item.name === 'Productos') {
                                        if (window.location.pathname === '/') {
                                            e.preventDefault();
                                            document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }}
                                style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}
                            >
                                {item.name}
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
