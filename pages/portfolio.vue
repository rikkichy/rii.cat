<template>
  <UButton
    icon="i-heroicons-home"
    color="gray"
    variant="ghost"
    label="Home"
    to="/"
    class="fixed top-4 left-4 transition-transform duration-200 hover:translate-y-1"
  />
  <div class="portfolio-container">
    <div class="max-w-2xl px-4 py-10 mx-auto sm:px-8 sm:shadow">
      <main
        class="max-w-none prose dark:prose-invert dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400
               prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b
               hover:prose-a:border-solid hover:prose-a:border-primary-400"
      >
        <section class="intro mb-8">
          <h1>🐱 My Portfolio</h1>
          <p>
            Sup, I'm Rikkichy! I make edits in Premiere Pro & After Effects, also I make custom Discord bots...
            and websites too!
          </p>
          <div class="mb-4">
            <UButton
              block
              icon="i-mdi-offer"
              color="lime"
              variant="solid"
              size="lg"
              label="Commission me on VGen!"
              to="https://vgen.co/Rikkichy"
              class="transition-transform duration-200 hover:translate-y-1"
            />
          </div>
          <div class="mb-4">
            <UButton
              block
              icon="i-cib-ko-fi"
              color="gray"
              variant="solid"
              size="lg"
              label="Support me on Ko-Fi!"
              to="https://ko-fi.com/Rikkichy"
              class="transition-transform duration-200 hover:translate-y-1"
            />
          </div>
        </section>

        <section class="projects mb-8">
          <h3>I make... edits!</h3>
          <p>
            Currently, I edit in 2 styles: Basic and Advanced. Click these buttons to see the difference!
          </p>
          <div
            class="project"
            v-for="(project, index) in projects"
            :key="index"
          >
            <p>
              <UAccordion
                :default-open="index === 0"
                :icon="project.icon"
                size="xl"
                :items="[{ label: project.label, content: project.content }]"
              />
            </p>
            <iframe
              :src="project.videoSrc"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <p>
            If videos are not showing up or you want to see more, you can click this button below!
          </p>
          <UButton
            truncate
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
          <UDivider label="Coding stuff ☕" type="dashed" />
          <h3>I can make a custom Discord bot/website for you!</h3>
          <p>
            I made this website all by myself, using Nuxt.js framework! You can click the "Home" button to see
            my main page 👀
          </p>
          <p>You can see my other projects on my GitHub!</p>
          <UButton
            truncate
            color="white"
            icon="i-bxl-github"
            size="lg"
            label="GitHub Projects"
            to="https://github.com/ruecat?tab=repositories"
            class="transition-transform duration-200 hover:translate-y-1"
            variant="solid"
          />
        </section>
      </main>
      <UAlert
        icon="i-heroicons-exclamation-triangle"
        color="yellow"
        variant="solid"
        title="This is important!"
        description="I will send you only my work (bot, website, etc). You have to pay me extra for hosting, domain DNS setup, Cloudflare anti-DDoS (or you can self-host it for free!)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'rotate',
  },
})

const projects = [
  {
    icon: 'i-mdi-rabbit',
    label: 'Basic Style',
    content:
      'I do these pretty fast, does not include captions & their animation, just some camera movements to make your clip more engaging 👀',
    videoSrc:
      'https://www.youtube.com/embed/ZYFrF4HUVv0?si=w5EDatKTk67m52_O',
  },
  {
    icon: 'i-mdi-auto-fix',
    label: 'Advanced Style',
    content:
      'Includes animated captions (different styles), smooth camera animations, memes, image animations and more!',
    videoSrc:
      'https://www.youtube.com/embed/pdNzXv8QBKg?si=SWBszV8rI7vE8mZF',
  },
]
</script>

<style scoped>
.portfolio-container {
  padding: 20px;
}

.intro,
.projects {
  margin-bottom: 2rem;
}

.project {
  margin-bottom: 1.5rem;
}

.project iframe {
  width: 100%;
  height: 315px;
  border: none;
}
</style>
