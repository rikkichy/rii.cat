<template>
  <UContainer>
    <main class="py-8">
      <div class="max-w-2xl mx-auto mb-8">
        <UCard class="text-center">
          <div class="relative mb-4">
            <div class="h-32 bg-primary-500 rounded-t-lg"></div>
            <div class="absolute left-1/2 -bottom-12 transform -translate-x-1/2">
              <NuxtImg
                src="/assets/img/me.png"
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
              icon="i-ri-send-plane-2-fill"
              label="Contact"
              @click="openContactModal"
            />

            <UDivider />

            <UCard>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <UBadge color="gray" variant="subtle" label="Oshi Marks" />
                  <p class="text-lg">💢🎩</p>
                </div>
                <div>
                  <UBadge color="gray" variant="subtle" label="Alt. names" />
                  <p>Rikki</p>
                </div>
              </div>
            </UCard>
          </div>
        </UCard>
      </div>

      <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Social Links</h2>
      <div class="max-w-2xl mx-auto mb-8 space-y-3">
        <UCard v-for="link in getSocialLinks" :key="link.name">
          <NuxtLink :to="link.url" target="_blank" rel="noopener" class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
              <UIcon :name="link.icon" class="w-5 h-5" />
              <span>{{ link.name }}</span>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </UCard>
      </div>

      <h2 class="text-lg font-semibold max-w-2xl mx-auto mb-4">Projects</h2>
      <div class="max-w-2xl mx-auto mb-8 space-y-3">
        <UCard>
          <NuxtLink to="/portfolio" class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
              <UIcon name="i-ri-pencil-ruler-2-fill" class="w-5 h-5" />
              <span>{{ getProjects.portfolio }}</span>
            </div>
            <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </UCard>

        <UCard disabled>
          <div class="flex items-center justify-between p-3">
            <div class="flex items-center gap-3">
              <UIcon name="i-ri-chrome-fill" class="w-5 h-5" />
              <span>{{ getProjects.xenon }}</span>
            </div>
            <UBadge color="gray" variant="subtle" label="Coming Soon" />
          </div>
        </UCard>
      </div>
    </main>

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

    <UModal v-model="isEmailModalOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Contact</h3>
        </template>

        <div class="space-y-4 mb-4">
          
          <UFormGroup label="Mail">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-clipboard"
              class="font-mono w-full dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200"
              @click="copyEmail"
            >
              {{ runtimeConfig.public.email }}
            </UButton>
          </UFormGroup>
          
          <UFormGroup label="Manager's Discord">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-clipboard"
              class="font-mono w-full dark:bg-gray-800 dark:hover:bg-gray-700 bg-gray-100 hover:bg-gray-200"
              @click="copyDiscord"
            >
              {{ runtimeConfig.public.managerDiscord }}
            </UButton>
          </UFormGroup>
        </div>

        <p class="text-sm text-gray-500 text-center">
          Click to copy
        </p>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const colorMode = useColorMode()
const useCopy = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy:', err)
    return false
  }
}

const isContactModalOpen = useState('contactModal', () => false)
const isEmailModalOpen = useState('emailModal', () => false)
const isSettingsModalOpen = useState('settingsModal', () => false)
const magicEnabled = useState('magicEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0)

const baseLinks = [
  { 
    name: 'Discord', 
    icon: 'i-ri-discord-fill', 
    url: runtimeConfig.public.discordUrl 
  },
  { 
    name: 'Twitch', 
    icon: 'i-ri-twitch-fill', 
    url: runtimeConfig.public.twitchUrl 
  },
  { 
    name: 'Twitter', 
    icon: 'i-ri-twitter-x-fill', 
    url: runtimeConfig.public.twitterUrl
  }
]

const getProfileName = computed(() => {
  switch (brainrotLevel.value) {
    case 0: return runtimeConfig.public.siteName
    case 25: return 'Cat :3'
    case 50: return 'Rizzichy'
    case 75: return '🔫 gato mafioso'
    case 100: return 'RIZZ MAFIA BOSS'
    default: return runtimeConfig.public.siteName
  }
})

const getProfileDescription = computed(() => {
  const baseText = runtimeConfig.public.siteDescription
  return transformText(baseText)
})

const getSocialLinks = computed(() => {
  return baseLinks.map(link => ({
    ...link,
    name: transformSocialName(link.name)
  }))
})

const getProjects = computed(() => ({
  portfolio: transformProjectName('Commissions'),
  xenon: transformProjectName('Xenon for Twitter')
}))

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
    case 100: return `🙀🙀🙀CAT🐈🐈🐈`
    default: return text
  }
}

const openContactModal = () => {
  isContactModalOpen.value = true
}

const openEmailModal = () => {
  isContactModalOpen.value = false
  isEmailModalOpen.value = true
}

const copyEmail = async () => {
  await useCopy(runtimeConfig.public.email)
  const toast = useToast()
  toast.add({
    title: 'Copied!',
    description: 'Now my email address is somewhere in your clipboard..',
    icon: 'i-ri-checkbox-multiple-fill',
    timeout: 3500
  })
  isEmailModalOpen.value = false
}

const copyDiscord = async () => {
  await useCopy(runtimeConfig.public.managerDiscord)
  const toast = useToast()
  toast.add({
    title: 'Copied!',
    description: 'Please do not annoy my manager..',
    icon: 'i-ri-checkbox-multiple-fill',
    timeout: 3500
  })
  isEmailModalOpen.value = false
}
</script>