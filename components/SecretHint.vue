<!-- components/SecretHint.vue -->
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
  'Remember the Konami code?',
  'Up, Up, Down, Down, Left, Right, Left, Right, B, A...',
  'Press Ctrl+K to open the terminal..',
  'Check the footer for clues!',
  'Classic gaming techniques might unlock something special.',
]

// Show a random hint after a random delay
const showRandomHint = () => {
  if (secretEnabled.value) return // Don't show hints if secrets already unlocked
  
  const randomHint = hints[Math.floor(Math.random() * hints.length)]
  
  toast.add({
    title: 'Secret Hint',
    description: randomHint,
    icon: 'i-heroicons-sparkles',
    timeout: 5000,
    color: 'gray'
  })
}

onMounted(() => {
  const shouldShowHint = Math.random() < 0.4 // 20% chance
  
  if (shouldShowHint) {
    // Show hint after a random delay between 5-15 seconds
    const randomDelay = Math.floor(Math.random() * 10000) + 5000
    setTimeout(showRandomHint, randomDelay)
  }
})
</script>