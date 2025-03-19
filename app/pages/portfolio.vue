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
                color="success"
                variant="solid"
                size="lg"
                :to="runtimeConfig.public.vgenUrl"
              >
                Commission me on VGen!
              </UButton>
              <UButton
                block
                icon="i-cib-ko-fi"
                color="info"
                variant="solid"
                size="lg"
                :to="runtimeConfig.public.kofiUrl"
              >
                Support me on Ko-Fi!
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
            @update:selected="handleTabChange"
          >
            <template v-for="project in projects" :key="project.label" #[project.label]>
              <p class="mb-4">{{ project.content }}</p>
              <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md">
                <ScriptYouTubePlayer ref="video" :video-id="project.videoId">
                  <template #placeholder="{ placeholder }">
                    <img :src="placeholder" alt="Video Placeholder" class="absolute top-0 left-0 w-full h-full">
                  </template>
                </ScriptYouTubePlayer>
              </div>
            </template>
          </UTabs>
          
          <p class="mb-4">
            If videos are not showing up or you want to see more, you can click this button below!
          </p>
          <UButton
            block
            icon="i-ri-youtube-fill"
            size="lg"
            :to="runtimeConfig.public.portfolioYoutubePlaylist"
            variant="solid"
          >
            YouTube Playlist
          </UButton>
        </UCard>
      </div>

      <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Coding stuff ☕</h2>
      <div class="max-w-2xl mx-auto mb-8 space-y-4">
        <UCard>
          <h3 class="text-lg font-medium mb-3">I can make a custom Discord bot/website for you!</h3>
          <p class="mb-2">
            I made this website all by myself!
          </p>
          <p class="mb-4">You can see my other projects on my GitHub!</p>
          <UButton
            block
            color="neutral"
            icon="i-ri-github-fill"
            size="lg"
            :to="runtimeConfig.public.githubUrl"
            variant="solid"
          >
            My GitHub
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
import { ref, onMounted } from 'vue'

const runtimeConfig = useRuntimeConfig()
const projects = [
  {
    icon: 'i-ri-movie-2-fill',
    label: 'Basic',
    content:
      'Does not include captions & their animation, just some camera movements to make your clip more engaging 👀',
    videoId: runtimeConfig.public.portfolioBasicVideo
  },
  {
    icon: 'i-ri-movie-2-ai-fill',
    label: 'Advanced',
    content:
      'Includes animated captions (different styles), smooth camera animations, memes, image animations and more!',
    videoId: runtimeConfig.public.portfolioAdvancedVideo
  },
]

const activeTab = ref(projects[0].label)

function handleTabChange(label: string) {
  activeTab.value = label
}
</script>