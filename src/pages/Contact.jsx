import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Clock } from 'lucide-react';
import ContactHub from '../components/ContactHub';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Generate mailto link as simple email solution
        const subject = encodeURIComponent(`Contacto desde SUVERDIN — ${form.name}`);
        const body = encodeURIComponent(`Nombre: ${form.name}\nEmail: ${form.email}\n\nMensaje:\n${form.message}`);
        window.open(`mailto:contacto@suverdin.com?subject=${subject}&body=${body}`);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div style={{ paddingTop: 'calc(var(--header-height) + 2rem)', background: 'var(--cream)' }}>
            {/* Hero */}
            <section className="section" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                <div className="container" style={{ maxWidth: '700px' }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <span className="section-label">Contacto</span>
                        <h1 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 500,
                            lineHeight: 1.15,
                            marginBottom: '1rem',
                        }}>
                            Hablemos de tu <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>próximo</span> proyecto
                        </h1>
                        <hr className="divider" style={{ margin: '1.5rem auto' }} />
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>
                            Cada pieza comienza con una conversación. Cuéntanos qué espacio quieres transformar.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Info Only */}
            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                    >
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <MapPin size={18} color="var(--gold)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Ubicación</span>
                            </div>
                            <p style={{ color: 'var(--charcoal)', fontSize: '1.2rem', lineHeight: 1.6 }}>
                                Taller SUVERDIN<br />
                                Osorno, Región de Los Lagos<br />
                                Chile
                            </p>
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                <Clock size={18} color="var(--gold)" />
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Horario</span>
                            </div>
                            <p style={{ color: 'var(--charcoal)', fontSize: '1.2rem', lineHeight: 1.6 }}>
                                Lunes a Viernes: 9:00 — 18:00<br />
                                Sábado: 10:00 — 14:00
                            </p>
                        </div>

                        <div style={{ background: 'var(--cream-dark)', padding: '3rem', borderRadius: 'var(--radius-md)' }}>
                            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontStyle: 'italic', color: 'var(--charcoal)', lineHeight: 1.5 }}>
                                "Cada pieza que creamos lleva la huella de quien la hizo y el sueño de quien la imagina."
                            </p>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '1rem', display: 'block' }}>
                                — Equipo SUVERDIN
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
};

export default Contact;
