// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: false
  },
  modules: ["@nuxt/ui", "@nuxt/image"],
  icon: {
    mode: 'dynamic'
  },
  compatibilityDate: "2024-07-04"
})