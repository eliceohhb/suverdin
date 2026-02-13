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
            color: 'var(--primary)'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Breadcrumbs */}
                <nav style={{ marginBottom: '3rem', display: 'flex', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 500, opacity: 0.6 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
                    <span>/</span>
                    <Link to="/#catalog" style={{ textDecoration: 'none', color: 'inherit' }}>Colección</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--secondary)' }}>{product.name}</span>
                </nav>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'start' }}>

                    {/* Left: Gallery (Masonry-ish Slider) */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        <motion.div
                            layoutId={`img-${product.id}`}
                            className="gallery-main-container"
                            style={{
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                background: 'white',
                                boxShadow: '0 20px 60px rgba(58,47,42,0.1)',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(0,0,0,0.05)',
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
                                        transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                                        style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <motion.div
                                        key="video-player"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        style={{ position: 'relative', width: '100%', aspectRatio: '4/5' }}
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
                                                background: 'rgba(0,0,0,0.5)',
                                                color: 'white',
                                                padding: '0.5rem',
                                                borderRadius: '50%',
                                                backdropFilter: 'blur(10px)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <CloseIcon size={20} />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Video Play Indicator */}
                            {product.video && !showVideo && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    right: '2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    background: 'rgba(255,255,255,0.9)',
                                    padding: '0.75rem 1.25rem',
                                    borderRadius: '100px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    backdropFilter: 'blur(10px)',
                                    zIndex: 5
                                }}>
                                    <Play size={18} fill="var(--secondary)" color="var(--secondary)" />
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>Ver Video Artesanal</span>
                                </div>
                            )}

                            {/* Zoom Indicator */}
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                left: '1.5rem',
                                width: '40px',
                                height: '40px',
                                background: 'rgba(255,255,255,0.8)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: isZoomed ? 0 : 0.6,
                                transition: 'opacity 0.3s',
                                backdropFilter: 'blur(5px)',
                                pointerEvents: 'none'
                            }}>
                                <Maximize2 size={18} />
                            </div>
                        </motion.div>

                        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', scrollbarWidth: 'none' }}>
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    style={{
                                        minWidth: '80px',
                                        height: '80px',
                                        borderRadius: 'var(--radius-md)',
                                        border: selectedImage === i ? '2px solid var(--secondary)' : '2px solid transparent',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                        padding: 0,
                                        background: 'white'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Info & Storytelling */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="section-label" style={{ color: 'var(--secondary)', marginBottom: '1rem', display: 'block' }}>
                                {product.material} Artesanal
                            </span>
                            <h1 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                marginBottom: '1.5rem',
                                letterSpacing: '-0.03em'
                            }}>
                                {product.name}
                            </h1>

                            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '3rem' }}>
                                ${product.price?.toLocaleString('es-CL')}
                            </div>

                            {/* Storytelling Panel */}
                            <div style={{
                                background: 'linear-gradient(135deg, rgba(209,108,77,0.05) 0%, rgba(244,201,93,0.05) 100%)',
                                padding: '2.5rem',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: '3rem',
                                border: '1px solid rgba(209,108,77,0.1)'
                            }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--secondary)' }}>
                                    Inspiración & Alma
                                </h3>
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.85 }}>
                                    {product.story || product.shortDescription}
                                </p>
                            </div>

                            {/* Details Grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>Dimensiones</h4>
                                    <p style={{ fontWeight: 600 }}>{product.dimensions}</p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' }}>Tiempo de Creación</h4>
                                    <p style={{ fontWeight: 600 }}>{product.deliveryTime || 'Hecho a mano bajo pedido'}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleAddToCart}
                                    disabled={added}
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: 'none',
                                        background: added ? 'var(--highlight)' : 'var(--vibrant-gradient)',
                                        color: 'white',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        boxShadow: '0 10px 30px rgba(209,108,77,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    {added ? <Check size={20} /> : <Plus size={20} />}
                                    {added ? '¡Agregado al Carrito!' : 'Agregar a mi Espacio'}
                                </motion.button>

                                <motion.a
                                    href={`https://wa.me/56928870119?text=Hola! Estoy interesado en el producto: ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pulse-effect"
                                    style={{
                                        padding: '1.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: '2px solid var(--secondary)',
                                        background: 'transparent',
                                        color: 'var(--secondary)',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                        textDecoration: 'none',
                                        textAlign: 'center',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Personalizar esta Pieza
                                </motion.a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Social Sharing Section */}
                <section style={{
                    marginTop: '8rem',
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    background: 'var(--primary)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '3rem' }}>
                            Lleva el Color a tus Redes
                        </h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem' }}>
                            {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    style={{
                                        width: '64px', height: '64px',
                                        background: 'rgba(255,255,255,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                                        backdropFilter: 'blur(5px)'
                                    }}
                                >
                                    <Icon size={28} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    {/* Decorative Blob */}
                    <div style={{
                        position: 'absolute', top: '-10%', right: '-10%',
                        width: '300px', height: '300px', background: 'var(--secondary)',
                        filter: 'blur(100px)', opacity: 0.3
                    }} />
                </section>
            </div>

            <style>{`
                .pulse-effect:hover {
                    box-shadow: 0 0 0 10px rgba(209,108,77,0.1);
                    background: rgba(209,108,77,0.05);
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;
