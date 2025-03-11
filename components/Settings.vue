<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold">Settings</h3>
      </template>

      <div class="space-y-6 py-2">
        <div class="flex items-center justify-between">
          <span>Dark mode</span>
          <UToggle v-model="isDark" />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>Secret Settings</span>
            <UTooltip v-if="!secretEnabled" text="Find the hidden way to unlock">
              <UIcon name="i-heroicons-lock-closed" class="w-4 h-4 text-gray-400" />
            </UTooltip>
            <UTooltip v-else text="Secret settings unlocked!">
              <UIcon name="i-heroicons-lock-open" class="w-4 h-4 text-green-500" />
            </UTooltip>
          </div>
          <UToggle v-model="secretEnabled" :disabled="!secretEnabled" />
        </div>
        <UFormGroup label="Brainrot Level" :help="getBrainrotLabel">
          <URange
            v-model="brainrotLevel"
            :step="25"
            :min="0"
            :max="100"
            class="w-full"
          />
        </UFormGroup>

        <template v-if="secretEnabled">
          <UDivider />
          <div class="py-2">
            <h4 class="text-base font-medium mb-4 flex items-center gap-2">
              <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-yellow-500" />
              Secret Settings
            </h4>

            <UFormGroup class="mt-4" label="Custom Theme">
              <USelect
                v-model="customTheme"
                :options="customThemeOptions"
                placeholder="Custom themes"
              />
            </UFormGroup>

            <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                You've unlocked secret settings! I will add something here soon, yep
              </p>
            </div>
          </div>
        </template>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const colorMode = useColorMode()

const secretEnabled = useState('secretEnabled', () => false)
const brainrotLevel = useState('brainrotLevel', () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0)
const customThemeColor = useState('customThemeColor', () => '#FF69B4')
const customTheme = useState('customTheme', () => 'none')

const customThemeOptions = [
  { label: 'None', value: 'none' },
  { label: 'Neon', value: 'sparkles' },
  { label: 'Nyan Cat', value: 'nyan' },
]

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const getBrainrotLabel = computed(() => {
  switch (brainrotLevel.value) {
    case 0: return 'Normal'
    case 25: return 'Silly'
    case 50: return 'Cheese'
    case 75: return 'What'
    case 100: return 'AAAAAAAAAAA'
    default: return 'Normal'
  }
})
</script>