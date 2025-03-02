// app.vue or index.vue
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Settings Button -->
    <div class="fixed top-4 right-4">
      <UButton
        icon="i-heroicons-cog-6-tooth"
        color="gray"
        label="Settings"
        variant="ghost"
        @click="isSettingsModalOpen = true"
        aria-label="Open settings"
      />
    </div>

    <!-- Settings Modal -->
    <UModal v-model="isSettingsModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Settings</h3>
        </template>

        <div class="space-y-6 py-2">
          <div class="flex items-center justify-between">
            <span>Dark mode</span>
            <UToggle v-model="isDark" />
          </div>
          <div class="flex items-center justify-between">
            <span>Do not touch</span>
            <UToggle v-model="magicEnabled" />
          </div>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span>Brainrot Level</span>
              <span class="text-sm text-gray-500">{{ getBrainrotLabel }}</span>
            </div>
            <URange
              v-model="brainrotLevel"
              :step="25"
              :min="0"
              :max="100"
              class="w-full"
            />
          </div>
        </div>
      </UCard>
    </UModal>

    <main class="container mx-auto px-4 py-8">
      <!-- Profile Header -->
      <div class="max-w-2xl mx-auto mb-8">
        <UCard class="text-center">
          <div class="relative mb-4">
            <div class="h-32 bg-primary-500 rounded-t-lg"></div>
            <div class="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
          <NuxtImg
            preload
            placeholder
            quality="80"
            src="/assets/img/pfp.png"
            width="96"
            height="96"
            format="webp"
            loading="eager"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 object-cover"
          />
            </div>
          </div>
          
          <div class="mt-16 space-y-4">
            <div class="flex items-center justify-center gap-2">
              <h1 class="text-2xl font-bold">{{ getProfileName }}</h1>
              <UTooltip text="Verified silly meow">
                <UIcon 
                  name="i-material-symbols-verified-rounded" 
                  class="w-6 h-6 text-primary" />
              </UTooltip>
            </div>
            <p class="text-gray-600 dark:text-gray-400">{{ getProfileDescription }}</p>
            
            <UButton
              color="primary"
              variant="soft"
              icon="i-heroicons-envelope"
              label="Contact"
              @click="openContactModal"
            />

            <div class="grid grid-cols-2 gap-4 pt-4">
              <div>
                <span class="text-sm text-gray-500">Oshi Marks</span>
                <p class="text-lg">💢🎩</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">Alt. names</span>
                <p>Rikki, Gremliko</p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Social Links -->
      <section class="max-w-2xl mx-auto mb-8">
        <h2 class="text-lg font-semibold mb-4">Social Links</h2>
        <div class="space-y-3">
          <UCard v-for="link in getSocialLinks" :key="link.name">
            <a :href="link.url" target="_blank" rel="noopener" class="flex items-center justify-between p-3">
              <div class="flex items-center gap-3">
                <UIcon :name="link.icon" class="w-5 h-5" />
                <span>{{ link.name }}</span>
              </div>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </a>
          </UCard>
        </div>
      </section>

      <!-- Projects -->
      <section class="max-w-2xl mx-auto mb-8">
        <h2 class="text-lg font-semibold mb-4">Projects</h2>
        <div class="space-y-3">
          <UCard>
            <NuxtLink to="/portfolio" class="flex items-center justify-between p-3">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-folder" class="w-5 h-5" />
                <span>{{ getProjects.portfolio }}</span>
              </div>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </UCard>

          <UCard class="bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center justify-between p-3">
              <div class="flex items-center gap-3">
                <UIcon name="i-mdi-rabbit" class="w-5 h-5 text-gray-400" />
                <span class="text-gray-400">{{ getProjects.grem }}</span>
              </div>
              <UBadge color="gray" variant="subtle" label="Coming Soon" />
            </div>
          </UCard>
        </div>
      </section>
      <!-- Footer -->
      <footer class="max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-8">
        <p>Made with 💖 by me.</p>
        <p class="flex items-center justify-center gap-1">
          <UIcon name="i-ri-open-source-fill" class="w-5 h-5 text-gray-600 dark:text-gray-400" />
          Distributed under the
          <NuxtLink 
            to="https://github.com/rikkichy/rii.cat" 
            target="_blank"
            class="text-primary hover:underline">
            GPL-3.0 License.
          </NuxtLink>
        </p>
      </footer>

    </main>

    <!-- Contact Modal -->
    <UModal v-model="isContactModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Business Inquiries Only</h3>
        </template>

        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Please proceed only if you represent a company.
          Fan mail will not be responded to :(
        </p>

        <template #footer>
          <div class="flex flex-col gap-2">
            <UButton
              block
              color="primary"
              @click="openEmailModal"
              label="I understand, continue"
            />
            <UButton
              block
              color="gray"
              variant="ghost"
              @click="isContactModalOpen = false"
              label="Cancel"
            />
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Email Modal -->
    <UModal v-model="isEmailModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Contact</h3>
        </template>

      <div class="space-y-4 mb-4">
          <div class="text-center">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mail</h4>
            <p 
              class="font-mono bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-2 rounded inline-block cursor-pointer transition-colors"
              :class="{ 'text-green-500': isCopied }"
              @click="copyEmail"
            >
              rikkiads@pm.me
            </p>
          </div>
          
          <div class="text-center">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Manager's Discord</h4>
            <p 
              class="font-mono bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-2 rounded inline-block cursor-pointer transition-colors"
              :class="{ 'text-green-500': isDiscordCopied }"
              @click="copyDiscord"
            >
              moustache.man
            </p>
          </div>
        </div>

        <p class="text-sm text-gray-500 text-center">
          Click to copy
        </p>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

// State management with refs
const isContactModalOpen = ref(false)
const isEmailModalOpen = ref(false)
const isSettingsModalOpen = ref(false)
const isCopied = ref(false)
const magicEnabled = ref(false)
const brainrotLevel = ref(0)

// Base data
const baseLinks = [
  { 
    name: 'Discord', 
    icon: 'i-bxl-discord-alt', 
    url: 'https://discord.gg/d9YtEe7Hr6' 
  },
  { 
    name: 'Twitch', 
    icon: 'i-bxl-twitch', 
    url: 'https://twitch.tv/rikkichy' 
  },
  { 
    name: 'Twitter/X', 
    icon: 'i-bxl-twitter', 
    url: 'https://x.com/rikkichy' 
  }
]

// Computed properties
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const getBrainrotLabel = computed(() => {
  switch (brainrotLevel.value) {
    case 0: return 'Normal'
    case 25: return 'Silly'
    case 50: return 'Very Silly'
    case 75: return 'Extra Silly'
    case 100: return 'MAXIMUM SILLY'
    default: return 'Normal'
  }
})

const getProfileName = computed(() => {
  switch (brainrotLevel.value) {
    case 0: return 'Rikkichy'
    case 25: return 'Cat :3'
    case 50: return 'Rizzichy'
    case 75: return '🔫 gato mafioso'
    case 100: return 'RIZZ MAFIA BOSS'
    default: return 'Rikkichy'
  }
})

const getProfileDescription = computed(() => {
  const baseText = 'Mafia cat, on the Internet'
  return transformText(baseText)
})

const getSocialLinks = computed(() => {
  return baseLinks.map(link => ({
    ...link,
    name: transformSocialName(link.name)
  }))
})

const getProjects = computed(() => ({
  portfolio: transformProjectName('Portfolio'),
  grem: transformProjectName('Grem')
}))

// Transform functions
const transformSocialName = (name: string) => {
  switch (brainrotLevel.value) {
    case 25: return `${name} :3`
    case 50: return `I like my ${name} drippy 🧀`
    case 75: return `I bought my ${name}, in Egypt`
    case 100: return `🐈🐈 hawk tuah mah ${name.toUpperCase()} 🐈🐈`
    default: return name
  }
}

const transformProjectName = (name: string) => {
  switch (brainrotLevel.value) {
    case 25: return `Nyah ${name}`
    case 50: return `I'VE SEEN THIS ${name} BEFORE ❌🟥`
    case 75: return `Put the ${name} in the bag 💀🍟`
    case 100: return `🐈🐈 hawk tuah mah ${name.toUpperCase()} 🐈🐈`
    default: return name
  }
}

const transformText = (text: string) => {
  switch (brainrotLevel.value) {
    case 25: return `${text} :3`
    case 50: return `${text} (real)`
    case 75: return `${text}, professional rizzler and yapper`
    case 100: return `🙀🙀🙀🙀🙀🙀 SIGMA MALE VTUBER 🐈🐈🐈🐈🐈🐈`
    default: return text
  }
}

// Methods
const openContactModal = () => {
  isContactModalOpen.value = true
}

const openEmailModal = () => {
  isContactModalOpen.value = false
  isEmailModalOpen.value = true
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('rikkiads@pm.me')
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}

// Page transition
definePageMeta({
  pageTransition: {
    name: 'slide-fade'
  }
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>