<template>
  <div>
    <!-- This component doesn't render anything visually but handles hint logic -->
  </div>
</template>

<script setup lang="ts">
const secretEnabled = useState('secretEnabled', () => false)
const toast = useToast()

// Hints for discovering secrets
const hints = [
  'Press Ctrl+K or ⌘+K to open something..',
  'There might be hidden commands in the command palette.',
  'Try searching for "secret" in the command palette.',
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

onMounted(() => {
  const shouldShowHint = Math.random() < 0.4 // 40% chance
  
  if (shouldShowHint) {
    // Show hint after a random delay between 5-15 seconds
    const randomDelay = Math.floor(Math.random() * 10000) + 5000
    setTimeout(showRandomHint, randomDelay)
  }
})
</script>