export default {
  globDirectory: 'build/',
  globPatterns: ['**/*.{css,woff2,png,svg,jpg,jpeg,js,m4a,mp3}'],
  swDest: 'build/sw.js',
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|m4a|mp3)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-and-audio',
        expiration: {
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
};
