import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, MessageCircle, CheckSquare, Square } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
    const [confirmed, setConfirmed] = useState(false);

    const formatPrice = (price) => '$' + price.toLocaleString('es-CL');

    const handleWhatsApp = () => {
        if (!confirmed || cart.length === 0) return;

        const productNames = cart.map(item => `• ${item.name}`).join('\n');
        const productQuantities = cart.map(item => `• ${item.name}: ${item.quantity} unidad(es)`).join('\n');

        const message = encodeURIComponent(
            `Hola, equipo SUVERDIN.\nEstoy interesado en realizar la siguiente compra:\n\nProductos:\n${productNames}\n\nCantidad:\n${productQuantities}\n\nTotal: ${formatPrice(totalPrice)}\n\nPor favor, indíquenme disponibilidad y opciones de entrega.\nMuchas gracias.`
        );

        window.open(`https://wa.me/56928870119?text=${message}`, '_blank');
    };

    if (cart.length === 0) {
        return (
            <div style={{ paddingTop: 'calc(var(--header-height) + 4rem)', minHeight: '80vh', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '500px' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Tu carrito está vacío</h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Descubre nuestras piezas artesanales y encuentra algo especial.</p>
                        <Link to="/" className="btn btn-primary">Ver Colección</Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)', minHeight: '100vh', background: 'var(--cream)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                {/* Back */}
                <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    <ArrowLeft size={16} /> Seguir comprando
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '0.5rem' }}>Tu Pedido</h1>
                    <hr className="divider" style={{ marginBottom: '2.5rem' }} />

                    {/* Invoice Table */}
                    <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '2rem' }}>
                        {/* Header Row */}
                        <div className="invoice-header" style={{
                            display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto',
                            gap: '1rem', paddingBottom: '1rem',
                            borderBottom: '2px solid var(--charcoal)',
                            fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                            color: 'var(--text-secondary)', alignItems: 'center',
                        }}>
                            <span></span>
                            <span>Producto</span>
                            <span style={{ textAlign: 'center' }}>Cantidad</span>
                            <span style={{ textAlign: 'right' }}>Precio</span>
                            <span style={{ textAlign: 'right' }}>Subtotal</span>
                        </div>

                        {/* Cart Items */}
                        {cart.map((item) => (
                            <div key={item.id} className="invoice-row" style={{
                                display: 'grid', gridTemplateColumns: '80px 1fr auto auto auto',
                                gap: '1rem', padding: '1.25rem 0',
                                borderBottom: '1px solid rgba(201,169,110,0.12)',
                                alignItems: 'center',
                            }}>
                                <img src={item.images[0]} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                                <div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</h3>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.material}</span>
                                    <button onClick={() => removeFromCart(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                                        <Trash2 size={12} /> Eliminar
                                    </button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '0.3rem' }}>
                                        <Minus size={14} />
                                    </button>
                                    <span style={{ fontWeight: 600, minWidth: '2rem', textAlign: 'center' }}>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '0.3rem' }}>
                                        <Plus size={14} />
                                    </button>
                                </div>
                                <span style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                    {formatPrice(item.price)}
                                </span>
                                <span style={{ textAlign: 'right', fontWeight: 600, fontSize: '1rem' }}>
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}

                        {/* Total */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '3rem', paddingTop: '1.5rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Total</span>
                            <span style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)', fontWeight: 500 }}>
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                    </div>

                    {/* Confirmation */}
                    <div style={{ background: 'var(--cream-dark)', borderRadius: 'var(--radius-md)', padding: '1.5rem 2rem', marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => setConfirmed(!confirmed)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%',
                                textAlign: 'left', fontSize: '0.9rem', color: confirmed ? 'var(--charcoal)' : 'var(--text-secondary)',
                            }}
                        >
                            {confirmed
                                ? <CheckSquare size={20} color="var(--gold)" />
                                : <Square size={20} />
                            }
                            He revisado y confirmo mi pedido
                        </button>
                    </div>

                    {/* WhatsApp Button */}
                    <button
                        onClick={handleWhatsApp}
                        disabled={!confirmed}
                        className="btn btn-whatsapp"
                        style={{
                            width: '100%',
                            padding: '1.25rem',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            opacity: confirmed ? 1 : 0.4,
                            pointerEvents: confirmed ? 'auto' : 'none',
                        }}
                    >
                        <MessageCircle size={20} />
                        Confirmar Pedido por WhatsApp
                    </button>
                </motion.div>
            </div>

            <div style={{ height: '4rem' }} />

            <style>{`
        @media (max-width: 768px) {
          .invoice-header { display: none !important; }
          .invoice-row {
            grid-template-columns: 70px 1fr !important;
            grid-template-rows: auto auto !important;
          }
        }
      `}</style>
        </div>
    );
};

export default Checkout;
