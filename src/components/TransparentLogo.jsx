import React, { useEffect, useRef } from 'react';

const TransparentLogo = ({ src, alt, className, style, height }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;
        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');

            // Set canvas size to image size
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Background removal logic: Targeted at the checkerboard pattern (usually light gray/white)
            // Checkerboard cells are typically around (255,255,255) and (200,200,200 to 240,240,240)
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // If the pixel is very light (high RGB values), it's likely part of the background
                // Threshold of 190 covers most "light gray" checkerboards while preserving most logo details
                if (r > 190 && g > 190 && b > 190) {
                    data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };
    }, [src]);

    return (
        <canvas
            ref={canvasRef}
            title={alt}
            className={className}
            style={{
                ...style,
                height: height || 'auto',
                width: 'auto',
                display: 'block',
                maxWidth: '100%'
            }}
        />
    );
};

export default TransparentLogo;
