import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Check, ChevronLeft, ChevronRight, Share2, Instagram, Facebook, Twitter, Play, X as CloseIcon, Maximize2 } from 'lucide-react';
import products from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    // Ensure page opens at top
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    if (!product) {
        return (
            <div style={{ padding: '200px 2rem', textAlign: 'center', background: 'var(--background)' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)' }}>Producto no encontrado</h2>
                <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>Volver al inicio</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div style={{
            paddingTop: 'calc(var(--header-height) + 2rem)',
            minHeight: '100vh',
            background: 'var(--background)',
            color: 'var(--primary)',
            paddingBottom: '8rem'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Breadcrumbs */}
                <nav style={{ marginBottom: '4rem', display: 'flex', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, opacity: 0.5 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
                    <span>/</span>
                    <Link to="/#catalog" style={{ textDecoration: 'none', color: 'inherit' }}>Colección</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--secondary)' }}>{product.name}</span>
                </nav>

                {/* 1. Product Title (Centralized & Large) */}
                <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="section-label"
                        style={{ color: 'var(--secondary)', marginBottom: '1.5rem', display: 'inline-block' }}
                    >
                        {product.material} Artesanal
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                        className="gradient-text-shadow"
                        style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: '-0.04em',
                            margin: '0 auto'
                        }}
                    >
                        {product.name}
                    </motion.h1>
                </header>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '6rem',
                    alignItems: 'start'
                }}>

                    {/* 2 & 3. Product Gallery & Video (Interactive Storytelling) */}
                    <div style={{ position: 'sticky', top: '140px' }}>
                        <motion.div
                            layoutId={`img-${product.id}`}
                            className="gallery-main-container"
                            style={{
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: 'white',
                                boxShadow: '0 30px 100px rgba(58,47,42,0.12)',
                                marginBottom: '2rem',
                                border: '1px solid rgba(0,0,0,0.03)',
                                position: 'relative',
                                cursor: 'zoom-in'
                            }}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                            onClick={() => product.video && setShowVideo(true)}
                        >
                            <AnimatePresence mode="wait">
                                {!showVideo ? (
                                    <motion.img
                                        key={selectedImage}
                                        src={product.images[selectedImage]}
                                        alt={product.name}
                                        initial={{ opacity: 0, scale: 1.05 }}
                                        animate={{ opacity: 1, scale: isZoomed ? 1.15 : 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <motion.div
                                        key="video-player"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ position: 'relative', width: '100%', aspectRatio: '4/5', background: '#000' }}
                                    >
                                        <video
                                            src={product.video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setShowVideo(false); }}
                                            style={{
                                                position: 'absolute',
                                                top: '1.5rem',
                                                right: '1.5rem',
                                                background: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                padding: '0.75rem',
                                                borderRadius: '50%',
                                                backdropFilter: 'blur(20px)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1px solid rgba(255,255,255,0.3)',
                                                zIndex: 10
                                            }}
                                        >
                                            <CloseIcon size={20} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Video Play Indicator */}
                            {product.video && !showVideo && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    style={{
                                        position: 'absolute',
                                        bottom: '2.5rem',
                                        right: '2.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: 'rgba(255,255,255,0.95)',
                                        padding: '1rem 1.75rem',
                                        borderRadius: '100px',
                                        boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
                                        backdropFilter: 'blur(10px)',
                                        zIndex: 5,
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Play size={20} strokeWidth={3} fill="var(--secondary)" color="var(--secondary)" />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Historia del Proceso
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Thumbnail Slider */}
                        <div style={{
                            display: 'flex',
                            gap: '1.25rem',
                            overflowX: 'auto',
                            paddingBottom: '1rem',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}>
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    style={{
                                        minWidth: '94px',
                                        height: '94px',
                                        borderRadius: 'var(--radius-md)',
                                        border: selectedImage === i ? '3px solid var(--secondary)' : '3px solid transparent',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        padding: 0,
                                        background: 'white',
                                        boxShadow: selectedImage === i ? '0 8px 20px rgba(209,108,77,0.2)' : 'none'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 4, 5, 6, 7. Info Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* 4. Product Description (Storytelling Panel) */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(209,108,77,0.08) 0%, rgba(244,201,93,0.08) 100%)',
                                padding: '3.5rem',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: '4rem',
                                border: '1px solid rgba(209,108,77,0.15)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* Organic Decoration */}
                                <div style={{ position: 'absolute', top: '-15%', right: '-10%', opacity: 0.08, transform: 'rotate(25deg)', color: 'var(--secondary)' }}>
                                    <svg width="240" height="240" viewBox="0 0 100 100">
                                        <path d="M50 0 C70 30 100 50 50 100 C0 50 30 30 50 0" fill="currentColor" />
                                    </svg>
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                    Inspiración & Alma
                                </h3>
                                <p style={{ fontSize: '1.25rem', lineHeight: 2, color: 'var(--primary)', fontWeight: 500, opacity: 0.9 }}>
                                    {product.story || product.shortDescription}
                                </p>
                            </div>

                            {/* 5 & 6. Price & Details */}
                            <div style={{ marginBottom: '4.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '3.5rem' }}>
                                    <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
                                        ${product.price?.toLocaleString('es-CL')}
                                    </div>
                                    <div style={{ fontSize: '1.1rem', opacity: 0.5, fontWeight: 700, textTransform: 'uppercase' }}>Valor de la Pieza</div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>Dimensiones</h4>
                                        <p style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)' }}>{product.dimensions}</p>
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.75rem', fontWeight: 800, letterSpacing: '0.05em' }}>Artesanía</h4>
                                        <p style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--primary)' }}>{product.deliveryTime || 'Bajo pedido'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* 7. Contact Button & Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={handleAddToCart}
                                    disabled={added}
                                    style={{
                                        padding: '2rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: added ? 'var(--highlight)' : 'var(--vibrant-gradient)',
                                        color: 'white',
                                        fontSize: '1.3rem',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        boxShadow: added ? 'none' : '0 20px 50px rgba(209,108,77,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1.25rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    {added ? <Check size={26} strokeWidth={3} /> : <Plus size={26} strokeWidth={3} />}
                                    {added ? '¡Agregado!' : 'Agregar a mi Espacio'}
                                </motion.button>

                                <motion.a
                                    href={`https://wa.me/56928870119?text=Hola! Estoy interesado en el producto: ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pulse-effect"
                                    style={{
                                        padding: '1.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '4px solid var(--secondary)',
                                        background: 'transparent',
                                        color: 'var(--secondary)',
                                        fontSize: '1.25rem',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    Personalizar esta Pieza
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 8. Social Media Section (Colorful Artisan Cards) */}
                <section style={{
                    marginTop: '12rem',
                    padding: '10rem 3rem',
                    textAlign: 'center',
                    background: 'var(--primary)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.6 }}
                            style={{ textTransform: 'uppercase', letterSpacing: '0.2rem', fontSize: '0.9rem', fontWeight: 800, marginBottom: '2rem', display: 'block' }}
                        >
                            Conecta con la Pieza
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '4rem', fontWeight: 900, lineHeight: 1 }}
                        >
                            Lleva el Color a tus Redes
                        </motion.h2>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap' }}>
                            {[
                                { Icon: Instagram, color: '#E1306C' },
                                { Icon: Facebook, color: '#1877F2' },
                                { Icon: Twitter, color: '#1DA1F2' }
                            ].map(({ Icon, color }, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ scale: 1.2, rotate: idx % 2 === 0 ? 10 : -10 }}
                                    style={{
                                        width: '86px', height: '86px',
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '2rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', border: '1.5px solid rgba(255,255,255,0.12)',
                                        backdropFilter: 'blur(15px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        transition: 'all 0.4s'
                                    }}
                                >
                                    <Icon size={34} strokeWidth={1.5} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Artistic Blobs Background */}
                    <motion.div
                        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                        style={{
                            position: 'absolute', top: '-10%', right: '-5%',
                            width: '600px', height: '600px', background: 'var(--secondary)',
                            filter: 'blur(150px)', opacity: 0.15
                        }}
                    />
                    <motion.div
                        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                        style={{
                            position: 'absolute', bottom: '-15%', left: '-5%',
                            width: '500px', height: '500px', background: 'var(--creative)',
                            filter: 'blur(130px)', opacity: 0.12
                        }}
                    />
                </section>
            </div>

            <style>{`
                .pulse-effect:hover {
                    box-shadow: 0 0 0 20px rgba(209,108,77,0.12);
                    background: rgba(209,108,77,0.04);
                }
                .gallery-main-container:hover {
                    transform: scale(1.02);
                    box-shadow: 0 40px 120px rgba(58, 47, 42, 0.18) !important;
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
