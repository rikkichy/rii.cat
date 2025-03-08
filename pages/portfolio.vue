<template>
  <div>
    <UContainer>
      <UButton
        icon="i-heroicons-home"
        color="gray"
        variant="ghost"
        to="/"
        class="fixed top-4 left-4 transition-transform duration-200 hover:translate-y-1"
      />
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
            <UButtonGroup orientation="vertical" class="w-full gap-4">
              <UButton
                block
                icon="i-mdi-offer"
                color="lime"
                variant="solid"
                size="lg"
                to="https://vgen.co/Rikkichy"
                class="transition-transform duration-200 hover:translate-y-1"
              >
                Commission me on VGen!
              </UButton>
              <UButton
                block
                icon="i-cib-ko-fi"
                color="gray"
                variant="solid"
                size="lg"
                to="https://ko-fi.com/Rikkichy"
                class="transition-transform duration-200 hover:translate-y-1"
              >
                Support me on Ko-Fi!
              </UButton>
            </UButtonGroup>
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
              class="mb-6"
            >
              <template v-for="project in projects" :key="project.label" #[project.label]>
                <p class="mb-4">{{ project.content }}</p>
                <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
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
            <UButton
              color="red"
              icon="i-bxl-youtube"
              size="lg"
              to="https://www.youtube.com/watch?v=pdNzXv8QBKg&list=PLR_6NYGLGA6YfjbgP8E-tmRRB8NAAN5t-"
              class="transition-transform duration-200 hover:translate-y-1"
              variant="solid"
            >
              YouTube Playlist
            </UButton>
          </section>

          <section class="projects mb-8">
            <UDivider label="Coding stuff ☕" />
            <h3>I can make a custom Discord bot/website for you!</h3>
            <p>
              I made this website all by myself, using Nuxt.js framework! You can click the "Home" button to see
              my main page 👀
            </p>
            <p>You can see my other projects on my GitHub!</p>
            <UButton
              color="white"
              icon="i-bxl-github"
              size="lg"
              to="https://github.com/ruecat?tab=repositories"
              class="transition-transform duration-200 hover:translate-y-1"
              variant="solid"
            >
              GitHub Projects
            </UButton>
          </section>
        </main>
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="yellow"
          variant="solid"
          title="This is important!"
          description="I will send you only my work (bot, website, etc). You have to pay me extra for hosting, domain DNS setup, Cloudflare anti-DDoS (or you can self-host it for free!)"
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

definePageMeta({
  pageTransition: {
    name: 'rotate',
    mode: 'out-in'
  }
})
</script>