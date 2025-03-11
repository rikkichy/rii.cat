<!-- components/CommandPalette.vue -->
<template>
  <div>
    <UModal v-model="open">
      <UCommandPalette
        ref="commandPaletteRef"
        :groups="filteredGroups"
        :fuse="{ resultLimit: 20 }"
        placeholder="Wait, you shouldn't be here.."
        @update:model-value="onSelect"
        :autoselect="true"
      />
    </UModal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['unlockSecret'])
const open = ref(false)
const commandPaletteRef = ref(null)
const isSettingsModalOpen = useState('settingsModal', () => false)
const secretEnabled = useState('secretEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => 0)
const router = useRouter()
const toast = useToast()

const commandGroups = computed(() => [
  {
    key: 'navigation',
    heading: 'Navigation',
    commands: [
      {
        id: 'home',
        icon: 'i-heroicons-home',
        label: 'Home',
        to: '/',
      },
      {
        id: 'portfolio',
        icon: 'i-ri-pencil-ruler-2-fill',
        label: 'Portfolio',
        to: '/portfolio',
      },
    ],
  },
{
    key: 'actions',
    heading: 'Actions',
    commands: [
      {
        id: 'settings',
        icon: 'i-ri-settings-2-fill',
        label: 'Open Settings',
        click: () => {
          isSettingsModalOpen.value = true
        },
      },
      {
        id: 'theme',
        icon: 'i-heroicons-moon',
        label: 'Toggle Dark Mode',
        click: () => {
          const colorMode = useColorMode()
          colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        },
      },
      {
        id: 'silver-key',
        icon: 'i-heroicons-key',
        label: 'Silver Key',
        click: () => {
          toast.add({
            title: 'Hmm...',
            description: 'Seems like it doesn\'t work...',
            icon: 'i-heroicons-lock-closed',
            timeout: 3500
          })
        },
      },
      {
        id: 'bronze-key',
        icon: 'i-heroicons-key',
        label: 'Bronze Key',
        click: () => {
          toast.add({
            title: 'Hmm...',
            description: 'Seems like it doesn\'t work...',
            icon: 'i-heroicons-lock-closed',
            timeout: 3500
          })
        },
      },
      {
        id: 'golden-key',
        icon: 'i-heroicons-key',
        label: 'Golden Key',
        click: () => {
          secretEnabled.value = true
          toast.add({
            title: 'Something changed..?',
            description: 'You heard a clicking sound near settings..',
            icon: 'i-heroicons-lock-open',
            timeout: 3500
          })
          emit('unlockSecret')
        },
      },
      {
        id: 'rusty-key',
        icon: 'i-heroicons-key',
        label: 'Rusty Key',
        click: () => {
          toast.add({
            title: 'Hmm...',
            description: 'Seems like it doesn\'t work...',
            icon: 'i-heroicons-lock-closed',
            timeout: 3500
          })
        },
      },
      {
        id: 'crystal-key',
        icon: 'i-heroicons-key',
        label: 'Crystal Key',
        click: () => {
          toast.add({
            title: 'Hmm...',
            description: 'Seems like it doesn\'t work...',
            icon: 'i-heroicons-lock-closed',
            timeout: 3500
          })
        },
      },
    ],
  },
  {
    key: 'silly',
    heading: 'Silly Settings',
    commands: [
      {
        id: 'normal',
        icon: 'i-heroicons-face-smile',
        label: 'Normal Mode',
        click: () => {
          brainrotLevel.value = 0
          toast.add({
            title: 'Normal Mode Activated',
            icon: 'i-heroicons-face-smile',
            timeout: 2000
          })
        },
      },
      {
        id: 'silly',
        icon: 'i-heroicons-face-smile',
        label: 'Silly Mode',
        click: () => {
          brainrotLevel.value = 25
          toast.add({
            title: 'Silly Mode Activated :3',
            icon: 'i-heroicons-face-smile',
            timeout: 2000
          })
        },
      },
      {
        id: 'very-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Very Silly Mode',
        click: () => {
          brainrotLevel.value = 50
          toast.add({
            title: 'Very Silly Mode Activated (real)',
            icon: 'i-heroicons-face-smile',
            timeout: 2000
          })
        },
      },
      {
        id: 'extra-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Extra Silly Mode',
        click: () => {
          brainrotLevel.value = 75
          toast.add({
            title: 'Extra Silly Mode Activated',
            description: 'professional rizzler and yapper',
            icon: 'i-heroicons-face-smile',
            timeout: 2000
          })
        },
      },
      {
        id: 'maximum-silly',
        icon: 'i-heroicons-face-smile',
        label: 'MAXIMUM SILLY MODE',
        click: () => {
          brainrotLevel.value = 100
          toast.add({
            title: '🙀🙀🙀CAT🐈🐈🐈',
            icon: 'i-heroicons-face-smile',
            timeout: 2000
          })
        },
      },
    ],
  },
  {
    key: 'social',
    heading: 'Social Links',
    commands: [
      {
        id: 'discord',
        icon: 'i-ri-discord-fill',
        label: 'Discord',
        href: 'https://discord.gg/d9YtEe7Hr6',
        target: '_blank',
      },
      {
        id: 'twitch',
        icon: 'i-ri-twitch-fill',
        label: 'Twitch',
        href: 'https://twitch.tv/rikkichy',
        target: '_blank',
      },
      {
        id: 'twitter',
        icon: 'i-ri-twitter-x-fill',
        label: 'Twitter',
        href: 'https://x.com/rikkichy',
        target: '_blank',
      },
    ],
  },
])

const filteredGroups = computed(() => {
  return commandGroups.value
})

function onSelect(option) {
  if (option.click) {
    option.click()
  } else if (option.to) {
    router.push(option.to)
  } else if (option.href) {
    window.open(option.href, option.target || '_self')
  }
  open.value = false
}

const toggleTerminal = () => {
  open.value = !open.value
}

defineExpose({
  open,
  toggleTerminal
})
</script>