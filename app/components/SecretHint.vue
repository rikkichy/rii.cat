<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const secretEnabled = useState("secretEnabled", () => false);
const isSettingsModalOpen = useState("settingsModal", () => false);
const toast = useToast();

const hints = [
    "The lock in settings looks a bit rusty...",
    "Have you tried knocking on the Settings door?",
    "Maybe if you click it enough times...",
    "Brute force is sometimes the answer.",
];

const showRandomHint = () => {
    if (secretEnabled.value) return;

    const randomHint = hints[Math.floor(Math.random() * hints.length)];

    toast.add({
        title: "Psst...",
        description: randomHint,
        icon: "i-heroicons-sparkles",
        duration: 5000,
        color: "gray",
    });
};

if (import.meta.client) {
    watch(isSettingsModalOpen, (newValue) => {
        if (newValue && !secretEnabled.value) {
            const shouldShowHint = Math.random() < 0.6;

            if (shouldShowHint) {
                showRandomHint();
            }
        }
    });

    onMounted(() => {
        const hintsEnabled = runtimeConfig.public.enableSecretHint === "true";
        if (hintsEnabled) {
            const shouldShowHint = Math.random() < 0.2;

            if (shouldShowHint) {
                showRandomHint();
            }
        }
    });
}
</script>
