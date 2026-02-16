import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo-suverdin.png';

const Hero = () => {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const bgY = useTransform(scrollY, [0, 800], isMobile ? [0, 0] : [0, 300]);
    const contentY = useTransform(scrollY, [0, 800], isMobile ? [0, 0] : [0, -120]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], isMobile ? [1, 1] : [1, 1.15]);

    return (
        <section style={{
            position: 'relative',
            minHeight: '100svh',
            height: 'auto',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)',
            color: 'var(--primary)'
        }}>
            {/* Parallax Background */}
            <motion.div style={{ y: bgY, scale, position: 'absolute', inset: 0, zIndex: 0 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key="hero-media"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        <motion.div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage: 'url(https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(to bottom, rgba(45,36,30,0.4) 0%, rgba(253,251,247,1) 95%)'
                        }} />
                    </motion.div>
                </AnimatePresence>

                {/* Decorative Elements */}
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 20 }}
                    style={{
                        position: 'absolute', top: '10%', right: '5%',
                        width: '30vw', height: '30vw',
                        background: 'var(--accent1)', filter: 'blur(100px)',
                        opacity: 0.2, borderRadius: '50%', zIndex: 1,
                        willChange: 'transform'
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div style={{ y: contentY, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem', maxWidth: '1000px', willChange: 'transform, opacity' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <img
                        src={logo}
                        alt="Suverdin"
                        style={{ height: isMobile ? '100px' : '180px', width: 'auto' }}
                    />
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem',
                        letterSpacing: '0.5em',
                        color: 'rgba(255,255,255,0.9)',
                        textTransform: 'uppercase',
                        marginBottom: '1rem',
                        display: 'block'
                    }}
                >
                    Artesanía Chilena
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="hero-title"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3rem, 10vw, 7rem)',
                        fontWeight: 400,
                        lineHeight: 0.9,
                        color: 'white',
                        marginBottom: '3rem',
                        letterSpacing: '-0.04em',
                        fontStyle: 'italic'
                    }}
                >
                    <span style={{ fontStyle: 'normal', color: 'var(--background)' }}>Modern Handcrafted</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <button
                        className="btn"
                        onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            background: 'white',
                            color: 'var(--charcoal)',
                            borderRadius: '0',
                            fontSize: '0.9rem',
                            padding: '1.4rem 3.5rem',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            border: 'none',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Ver Colección
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
            >
                <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, white, transparent)' }} />
            </motion.div>
        </section>
    );
};

export default Hero;
