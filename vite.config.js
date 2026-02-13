import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['react', 'react-dom', 'react-router-dom'],
                    'animation': ['framer-motion'],
                    'icons': ['lucide-react']
                }
            }
        },
        minify: 'terser',
        cssCodeSplit: true,
        sourcemap: false,
        chunkSizeWarningLimit: 1000
    },
    server: {
        preTransformRequests: false,
    }
})
