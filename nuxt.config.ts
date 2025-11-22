// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/eslint", "@nuxt/image", "@nuxt/scripts"],

  experimental: {
    defaults: {
      nuxtLink: {
        prefetchOn: "interaction",
      },
    },
  },

  css: ["~/assets/css/main.css"],
  nitro: {
    preset: "vercel",
  },

  routeRules: {
    "/": {
      prerender: true,
    },
    "/portfolio": {
      prerender: true,
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  // forgot to add after migrating config, whoops
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  compatibilityDate: "2024-11-27",
  runtimeConfig: {
    public: {
      // Site Information
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || "ExampleName",
      siteDescription:
        process.env.NUXT_PUBLIC_SITE_DESCRIPTION || "ExampleDescription",

      // Social Links
      discordUrl:
        process.env.NUXT_PUBLIC_DISCORD_URL ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",
      twitchUrl:
        process.env.NUXT_PUBLIC_TWITCH_URL ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",
      twitterUrl:
        process.env.NUXT_PUBLIC_TWITTER_URL ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",
      githubUrl:
        process.env.NUXT_PUBLIC_GITHUB_URL || "https://github.com/rikkichy",

      // Contact Information
      email: process.env.NUXT_PUBLIC_EMAIL || "yourmail@cat.meow",
      managerDiscord:
        process.env.NUXT_PUBLIC_MANAGER_DISCORD || "your_discord_username",

      // Commission Links
      kofiUrl:
        process.env.NUXT_PUBLIC_KOFI_URL ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",
      vgenUrl:
        process.env.NUXT_PUBLIC_VGEN_URL ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",

      // Feature Flags (will add more soon, maybe :3)
      enableSecretHint: process.env.NUXT_PUBLIC_ENABLE_SECRET_HINT || "true",
      enableSillyModes: process.env.NUXT_PUBLIC_ENABLE_SILLY_MODES || "true",

      // Defaults
      defaultBrainrotLevel:
        process.env.NUXT_PUBLIC_DEFAULT_BRAINROT_LEVEL || "0",

      // Portfolio
      portfolioYoutubePlaylist:
        process.env.NUXT_PUBLIC_PORTFOLIO_YOUTUBE_PLAYLIST ||
        "https://github.com/rikkichy/rii.cat?tab=readme-ov-file#customization",
      portfolioBasicVideo:
        process.env.NUXT_PUBLIC_PORTFOLIO_BASIC_VIDEO || "dQw4w9WgXcQ",
      portfolioAdvancedVideo:
        process.env.NUXT_PUBLIC_PORTFOLIO_ADVANCED_VIDEO || "dQw4w9WgXcQ",
    },
  },
});
