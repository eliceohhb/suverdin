import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isClickable, setIsClickable] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 250 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isLink = target.closest('a') || target.closest('button') || target.hasAttribute('data-cursor');
            setIsClickable(!!isLink);
            setIsHovered(true);
        };

        const handleMouseOut = () => {
            setIsHovered(false);
            setIsClickable(false);
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    if (isMobile) return null;

    return (
        <>
            {/* Small dot */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000]"
                style={{
                    x: springX, y: springY, translateX: '-50%', translateY: '-50%',
                    width: '8px', height: '8px',
                    backgroundColor: 'var(--secondary)'
                }}
            />
            {/* Large circle */}
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
                animate={{
                    scale: isClickable ? 2 : 1,
                    opacity: isHovered ? 1 : 0,
                    backgroundColor: isClickable ? 'rgba(209, 108, 77, 0.1)' : 'rgba(209, 108, 77, 0)',
                    borderColor: 'var(--secondary)'
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
                style={{
                    x: springX, y: springY, translateX: '-50%', translateY: '-50%',
                    width: '48px', height: '48px',
                    border: '1px solid var(--secondary)'
                }}
            />
        </>
    );
};

export default CustomCursor;
