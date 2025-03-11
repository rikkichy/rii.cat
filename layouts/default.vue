<!-- layouts/default.vue -->
<template>
  <div>
    <UContainer>
      <div class="fixed top-4 right-4 z-10 flex gap-2">
        <UButton
          icon="i-ri-settings-2-fill"
          color="gray"
          variant="ghost"
          size="xl"
          @click="isSettingsModalOpen = true"
          aria-label="Open settings"
        />
      </div>

      <CommandPalette ref="commandPaletteRef" @unlock-secret="secretEnabled = true" />
      <Settings v-model="isSettingsModalOpen" />
      <SecretHint />

      <slot />

      <footer class="max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-4 pt-2">
        <p>Made with 🤍 by me.</p>
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
    </UContainer>
  </div>
</template>

<script setup lang="ts">
import Settings from '~/components/Settings.vue'
import CommandPalette from '~/components/CommandPalette.vue'
import SecretHint from '~/components/SecretHint.vue'

const isSettingsModalOpen = useState('settingsModal', () => false)
const secretEnabled = useState('secretEnabled', () => false)
const commandPaletteRef = ref(null)

// Open command palette
const openCommandPalette = () => {
  if (commandPaletteRef.value) {
    commandPaletteRef.value.toggleTerminal()
  }
}

// Show secret hint
const showSecretHint = () => {
  const toast = useToast()
  toast.add({
    title: 'Secret Hint',
    description: 'Up, Up, Down, Down, Left, Right, Left, Right, B, A...',
    icon: 'i-heroicons-key',
    timeout: 5000
  })
}

// Set up keyboard shortcut for command palette
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

const handleKeyDown = (e) => {
  // Ctrl+K or Cmd+K to open command palette
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    openCommandPalette()
  }
}
</script>