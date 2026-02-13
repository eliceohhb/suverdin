import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import ContactHub from '../components/ContactHub';

const Home = () => {
    return (
        <div>
            <Hero />

            {/* Brand Statement */}
            <section className="section" style={{ background: 'var(--cream-dark)' }}>
                <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="section-label">Filosofía</span>
                        <h2 style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                            fontWeight: 500,
                            lineHeight: 1.3,
                            color: 'var(--charcoal)',
                            marginBottom: '1.5rem',
                        }}>
                            Creemos que un mueble no es solo un objeto, sino una <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>experiencia</span> que transforma el espacio que habitas.
                        </h2>
                        <hr className="divider" style={{ margin: '1.5rem auto' }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                            Desde nuestro taller en el sur de Chile, cada pieza nace de horas de trabajo manual,
                            materiales seleccionados con criterio y un diseño que busca emocionar.
                            No fabricamos en serie. Creamos piezas con alma.
                        </p>
                    </motion.div>
                </div>
            </section>

            <BentoGrid />

            {/* Process Section */}
            <section className="section" style={{ background: 'var(--charcoal)', color: 'white' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <span className="section-label">Proceso</span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: 'white', marginBottom: '1rem' }}>
                            Del Taller a Tu Hogar
                        </h2>
                        <hr className="divider" style={{ margin: '1.5rem auto' }} />
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
                        {[
                            { step: '01', title: 'Diseño', desc: 'Cada pieza comienza con un boceto a mano, buscando el equilibrio perfecto entre belleza y función.' },
                            { step: '02', title: 'Selección', desc: 'Elegimos maderas nobles por su veta, resistencia y carácter. Solo trabajamos con materiales éticos.' },
                            { step: '03', title: 'Creación', desc: 'Técnicas artesanales transmitidas por generaciones se combinan con herramientas de precisión.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 500, color: 'var(--gold)', display: 'block', marginBottom: '1rem' }}>
                                    {item.step}
                                </span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem', color: 'white', fontFamily: 'var(--font-body)' }}>
                                    {item.title}
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactHub />
        </div>
    );
};

export default Home;
