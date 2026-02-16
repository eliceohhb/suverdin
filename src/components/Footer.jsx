import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, MessageCircle, MapPin, Linkedin, Youtube, Twitter, Music2 } from 'lucide-react';
import logo from '../assets/logo-full.png';

const Footer = () => {
    return (
        <footer style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1a1a1a 100%)',
            padding: '6rem 0 3rem',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Artistic Decorations */}
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '8px',
                background: 'var(--vibrant-gradient)'
            }} />
            <div style={{
                position: 'absolute', bottom: '-5%', left: '-5%', width: '300px', height: '300px',
                background: 'var(--accent1)', filter: 'blur(150px)', opacity: 0.1, borderRadius: '50%'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem',
                    marginBottom: '5rem'
                }}>

                    {/* Brand Column */}
                    <div>
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            style={{ display: 'inline-block', marginBottom: '1.5rem' }}
                        >
                            <img
                                src={logo}
                                alt="Suverdin"
                                style={{ height: '50px', width: 'auto', display: 'block' }}
                            />
                        </Link>
                        <p style={{ opacity: 0.6, lineHeight: 1.8, maxWidth: '300px' }}>
                            Transformando la naturaleza en piezas con alma. Muebles artesanales diseñados para trascender generaciones.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Colecciones</h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {['Comedor', 'Living', 'Dormitorio', 'Decoración'].map(item => (
                                <li key={item}>
                                    <a href="/#catalog" style={{ color: 'white', opacity: 0.5, textDecoration: 'none', transition: 'opacity 0.3s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.5}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contacto</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <MapPin size={18} style={{ color: 'var(--accent)' }} />
                                <span>Osorno, Región de Los Lagos, Chile</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <MessageCircle size={18} style={{ color: 'var(--highlight)' }} />
                                <span>+56 9 2887 0119</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <Mail size={18} style={{ color: 'var(--secondary)' }} />
                                <span>eliceohhb@gmail.com</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Social Row - Prominent and Centered */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    marginBottom: '4rem',
                    flexWrap: 'wrap'
                }}>
                    {[
                        { Icon: Instagram, url: 'https://instagram.com/suverdin' },
                        { Icon: Facebook, url: 'https://facebook.com/suverdin' },
                        { Icon: Linkedin, url: 'https://linkedin.com/company/suverdin' },
                        { Icon: Youtube, url: 'https://youtube.com/suverdin' },
                        { Icon: Twitter, url: 'https://twitter.com/suverdin' },
                        { Icon: Music2, url: 'https://tiktok.com/@suverdin' }
                    ].map((item, idx) => (
                        <motion.a
                            key={idx}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, color: 'var(--secondary)', scale: 1.1 }}
                            style={{ color: 'white', opacity: 0.8, transition: 'all 0.3s' }}
                        >
                            <item.Icon size={28} strokeWidth={1.5} />
                        </motion.a>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '2.5rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <p style={{ fontSize: '0.85rem', opacity: 0.4 }}>
                        © {new Date().getFullYear()} SUVERDIN. Todos los derechos reservados.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', opacity: 0.4 }}>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Términos</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacidad</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Envíos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
