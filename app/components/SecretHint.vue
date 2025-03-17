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
    duration: 5000,
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
  const hintsEnabled = runtimeConfig.public.enableSecretHint === 'true'
  if (hintsEnabled) {
    const shouldShowHint = Math.random() < 0.2
    
    if (shouldShowHint) {
      showRandomHint()
    }
  }
})
</script>