<template>
  <div>
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const secretEnabled = useState('secretEnabled', () => false)
const isSettingsModalOpen = useState('settingsModal', () => false)
const toast = useToast()
const hints = [
  'Press Ctrl+K or ⌘+K to open something..',
  'Golden key..where did I put it..',
  'Open settings several times to get the right hint!',
]

const showRandomHint = () => {
  if (secretEnabled.value) return
  
  const randomHint = hints[Math.floor(Math.random() * hints.length)]
  
  toast.add({
    title: 'Hmm?',
    description: randomHint,
    icon: 'i-heroicons-sparkles',
    timeout: 5000,
    color: 'gray'
  })
}

watch(isSettingsModalOpen, (newValue) => {
  if (newValue && !secretEnabled.value) {
    const shouldShowHint = Math.random() < 0.5
    
    if (shouldShowHint) {
      showRandomHint()
    }
  }
})

onMounted(() => {
  // Check if hints are enabled in the environment config
  const hintsEnabled = runtimeConfig.public.enableSecretHint === 'true'
  
  // We'll keep this for first page load, but with a lower chance
  if (hintsEnabled) {
    const shouldShowHint = Math.random() < 0.2 // Reduced to 20% chance on page load
    
    if (shouldShowHint) {
      // Show hint immediately without delay
      showRandomHint()
    }
  }
})
</script>