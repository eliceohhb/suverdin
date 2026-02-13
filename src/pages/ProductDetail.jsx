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

    // Carousel Auto-slide logic
    React.useEffect(() => {
        if (!showVideo && !isZoomed) {
            const timer = setInterval(() => {
                setSelectedImage((prev) => (prev + 1) % product.images.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [showVideo, isZoomed, product?.images.length]);

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

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % product.images.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);

    return (
        <div style={{
            paddingTop: 'calc(var(--header-height) + 2rem)',
            minHeight: '100vh',
            background: 'var(--background)',
            backgroundImage: 'var(--paper-texture)',
            color: 'var(--text-primary)',
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
                        style={{
                            background: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '100px',
                            color: 'var(--secondary)',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 15px rgba(160, 92, 59, 0.1)',
                            marginBottom: '1.5rem',
                            display: 'inline-block'
                        }}
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
                            fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                            fontWeight: 900,
                            lineHeight: 1,
                            letterSpacing: '-0.05em',
                            margin: '0 auto',
                            textShadow: '4px 4px 0px rgba(160, 92, 59, 0.03)'
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

                    {/* 2 & 3. Product Gallery Carousel & Video */}
                    <div style={{ position: 'sticky', top: '140px' }}>
                        <motion.div
                            layoutId={`img-${product.id}`}
                            className="gallery-main-container"
                            style={{
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: 'white',
                                boxShadow: '0 40px 100px rgba(160, 92, 59, 0.15)',
                                marginBottom: '2rem',
                                border: '1px solid rgba(160, 92, 59, 0.05)',
                                position: 'relative',
                                cursor: 'zoom-in'
                            }}
                            onMouseEnter={() => setIsZoomed(true)}
                            onMouseLeave={() => setIsZoomed(false)}
                        >
                            <AnimatePresence mode="wait">
                                {!showVideo ? (
                                    <motion.div
                                        key={selectedImage}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0, scale: isZoomed ? 1.1 : 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        style={{ width: '100%', aspectRatio: '4/5', position: 'relative' }}
                                    >
                                        <img
                                            src={product.images[selectedImage]}
                                            alt={product.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </motion.div>
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

                            {/* Carousel Controls */}
                            {!showVideo && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                        style={{
                                            position: 'absolute',
                                            left: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.8)',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)',
                                            zIndex: 10,
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                        style={{
                                            position: 'absolute',
                                            right: '1rem',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            background: 'rgba(255,255,255,0.8)',
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)',
                                            zIndex: 10,
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                                        }}
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Indicators */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '1.5rem',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        display: 'flex',
                                        gap: '0.5rem',
                                        zIndex: 10
                                    }}>
                                        {product.images.map((_, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: selectedImage === i ? 'var(--secondary)' : 'rgba(255,255,255,0.5)',
                                                    transition: 'all 0.3s'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Video Play Indicator */}
                            {product.video && !showVideo && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
                                    style={{
                                        position: 'absolute',
                                        top: '2.5rem',
                                        right: '2.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: 'var(--vibrant-gradient)',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '100px',
                                        boxShadow: '0 10px 25px rgba(224, 122, 95, 0.3)',
                                        zIndex: 5,
                                        cursor: 'pointer',
                                        color: 'white'
                                    }}
                                >
                                    <Play size={18} fill="white" />
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Historia
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Thumbnail Slider */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            overflowX: 'auto',
                            paddingBottom: '0.5rem',
                            scrollbarWidth: 'none'
                        }}>
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    style={{
                                        minWidth: '80px',
                                        height: '80px',
                                        borderRadius: 'var(--radius-md)',
                                        border: selectedImage === i ? '3px solid var(--secondary)' : '3px solid transparent',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        padding: 0,
                                        background: 'white',
                                        flexShrink: 0
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Product Description */}
                            <div style={{
                                background: 'white',
                                padding: '3rem',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: '3rem',
                                border: '1px solid rgba(160, 92, 59, 0.08)',
                                boxShadow: '0 10px 40px rgba(160, 92, 59, 0.05)',
                                position: 'relative'
                            }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                    Inspiración & Alma
                                </h3>
                                <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-primary)', opacity: 0.8 }}>
                                    {product.story || product.shortDescription}
                                </p>
                            </div>

                            {/* Price & Details */}
                            <div style={{ marginBottom: '4rem' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '2.5rem' }}>
                                    <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '-0.03em' }}>
                                        ${product.price?.toLocaleString('es-CL')}
                                    </div>
                                    <div style={{ fontSize: '1rem', opacity: 0.5, fontWeight: 700 }}>Valor de la Pieza</div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div style={{ background: 'rgba(129, 178, 154, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.5rem', fontWeight: 800 }}>Dimensiones</h4>
                                        <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent2)' }}>{product.dimensions}</p>
                                    </div>
                                    <div style={{ background: 'rgba(157, 78, 221, 0.1)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                                        <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.5rem', fontWeight: 800 }}>Artesanía</h4>
                                        <p style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--accent3)' }}>{product.deliveryTime || 'Bajo pedido'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(224, 122, 95, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    style={{
                                        padding: '1.75rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: added ? 'var(--accent2)' : 'var(--vibrant-gradient)',
                                        color: 'white',
                                        fontSize: '1.2rem',
                                        fontWeight: 900,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    {added ? <Check size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                                    {added ? '¡Agregado!' : 'Agregar a mi Espacio'}
                                </motion.button>

                                <motion.a
                                    href={`https://wa.me/56928870119?text=Hola! Estoy interesado en el producto: ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02, background: 'rgba(160, 92, 59, 0.05)' }}
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '2px solid var(--primary)',
                                        background: 'transparent',
                                        color: 'var(--primary)',
                                        fontSize: '1.1rem',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Personalizar esta Pieza
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                .gallery-main-container:hover {
                    box-shadow: 0 50px 120px rgba(160, 92, 59, 0.2) !important;
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
