import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 800], [0, 300]);
    const contentY = useTransform(scrollY, [0, 800], [0, -120]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.15]);

    return (
        <section style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background)',
            color: 'var(--primary)'
        }}>
            {/* Parallax Background with Dynamic Media */}
            <motion.div style={{ y: bgY, scale, position: 'absolute', inset: 0, zIndex: 0 }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key="hero-media"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ position: 'absolute', inset: 0 }}
                    >
                        {/* Video Background (Preferred) */}
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="https://images.unsplash.com/photo-1541123303124-b1f427c3ec1e?auto=format&fit=crop&q=80&w=2000"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-carpenter-measuring-and-signing-a-design-41664-large.mp4" type="video/mp4" />
                        </video>

                        {/* Artistic Overlays */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(to bottom, rgba(58,47,42,0.5), rgba(224,122,95,0.2), var(--background))',
                            zIndex: 1
                        }} />
                    </motion.div>
                </AnimatePresence>

                {/* Dynamic Color Blobs for "Artsy" feel */}
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 20 }}
                    style={{
                        position: 'absolute', top: '10%', right: '5%',
                        width: '30vw', height: '30vw',
                        background: 'var(--accent1)', filter: 'blur(60px)', /* Reduced blur */
                        opacity: 0.15, borderRadius: '50%', zIndex: 1,
                        willChange: 'transform'
                    }}
                />
                <motion.div
                    animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
                    transition={{ repeat: Infinity, duration: 25 }}
                    style={{
                        position: 'absolute', bottom: '20%', left: '10%',
                        width: '25vw', height: '25vw',
                        background: 'var(--accent3)', filter: 'blur(80px)', /* Reduced blur */
                        opacity: 0.1, borderRadius: '50%', zIndex: 1,
                        willChange: 'transform'
                    }}
                />
            </motion.div>

            {/* Content */}
            <motion.div style={{ y: contentY, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem', maxWidth: '1000px', willChange: 'transform, opacity' }}>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="section-label"
                    style={{
                        display: 'inline-block',
                        marginBottom: '1.5rem',
                        color: 'var(--secondary)',
                        background: 'white',
                        padding: '0.6rem 2rem',
                        borderRadius: '2rem',
                        fontWeight: 800,
                        letterSpacing: '0.1em',
                        boxShadow: '0 10px 30px rgba(160, 92, 59, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    ARTE · NATURALEZA · DISEÑO
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.2, 0, 0, 1] }}
                    className="hero-title"
                    style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                        fontWeight: 900,
                        lineHeight: 0.85,
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.05em',
                        textShadow: '4px 4px 0px rgba(160, 92, 59, 0.05)'
                    }}
                >
                    Muebles con <br />
                    <span className="gradient-text-shadow">
                        Alma y Color
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        color: 'var(--text-primary)',
                        fontWeight: 600,
                        maxWidth: '700px',
                        margin: '0 auto 4rem',
                        lineHeight: 1.3,
                        opacity: 0.9,
                        textShadow: '0 2px 20px rgba(255,248,240,0.8)'
                    }}
                >
                    Piezas únicas que cuentan historias a través de la madera y el pigmento.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{
                            padding: '1.75rem 5rem',
                            fontSize: '1.1rem',
                            background: 'var(--vibrant-gradient)',
                            border: 'none',
                            color: 'white',
                            fontWeight: 900,
                            borderRadius: '3rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            boxShadow: '0 20px 50px rgba(224, 122, 95, 0.4)',
                            cursor: 'pointer'
                        }}
                    >
                        Explorar Colección
                    </button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{
                    position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
            >
                <div style={{
                    width: 2, height: 50,
                    background: 'linear-gradient(to bottom, var(--secondary), transparent)',
                    borderRadius: 10,
                }} />
            </motion.div>
        </section>
    );
};

export default Hero;
