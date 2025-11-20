<template>
    <UModal v-model:open="isOpen">
        <template #default> </template>

        <template #content>
            <UCard>
                <template #header>
                    <h3 class="text-lg font-semibold">Settings</h3>
                </template>

                <div class="space-y-6 py-2">
                    <div>
                        <h4
                            class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3"
                        >
                            Appearance
                        </h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span>Dark mode</span>
                                <USwitch v-model="isDark" color="primary" />
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex flex-col">
                                    <span>Reduced Motion</span>
                                    <span
                                        class="text-xs text-gray-500 dark:text-gray-400"
                                        >Disables grain & cursor effects</span
                                    >
                                </div>
                                <USwitch
                                    v-model="reducedMotion"
                                    color="primary"
                                />
                            </div>

                            <UFormField label="Theme Color">
                                <div
                                    class="flex gap-2 overflow-x-auto py-2 px-4 -mx-4"
                                >
                                    <button
                                        v-for="color in primaryColors"
                                        :key="color.name"
                                        class="w-6 h-6 rounded-full transition-all hover:scale-110 focus:outline-none ring-2 ring-offset-2 dark:ring-offset-gray-900 flex-shrink-0"
                                        :class="[
                                            primaryColor === color.name
                                                ? 'ring-gray-400 dark:ring-gray-500 scale-110'
                                                : 'ring-transparent',
                                        ]"
                                        :style="{ backgroundColor: color.hex }"
                                        @click="primaryColor = color.name"
                                        :aria-label="`Set primary color to ${color.name}`"
                                    />
                                </div>
                            </UFormField>

                            <UFormField label="Background Color">
                                <USelect
                                    v-model="grayColor"
                                    :items="grayColors"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                    </div>

                    <USeparator />

                    <div class="flex items-center justify-between">
                        <div
                            class="flex items-center gap-2 cursor-pointer select-none transition-opacity hover:opacity-80"
                            @click="handleSecretClick"
                        >
                            <span>Secret Settings</span>
                            <UTooltip v-if="!secretEnabled" :text="lockTooltip">
                                <UIcon
                                    name="i-heroicons-lock-closed"
                                    class="w-4 h-4 transition-colors duration-300"
                                    :class="
                                        clickCount > 0
                                            ? 'text-primary-400'
                                            : 'text-gray-400'
                                    "
                                />
                            </UTooltip>
                            <UTooltip v-else text="Secret settings unlocked!">
                                <UIcon
                                    name="i-heroicons-lock-open"
                                    class="w-4 h-4 text-green-500"
                                />
                            </UTooltip>
                        </div>
                        <USwitch
                            v-model="secretEnabled"
                            color="success"
                            :disabled="!secretEnabled"
                        />
                    </div>

                    <template v-if="secretEnabled">
                        <div class="space-y-4 pt-2">
                            <UFormField
                                label="Brainrot Level"
                                :help="getBrainrotLabel"
                            >
                                <USlider
                                    color="primary"
                                    v-model="brainrotLevel"
                                    :step="25"
                                    :min="0"
                                    :max="100"
                                    class="w-full"
                                />
                            </UFormField>

                            <div class="flex items-center justify-between">
                                <div class="flex flex-col">
                                    <span>Cursor Trail</span>
                                    <span
                                        class="text-xs text-gray-500 dark:text-gray-400"
                                        >Reacts to brainrot level!</span
                                    >
                                </div>
                                <USwitch
                                    v-model="cursorTrailEnabled"
                                    color="error"
                                    :disabled="reducedMotion"
                                />
                            </div>
                        </div>
                    </template>
                </div>
            </UCard>
        </template>
    </UModal>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const appConfig = useAppConfig();
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);
const toast = useToast();
const colorMode = useColorMode();

// State
const secretEnabled = useState("secretEnabled", () => false);
const brainrotLevel = useState(
    "brainrotLevel",
    () => parseInt(runtimeConfig.public.defaultBrainrotLevel) || 0,
);
// Removed customTheme state
const cursorTrailEnabled = useState("cursorTrailEnabled", () => false);
const reducedMotion = useState("reducedMotion", () => false);
const clickCount = ref(0);

// Colors with Hex values for preview
const primaryColors = [
    { name: "red", hex: "#ef4444" },
    { name: "orange", hex: "#f97316" },
    { name: "yellow", hex: "#eab308" },
    { name: "green", hex: "#22c55e" },
    { name: "teal", hex: "#14b8a6" },
    { name: "blue", hex: "#3b82f6" },
    { name: "indigo", hex: "#6366f1" },
    { name: "purple", hex: "#a855f7" },
    { name: "pink", hex: "#ec4899" },
];
const grayColors = ["slate", "gray", "zinc", "neutral", "stone"];

const primaryColor = computed({
    get: () => appConfig.ui.colors.primary,
    set: (val) => {
        appConfig.ui.colors.primary = val;
    },
});

const grayColor = computed({
    get: () => appConfig.ui.colors.neutral,
    set: (val) => {
        appConfig.ui.colors.neutral = val;
    },
});

// Removed customThemeOptions

const isOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
});

const isDark = computed({
    get: () => colorMode.value === "dark",
    set: (value) => {
        colorMode.preference = value ? "dark" : "light";
    },
});

const lockTooltip = computed(() => {
    if (clickCount.value > 2) return "Is it breaking?";
    return "It's locked...";
});

const handleSecretClick = () => {
    if (secretEnabled.value) return;

    clickCount.value++;

    if (clickCount.value === 2) {
        toast.add({
            title: "Hmm?",
            description: "The lock seems loose...",
            duration: 1500,
            color: "gray",
            icon: "i-heroicons-lock-closed",
        });
    } else if (clickCount.value >= 5) {
        secretEnabled.value = true;
        clickCount.value = 0;
        toast.add({
            title: "Unlocked!",
            description: "You smashed the lock!",
            icon: "i-heroicons-lock-open",
            color: "green",
        });
    }
};

const getBrainrotLabel = computed(() => {
    switch (brainrotLevel.value) {
        case 0:
            return "Normal";
        case 25:
            return "Silly";
        case 50:
            return "Cheese";
        case 75:
            return "What";
        case 100:
            return "AAAAAAAAAAA";
        default:
            return "Normal";
    }
});

// Watch reduced motion to auto-disable animations
watch(reducedMotion, (val) => {
    if (val) {
        cursorTrailEnabled.value = false;
    }
});
</script>
