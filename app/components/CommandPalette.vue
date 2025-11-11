<template>
  <div>
    <UModal v-model:open="open" @close="handleModalClose">
      <template #content>
        <UCommandPalette
          ref="commandPaletteRef"
          v-model="selectedItem"
          :groups="commandGroups"
          :fuse="{ resultLimit: 20 }"
          placeholder="Wait, you shouldn't be here.."
          :autoselect="true"
          @update:model-value="handleSelect"
          @close="handleClose"
        />
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const emit = defineEmits(['unlockSecret'])
const open = ref(false)
const selectedItem = ref(null)
const commandPaletteRef = ref(null)
const isSettingsModalOpen = useState('settingsModal', () => false)
const secretEnabled = useState('secretEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0)
const router = useRouter()
const toast = useToast()
const colorMode = useColorMode()

const commandGroups = computed(() => [
  {
    id: 'navigation',
    label: 'Navigation',
    items: [
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
    id: 'actions',
    label: 'Actions',
    items: [
      {
        id: 'settings',
        icon: 'i-ri-settings-2-fill',
        label: 'Open Settings',
        onClick() {
          isSettingsModalOpen.value = true
        },
      },
      {
        id: 'theme',
        icon: 'i-heroicons-moon',
        label: 'Toggle Dark Mode',
        onClick() {
          colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
        },
      },
      {
        id: 'silver-key',
        icon: 'i-heroicons-key',
        label: 'Silver Key',
        onClick() {
          showLockedKeyToast()
        },
      },
      {
        id: 'bronze-key',
        icon: 'i-heroicons-key',
        label: 'Bronze Key',
        onClick() {
          showLockedKeyToast()
        },
      },
      {
        id: 'golden-key',
        icon: 'i-heroicons-key',
        label: 'Golden Key',
        onClick() {
          secretEnabled.value = true
          toast.add({
            title: 'Something changed..?',
            description: 'You heard a clicking sound near settings..',
            icon: 'i-heroicons-lock-open',
            duration: 3500
          })
          emit('unlockSecret')
        },
      },
      {
        id: 'rusty-key',
        icon: 'i-heroicons-key',
        label: 'Rusty Key',
        onClick() {
          showLockedKeyToast()
        },
      },
      {
        id: 'crystal-key',
        icon: 'i-heroicons-key',
        label: 'Crystal Key',
        onClick() {
          showLockedKeyToast()
        },
      },
    ],
  },
  {
    id: 'silly',
    label: 'Silly Settings',
    items: [
      {
        id: 'normal',
        icon: 'i-heroicons-face-smile',
        label: 'Normal Mode',
        onClick() {
          brainrotLevel.value = 0
          toast.add({
            title: 'Normal Mode Activated',
            icon: 'i-heroicons-face-smile',
            duration: 2000
          })
        },
      },
      {
        id: 'silly',
        icon: 'i-heroicons-face-smile',
        label: 'Silly Mode',
        onClick() {
          brainrotLevel.value = 25
          toast.add({
            title: 'Silly Mode Activated :3',
            icon: 'i-heroicons-face-smile',
            duration: 2000
          })
        },
      },
      {
        id: 'very-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Very Silly Mode',
        onClick() {
          brainrotLevel.value = 50
          toast.add({
            title: 'Very Silly Mode Activated (real)',
            icon: 'i-heroicons-face-smile',
            duration: 2000
          })
        },
      },
      {
        id: 'extra-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Extra Silly Mode',
        onClick() {
          brainrotLevel.value = 75
          toast.add({
            title: 'Extra Silly Mode Activated',
            description: 'professional rizzler and yapper',
            icon: 'i-heroicons-face-smile',
            duration: 2000
          })
        },
      },
      {
        id: 'maximum-silly',
        icon: 'i-heroicons-face-smile',
        label: 'MAXIMUM SILLY MODE',
        onClick() {
          brainrotLevel.value = 100
          toast.add({
            title: '🙀🙀🙀CAT🐈🐈🐈',
            icon: 'i-heroicons-face-smile',
            duration: 2000
          })
        },
      },
    ],
  },
  {
    id: 'social',
    label: 'Social Links',
    items: [
      {
        id: 'discord',
        icon: 'i-ri-discord-fill',
        label: 'Discord',
        to: runtimeConfig.public.discordUrl,
        target: '_blank',
      },
      {
        id: 'twitch',
        icon: 'i-ri-twitch-fill',
        label: 'Twitch',
        to: runtimeConfig.public.twitchUrl,
        target: '_blank',
      },
      {
        id: 'twitter',
        icon: 'i-ri-twitter-x-fill',
        label: 'Twitter',
        to: runtimeConfig.public.twitterUrl,
        target: '_blank',
      },
    ],
  },
])

function showLockedKeyToast() {
  toast.add({
    title: 'Hmm...',
    description: 'Seems like it doesn\'t work...',
    icon: 'i-heroicons-lock-closed',
    duration: 3500
  })
}

function handleSelect(item) {
  if (!item) return

  if (item.onClick && typeof item.onClick === 'function') {
    item.onClick()
  } else if (item.onSelect && typeof item.onSelect === 'function') {
    item.onSelect()
  } else if (item.action && typeof item.action === 'function') {
    item.action()
  } else if (item.to) {
    if (item.to.startsWith('http')) {
      window.open(item.to, item.target || '_self')
    } else {
      router.push(item.to)
    }
  }
  
  open.value = false
  
  nextTick(() => {
    selectedItem.value = null
  })
}

function handleClose() {
  open.value = false
}

function handleModalClose() {
  selectedItem.value = null
}

function toggleTerminal() {
  selectedItem.value = null
  
  open.value = !open.value
}

defineExpose({
  open,
  toggleTerminal
})
</script>