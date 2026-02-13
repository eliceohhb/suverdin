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
                    borderRadius: '0',
                    background: 'white',
                    transition: 'all 0.6s cubic-bezier(0.2, 0, 0, 1)',
                }}
                className="product-card"
            >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5', background: '#f5f5f5' }}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 1.2s cubic-bezier(0.2, 0, 0, 1)',
                        }}
                        className="card-image"
                    />
                    {/* Hover Info Overlay */}
                    <div className="card-overlay" style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(45,36,30,0.1)',
                        opacity: 0,
                        transition: 'opacity 0.6s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            padding: '1rem 2rem',
                            background: 'white',
                            color: 'var(--charcoal)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                        }}>
                            Ver Pieza
                        </div>
                    </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem 0.5rem', textAlign: 'center' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 400,
                        color: 'var(--charcoal)',
                        marginBottom: '0.5rem',
                        fontStyle: 'italic'
                    }}>
                        {product.name}
                    </h3>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--secondary)',
                        fontWeight: 500,
                        letterSpacing: '0.05em'
                    }}>
                        ${product.price.toLocaleString('es-CL')}
                    </div>
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
