<template>
  <div>
    <UContainer>
      <div class="fixed top-4 right-4 z-10">
        <UButton
          icon="i-ri-settings-2-fill"
          color="gray"
          variant="ghost"
          @click="isSettingsModalOpen = true"
          aria-label="Open settings"
        />
      </div>

      <Settings v-model="isSettingsModalOpen" />

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

const isSettingsModalOpen = useState('settingsModal', () => false)
</script>