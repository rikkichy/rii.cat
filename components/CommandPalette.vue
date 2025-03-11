<!-- components/CommandPalette.vue -->
<template>
  <div>
    <UModal v-model="open">
      <UCommandPalette
        :groups="filteredGroups"
        :fuse="{ resultLimit: 20 }"
        placeholder="You shouldn't be here.."
        @select="handleCommandSelection"
      />
    </UModal>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['unlockSecret'])
const open = ref(false)
const isSettingsModalOpen = useState('settingsModal', () => false)
const secretEnabled = useState('secretEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => 0)

// Command groups
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
      {
        id: 'about',
        icon: 'i-heroicons-information-circle',
        label: 'About',
        to: '/about',
      }
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
        action: () => {
          isSettingsModalOpen.value = true
        },
      },
      {
        id: 'theme',
        icon: 'i-heroicons-moon',
        label: 'Toggle Dark Mode',
        action: () => {
          const colorMode = useColorMode()
          colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
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
        action: () => {
          brainrotLevel.value = 0
        },
      },
      {
        id: 'silly',
        icon: 'i-heroicons-face-smile',
        label: 'Silly Mode',
        action: () => {
          brainrotLevel.value = 25
        },
      },
      {
        id: 'very-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Very Silly Mode',
        action: () => {
          brainrotLevel.value = 50
        },
      },
      {
        id: 'extra-silly',
        icon: 'i-heroicons-face-smile',
        label: 'Extra Silly Mode',
        action: () => {
          brainrotLevel.value = 75
        },
      },
      {
        id: 'maximum-silly',
        icon: 'i-heroicons-face-smile',
        label: 'MAXIMUM SILLY MODE',
        action: () => {
          brainrotLevel.value = 100
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
        to: 'https://discord.gg/d9YtEe7Hr6',
        target: '_blank',
      },
      {
        id: 'twitch',
        icon: 'i-ri-twitch-fill',
        label: 'Twitch',
        to: 'https://twitch.tv/rikkichy',
        target: '_blank',
      },
      {
        id: 'twitter',
        icon: 'i-ri-twitter-x-fill',
        label: 'Twitter',
        to: 'https://x.com/rikkichy',
        target: '_blank',
      },
    ],
  },
  {
    key: 'secret',
    heading: 'Secret Settings',
    commands: [
      {
        id: 'unlock-secret',
        icon: 'i-heroicons-key',
        label: 'Unlock Secret Settings',
        action: () => {
          secretEnabled.value = true
          const toast = useToast()
          toast.add({
            title: 'Secret Settings Unlocked!',
            description: 'You can now access the secret settings in the Settings panel',
            icon: 'i-heroicons-lock-open',
            timeout: 3500
          })
        },
      },
    ],
  },
])

const filteredGroups = computed(() => {
  const groups = commandGroups.value.filter(group => {
    // Hide the 'secret' group if not unlocked
    if (group.key === 'secret' && !secretEnabled.value) {
      return false
    }
    return true
  })
  
  if (!secretEnabled.value) {
    groups.push({
      key: 'secret-techniques',
      heading: 'Secret Techniques',
      commands: [
        {
          id: 'konami-code',
          icon: 'i-heroicons-key',
          label: 'Konami Code',
          shortcuts: ['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'],
          action: () => handleSecretUnlock('konami')
        }
      ]
    })
  }
  
  return groups
})

// Handle command selection
const handleCommandSelection = (command) => {
  if (command.action) {
    command.action()
  }
  
  // Close the command palette after selection
  open.value = false
}

// Set up Konami code detector
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
]
const konamiIndex = ref(0)

onMounted(() => {
  window.addEventListener('keydown', detectKonami)
})

onUnmounted(() => {
  window.removeEventListener('keydown', detectKonami)
})

// Detect Konami code
const detectKonami = (e) => {
  if (e.key === konamiCode[konamiIndex.value]) {
    konamiIndex.value++
    if (konamiIndex.value === konamiCode.length) {
      secretEnabled.value = true
      const toast = useToast()
      toast.add({
        title: 'Konami Code Activated!',
        description: 'Secret settings unlocked! Check the Settings panel',
        icon: 'i-heroicons-sparkles',
        timeout: 3500
      })
      konamiIndex.value = 0
    }
  } else {
    konamiIndex.value = 0
  }
}

// Method to toggle command palette
const toggleTerminal = () => {
  open.value = !open.value
}

// Method to handle secret unlock from command palette
const handleSecretUnlock = (type) => {
  if (type === 'konami') {
    secretEnabled.value = true
    const toast = useToast()
    toast.add({
      title: 'Konami Code Activated!',
      description: 'Secret settings unlocked! Check the Settings panel',
      icon: 'i-heroicons-sparkles',
      timeout: 3500
    })
  }
  emit('unlockSecret')
  
  // Close the command palette
  open.value = false
}

// Expose methods and properties
defineExpose({
  open,
  toggleTerminal
})
</script>