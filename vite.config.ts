import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Gwent Web App',
        short_name: 'GWENT',
        description: 'Gwent web application. Witcher card game in browser.',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon/apple-touch-icon.png',
            type: 'image/png',
            sizes: '180x180',
          },
          {
            src: 'favicon/favicon-48x48',
            type: 'image/png',
            sizes: '48x48',
          },
          {
            src: 'favicon/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'favicon/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
