<template>
    <div>
        <UContainer>
            <LazyCommandPalette
                ref="commandPaletteRef"
                @unlock-secret="secretEnabled = true"
            />
            <LazySettings v-model="isSettingsModalOpen" />
            <LazySecretHint hydrate-on-idle />

            <slot />

            <footer
                class="max-w-2xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-4 pt-2"
            >
                <p>Made with 🤍 by me.</p>
                <p class="flex items-center justify-center gap-1">
                    <UIcon
                        name="i-ri-open-source-fill"
                        class="w-5 h-5 text-gray-600 dark:text-gray-400"
                    />
                    Distributed under the
                    <NuxtLink
                        to="https://github.com/rikkichy/rii.cat"
                        target="_blank"
                        class="text-primary hover:underline"
                    >
                        GPL-3.0 License.
                    </NuxtLink>
                </p>
            </footer>
        </UContainer>
    </div>
</template>

<script setup lang="ts">
const isSettingsModalOpen = useState("settingsModal", () => false);
const secretEnabled = useState("secretEnabled", () => false);
const commandPaletteRef = ref(null);

const openCommandPalette = () => {
    if (commandPaletteRef.value) {
        commandPaletteRef.value.toggleTerminal();
    }
};

onMounted(() => {
    window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyDown);
});

const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openCommandPalette();
    }
};
</script>
