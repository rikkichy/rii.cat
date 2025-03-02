export default defineNuxtConfig({
  app: {
    pageTransition: false,
    head: {
      link: [
        // Preload critical assets
        { rel: 'preload', as: 'image', href: '/assets/img/pfp.png' }
      ]
    }
  },
  modules: ["@nuxt/ui", "@nuxt/image"],
  image: {
    quality: 80,
    format: ['webp'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 96,
          height: 96
        }
      }
    }
  },
  icon: {
    mode: 'dynamic'
  },
  compatibilityDate: "2024-07-04"
})