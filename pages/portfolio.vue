<template>
  <UContainer>
    <main class="py-8">
      <div class="max-w-2xl mx-auto mb-8">
        <UCard class="text-center">
          <div class="py-4 space-y-4">
            <h1 class="text-2xl font-bold">Portfolio</h1>
            <p class="text-gray-600 dark:text-gray-400">
              I make edits in Premiere Pro & After Effects, also I make custom Discord bots...
              and websites too!
            </p>
            
            <div class="grid gap-4">
              <UButton
                block
                icon="i-ri-attachment-line"
                color="lime"
                variant="solid"
                size="lg"
                :to="runtimeConfig.public.vgenUrl"
                class="transition-all duration-300 hover:shadow-lg hover:shadow-lime-200/50 dark:hover:shadow-lime-900/50 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span class="relative z-10 font-medium">Commission me on VGen!</span>
                <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </UButton>
              <UButton
                block
                icon="i-cib-ko-fi"
                color="blue"
                variant="solid"
                size="lg"
                :to="runtimeConfig.public.kofiUrl"
                class="transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span class="relative z-10 font-medium">Support me on Ko-Fi!</span>
                <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </UButton>
            </div>
          </div>
        </UCard>
      </div>

      <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">I can edit your clip/video!</h2>
      <div class="max-w-2xl mx-auto mb-8 space-y-4">
        <UCard>
          <p class="mb-4">
            I edit in 2 styles, click these tabs to see the difference!
          </p>
          <UTabs
            :items="projects.map(project => ({ 
              label: project.label, 
              slot: project.label,
              icon: project.icon
            }))"
            class="mb-6"
          >
            <template v-for="project in projects" :key="project.label" #[project.label]>
              <p class="mb-4">{{ project.content }}</p>
              <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
                <iframe
                  :src="project.videoSrc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  class="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </template>
          </UTabs>
          
          <p class="mb-4">
            If videos are not showing up or you want to see more, you can click this button below!
          </p>
          <UButton
            block
            color="red"
            icon="i-ri-youtube-fill"
            size="lg"
            :to="runtimeConfig.public.portfolioYoutubePlaylist"
            class="transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50 transform hover:-translate-y-1 relative overflow-hidden group"
            variant="solid"
          >
            <span class="relative z-10 font-medium">YouTube Playlist</span>
            <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </UButton>
        </UCard>
      </div>

      <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Coding stuff ☕</h2>
      <div class="max-w-2xl mx-auto mb-8 space-y-4">
        <UCard>
          <h3 class="text-lg font-medium mb-3">I can make a custom Discord bot/website for you!</h3>
          <p class="mb-2">
            I made this website all by myself, using Nuxt.js!
          </p>
          <p class="mb-4">You can see my other projects on my GitHub!</p>
          <UButton
            block
            color="gray"
            icon="i-ri-github-fill"
            size="lg"
            :to="runtimeConfig.public.githubUrl"
            class="transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/20 relative overflow-hidden group"
            variant="solid"
          >
            <span class="relative z-10 font-medium">My GitHub</span>
            <span class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </UButton>
        </UCard>
        
        <UCard>
          <UAlert
            icon="i-heroicons-exclamation-triangle"
            color="yellow"
            variant="soft"
            title="Please, read!"
            description="I will send you only my work (bot, website, etc). You have to pay me extra for hosting, domain DNS setup, Cloudflare anti-DDoS (or you can self-host it for free!)"
            class="border border-yellow-300 dark:border-yellow-800 shadow-sm"
          />
        </UCard>
      </div>
    </main>
  </UContainer>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()

const projects = [
  {
    icon: 'i-ri-movie-2-fill',
    label: 'Basic',
    content:
      'Does not include captions & their animation, just some camera movements to make your clip more engaging 👀',
    videoSrc: runtimeConfig.public.portfolioBasicVideo,
  },
  {
    icon: 'i-ri-movie-2-ai-fill',
    label: 'Advanced',
    content:
      'Includes animated captions (different styles), smooth camera animations, memes, image animations and more!',
    videoSrc: runtimeConfig.public.portfolioAdvancedVideo,
  },
]
</script>