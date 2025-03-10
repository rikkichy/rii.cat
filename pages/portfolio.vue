<template>
  <div>
    <UContainer>
      <UCard class="max-w-2xl px-4 py-10 mx-auto sm:px-8">
        <main
          class="max-w-none prose dark:prose-invert dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400
                 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b
                 hover:prose-a:border-solid hover:prose-a:border-primary-400"
        >
          <section class="intro mb-8">
            <h1>Portfolio</h1>
            <p>
              I make edits in Premiere Pro & After Effects, also I make custom Discord bots...
              and websites too!
            </p>
            <div class="not-prose grid gap-4 mb-6">
              <UButton
                block
                icon="i-ri-attachment-line"
                color="lime"
                variant="solid"
                size="lg"
                to="https://vgen.co/Rikkichy"
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
                to="https://ko-fi.com/Rikkichy"
                class="transition-all duration-300 hover:shadow-lg hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transform hover:-translate-y-1 relative overflow-hidden group"
              >
                <span class="relative z-10 font-medium">Support me on Ko-Fi!</span>
                <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </UButton>
            </div>
          </section>

          <section class="projects mb-8">
            <USectionTitle title="I make... edits!" />
            <p>
              Currently, I edit in 2 styles: Basic and Advanced. Click these buttons to see the difference!
            </p>
            <UTabs
              :items="projects.map(project => ({ 
                label: project.label, 
                slot: project.label,
                icon: project.icon
              }))"
              class="mb-6 not-prose"
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
            
            <p>
              If videos are not showing up or you want to see more, you can click this button below!
            </p>
            <div class="not-prose">
              <UButton
                block
                color="red"
                icon="i-ri-youtube-fill"
                size="lg"
                to="https://www.youtube.com/watch?v=pdNzXv8QBKg&list=PLR_6NYGLGA6YfjbgP8E-tmRRB8NAAN5t-"
                class="transition-all duration-300 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50 transform hover:-translate-y-1 relative overflow-hidden group"
                variant="solid"
              >
                <span class="relative z-10 font-medium">YouTube Playlist</span>
                <span class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </UButton>
            </div>
          </section>

          <section class="projects mb-8">
            <UDivider label="Coding stuff ☕" />
            <h3>I can make a custom Discord bot/website for you!</h3>
            <p>
              I made this website all by myself, using Nuxt.js framework! You can click the "Home" button to see
              my main page 👀
            </p>
            <p>You can see my other projects on my GitHub!</p>
            <div class="not-prose">
              <UButton
                block
                color="gray"
                icon="i-ri-github-fill"
                size="lg"
                to="https://github.com/rikkichy?tab=repositories"
                class="transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white transform hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/20 relative overflow-hidden group"
                variant="solid"
              >
                <span class="relative z-10 font-medium">My GitHub Repos</span>
                <span class="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </UButton>
            </div>
          </section>
        </main>
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="yellow"
          variant="soft"
          title="This is important!"
          description="I will send you only my work (bot, website, etc). You have to pay me extra for hosting, domain DNS setup, Cloudflare anti-DDoS (or you can self-host it for free!)"
          class="border border-yellow-300 dark:border-yellow-800 shadow-sm"
        />
      </UCard>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const projects = [
  {
    icon: 'i-ri-movie-2-fill',
    label: 'Basic',
    content:
      'I do these pretty fast, does not include captions & their animation, just some camera movements to make your clip more engaging 👀',
    videoSrc:
      'https://www.youtube.com/embed/ZYFrF4HUVv0?si=w5EDatKTk67m52_O',
  },
  {
    icon: 'i-ri-movie-2-ai-fill',
    label: 'Advanced',
    content:
      'Includes animated captions (different styles), smooth camera animations, memes, image animations and more!',
    videoSrc:
      'https://www.youtube.com/embed/pdNzXv8QBKg?si=SWBszV8rI7vE8mZF',
  },
]
</script>