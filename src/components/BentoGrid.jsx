import React from 'react';
import { motion } from 'framer-motion';
import products from '../data/products';
import ProductCard from './ProductCard';

const BentoGrid = () => {
    return (
        <section id="catalog" className="section" style={{ background: 'var(--background)' }}>
            <div className="container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '6rem', textAlign: 'center' }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="section-label"
                        style={{ color: 'var(--secondary)', letterSpacing: '0.2em' }}
                    >
                        Colección Artesanal
                    </motion.span>
                    <h2 className="section-title" style={{
                        fontWeight: 800,
                        fontFamily: 'var(--font-heading)',
                        color: 'var(--primary)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        letterSpacing: '-0.02em',
                        marginTop: '1rem'
                    }}>
                        Piezas de Autor
                    </h2>
                    <p className="section-subtitle" style={{
                        margin: '1.5rem auto 0',
                        opacity: 0.7,
                        maxWidth: '600px',
                        fontSize: '1.1rem'
                    }}>
                        Diseños únicos que fusionan la calidez de la madera con la alegría del color contemporáneo.
                    </p>
                </motion.div>

                {/* Product Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 'clamp(1.25rem, 3vw, 2rem)',
                }}>
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
