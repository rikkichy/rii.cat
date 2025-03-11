export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
  ],
  compatibilityDate: "2024-07-04",
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    }
  },
  runtimeConfig: {
    public: {
      // Site Information
      siteName: process.env.NUXT_PUBLIC_SITE_NAME || "Not set",
      siteDescription: process.env.NUXT_PUBLIC_SITE_DESCRIPTION || "Empty..",
      
      // Social Links
      discordUrl: process.env.NUXT_PUBLIC_DISCORD_URL || "https://github.com/rikkichy/rii.cat",
      twitchUrl: process.env.NUXT_PUBLIC_TWITCH_URL || "https://github.com/rikkichy/rii.cat",
      twitterUrl: process.env.NUXT_PUBLIC_TWITTER_URL || "https://github.com/rikkichy/rii.cat",
      githubUrl: process.env.NUXT_PUBLIC_GITHUB_URL || "https://github.com/rikkichy",
      
      // Contact Information
      email: process.env.NUXT_PUBLIC_EMAIL || "rikkiads@pm.me",
      managerDiscord: process.env.NUXT_PUBLIC_MANAGER_DISCORD || "moustache.man",
      
      // Commission Links
      kofiUrl: process.env.NUXT_PUBLIC_KOFI_URL || "https://github.com/rikkichy/rii.cat",
      vgenUrl: process.env.NUXT_PUBLIC_VGEN_URL || "https://github.com/rikkichy/rii.cat",
      
      // Feature Flags (will add more soon, maybe :3)
      enableSecretHint: process.env.NUXT_PUBLIC_ENABLE_SECRET_HINT || "true",
      enableSillyModes: process.env.NUXT_PUBLIC_ENABLE_SILLY_MODES || "true",
      
      // Defaults
      defaultBrainrotLevel: process.env.NUXT_PUBLIC_DEFAULT_BRAINROT_LEVEL || "0",
      
      // Portfolio
      portfolioYoutubePlaylist: process.env.NUXT_PUBLIC_PORTFOLIO_YOUTUBE_PLAYLIST || "https://github.com/rikkichy/rii.cat",
      portfolioBasicVideo: process.env.NUXT_PUBLIC_PORTFOLIO_BASIC_VIDEO || "https://github.com/rikkichy/rii.cat",
      portfolioAdvancedVideo: process.env.NUXT_PUBLIC_PORTFOLIO_ADVANCED_VIDEO || "https://github.com/rikkichy/rii.cat",
    }
  }
})