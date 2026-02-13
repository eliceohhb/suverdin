import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Instagram, Facebook, Linkedin, Youtube, Twitter, ArrowUpRight } from 'lucide-react';

const socialLinks = [
    { icon: MessageCircle, name: 'WhatsApp', url: 'https://wa.me/56928870119', color: '#25D366', desc: 'Respuesta inmediata' },
    { icon: Mail, name: 'Email', url: 'mailto:eliceohhb@gmail.com', color: '#EA4335', desc: 'Consultas formales' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/suverdin', color: '#E1306C', desc: 'Nuestro proceso diario' },
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/suverdin', color: '#1877F2', desc: 'Comunidad Suverdin' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/suverdin', color: '#0A66C2', desc: 'Perfil profesional' },
    { icon: Youtube, name: 'YouTube', url: 'https://youtube.com/suverdin', color: '#FF0000', desc: 'Videos y tutoriales' },
    { icon: Twitter, name: 'X', url: 'https://twitter.com/suverdin', color: '#000000', desc: 'Novedades rápidas' },
];

const ContactHub = () => {
    return (
        <section id="contacto" className="section" style={{
            background: 'var(--background)',
            overflow: 'hidden',
            padding: '8rem 0',
            position: 'relative'
        }}>
            {/* Background Decorations */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'rgba(209,108,77,0.03)', filter: 'blur(60px)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'rgba(139,95,191,0.03)', filter: 'blur(80px)', borderRadius: '50%' }} />

            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-label"
                        style={{ color: 'var(--secondary)' }}
                    >
                        Hablemos
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: 800,
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--primary)',
                            marginTop: '1rem'
                        }}
                    >
                        Conecta con Nosotros
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ maxWidth: '600px', margin: '1.5rem auto', fontSize: '1.2rem', opacity: 0.7 }}
                    >
                        Estamos en cada rincón digital para que nunca pierdas el hilo de nuestra creatividad.
                    </motion.p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {socialLinks.map((social, idx) => (
                        <motion.a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="contact-card-vibrant"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                padding: '2rem',
                                background: 'white',
                                borderRadius: 'var(--radius-lg)',
                                textDecoration: 'none',
                                color: 'var(--primary)',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                width: '56px',
                                height: '56px',
                                background: `${social.color}15`,
                                borderRadius: 'var(--radius-organic)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: social.color,
                                transition: 'transform 0.5s ease'
                            }} className="icon-container">
                                <social.icon size={26} strokeWidth={2} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.2rem' }}>{social.name}</h3>
                                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>{social.desc}</p>
                            </div>

                            <ArrowUpRight size={18} style={{ opacity: 0.2 }} />

                            <div className="hover-bg" style={{
                                position: 'absolute',
                                inset: 0,
                                background: `linear-gradient(135deg, ${social.color}05 0%, ${social.color}10 100%)`,
                                opacity: 0,
                                transition: 'opacity 0.4s'
                            }} />
                        </motion.a>
                    ))}
                </div>

                <style>{`
                    .contact-card-vibrant:hover {
                        transform: translateY(-8px) scale(1.02);
                        box-shadow: 0 25px 50px rgba(0,0,0,0.08);
                        border-color: var(--secondary);
                    }
                    .contact-card-vibrant:hover .hover-bg {
                        opacity: 1;
                    }
                    .contact-card-vibrant:hover .icon-container {
                        transform: rotate(10deg);
                        background: ${socialLinks[0].color}25; /* Fallback, handled by CSS variables normally */
                    }
                    .contact-card-vibrant:hover h3 {
                        color: var(--secondary);
                    }
                `}</style>
            </div>
        </section>
    );
};

export default ContactHub;
