import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true, margin: '-50px' }}
        >
            <Link
                to={`/producto/${product.id}`}
                style={{
                    display: 'block',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--cream-dark)',
                    transition: 'all 0.6s cubic-bezier(0.23,1,0.32,1)',
                }}
                className="product-card"
            >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: index % 3 === 0 ? '3/4' : '4/5' }}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1), filter 0.8s ease',
                        }}
                        className="card-image"
                    />
                    {/* Hover Overlay */}
                    <div className="card-overlay" style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)',
                        opacity: 0,
                        transition: 'opacity 0.5s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '2rem',
                    }}>
                        <span style={{
                            color: 'white',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                        }}>
                            Ver Detalles →
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--secondary)',
                            background: 'rgba(209,108,77,0.05)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '4px'
                        }}>
                            {product.material.split('+')[0].trim()}
                        </span>
                        <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1rem' }}>
                            ${product.price.toLocaleString('es-CL')}
                        </span>
                    </div>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        lineHeight: 1.2
                    }}>
                        {product.name}
                    </h3>
                </div>
            </Link>

            <style>{`
        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(26,26,26,0.08);
        }
        .product-card:hover .card-image {
          transform: scale(1.06);
        }
        .product-card:hover .card-overlay {
          opacity: 1 !important;
        }
      `}</style>
        </motion.div>
    );
};

export default ProductCard;
