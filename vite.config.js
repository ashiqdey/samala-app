import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions = {
  mode: 'development', // production
  base: '/app/',
  manifest: {
    "name": "Samala Pharmacy",
    "short_name": "Samala Pharmacy",
    "theme_color": "#00ebd4",
    "background_color": "#ffffff",
    "display": "standalone",
    "orientation": "portrait",
    "scope": "/app/",
    "start_url": "/app/",
    "id": "/app/",
    "lang": "en-US",
    "description": "Samala Pharmacy is a retail medicine outlet based out of Coochbehar, West Bengal.",
    "categories": ["medical"],
    "shortcuts": [{
      "name": "Search",
      "url": "search",
      "icons": [{
        "src": "../assets/favicon/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      }]
    },
    {
      "name": "Cart",
      "url": "cart",
      "icons": [{
        "src": "../assets/favicon/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      }]
    },
    {
      "name": "Account",
      "url": "account",
      "icons": [{
        "src": "../assets/favicon/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image/png"
      }]
    }
    ],
    "related_applications": [{
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=in.samalapharmacy.app",
      "id": "in.samalapharmacy.app"
    }],
    "icons": [{
      "src": "../assets/favicon/android-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "../assets/favicon/android-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "../assets/favicon/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "../assets/favicon/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "../assets/favicon/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "../assets/favicon/android-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
    ]
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}



const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = true;
const reload = process.env.RELOAD_SW === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.js' : 'prompt-sw.js'
  pwaOptions.strategies = 'generateSW'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  // base: process.env.BASE_URL || 'https://github.com/',
  plugins: [
    react(),
    VitePWA(pwaOptions),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'app/static/[name]-[hash].[ext]',
        chunkFileNames: 'app/static/[name]-[hash].js',
        entryFileNames: 'app/static/[name]-[hash].js',
      },
    },
  },
})
