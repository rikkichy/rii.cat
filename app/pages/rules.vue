<template>
  <UContainer>
    <main class="py-8">
      <div class="max-w-3xl mx-auto">
        <div class="mb-8 rounded-2xl overflow-hidden shadow-lg">
             <NuxtImg 
                src="/external/discord/banner_rules.png" 
                alt="Discord Rules Banner"
                class="w-full h-auto object-cover"
            />
        </div>
        <UCard class="mb-8">
            <template #header>
                <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h1 class="text-2xl font-bold">Welcome!</h1>
                    <UBadge color="neutral" variant="subtle" size="lg" class="font-mono">
                        Updated: 5/11/2025 14:13
                    </UBadge>
                </div>
            </template>
            <div class="prose dark:prose-invert max-w-none space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                    We’re all here to have a good time and build a positive community together! That means following the rules, so no one gets hurt and we can avoid unnecessary warnings or punishments.
                </p>
                <p>
                    Sometimes, if something fits the overall vibe and spirit of the rules, we might let it slide, even if it technically bends a rule. Other times, we may take action on something that just doesn’t feel right, even if it’s not clearly written down. <strong>Common sense and kindness go a loooong way.</strong>
                </p>
                <p>
                   Our mod team has the discretion to issue warnings, timeouts, or bans depending on the situation and how often things happen. Trying to work around the rules or look for loopholes usually won’t end well - so please don’t.
                </p>
                <p>
                    After reading our rules, don't forget that we have channel-specific rules on our server, for example in our art channel.
                </p>
                 
                 <div class="py-2">
                     <UAlert
                        icon="i-heroicons-information-circle"
                        color="primary"
                        variant="subtle"
                        title="Important"
                        description="Make sure to follow Discord's Terms of Service and Community Guidelines"
                    />
                 </div>
                <p class="font-bold text-center text-lg text-primary">Big thanks for helping make this server awesome! ❤️</p>
            </div>
        </UCard>
        <div class="space-y-4">
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-chat-bubble-left-right" class="text-primary w-6 h-6" />
                        Rule 1: Basic Etiquette
                    </h2>
                </template>
                <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-primary">
                    <li><strong>Do not spam.</strong> No irrelevant messages, symbols, emotes, or links.</li>
                    <li>Post images and emotes in moderation.</li>
                    <li>No mic-spam or screaming in voice chat.</li>
                    <li><strong>English-only.</strong> Use other languages sparingly, don't circumvent rules.</li>
                    <li><strong>Stay on topic.</strong> Check descriptions & pins before sending a message.</li>
                    <li><strong>No gatekeeping.</strong> This server is for everyone, not just a group of "chosen ones".</li>
                    <li><strong>Only @mention when necessary.</strong> Accidental reply pings are exceptions.</li>
                </ul>
            </UCard>
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-shield-exclamation" class="text-red-500 w-6 h-6" />
                        Rule 2: Malicious Activities
                    </h2>
                </template>
                <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-red-500">
                    <li><strong>No controversial topics and parasocial behavior.</strong> No heavy topics and politics.</li>
                    <li>Don’t make people feel uncomfortable.</li>
                    <li>Do not harass or share sensitive information.</li>
                    <li>Keep personal drama private, in DMs.</li>
                    <li>Do not discuss VTubers' Graduations and past lives.</li>
                    <li><strong>Do not maliciously troll or shitpost.</strong> No malicious activities, raids, disinformation, or offensive content.</li>
                    <li><strong>No unsolicited DMs or friend requests.</strong> Do not DM or friend request others without consent.</li>
                    <li>Use <code>/report</code> to report inappropriate DMs to moderators with evidence.</li>
                </ul>
            </UCard>
             <UCard>
                <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-megaphone" class="text-yellow-500 w-6 h-6" />
                        Rule 3: No promotion or self-promotion
                    </h2>
                </template>
                <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-yellow-500">
                   <li>No mentions of Discord servers or group chats.</li>
                   <li>Exceptions: ⁠🔗〡self-promo & ⁠🎨〡fan-art channel.</li>
                </ul>
            </UCard>
             <UCard>
                <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-no-symbol" class="text-red-600 w-6 h-6" />
                        Rule 4: No NSFW
                    </h2>
                </template>
                 <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-red-600">
                   <li>No suggestive or explicit content, in any form, avoid adult discussions.</li>
                </ul>
            </UCard>
            <UCard>
                 <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-user-circle" class="text-blue-500 w-6 h-6" />
                        Rule 5: Use appropriate display names and profile pictures
                    </h2>
                </template>
                <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-blue-500">
                    <li>Display names must contain standard English characters and must not include emojis, symbols and any form of hateful, discriminatory language.</li>
                    <li>No invisible or rule-breaking pics, including flags and political symbols.</li>
                </ul>
            </UCard>
            <UCard>
                <template #header>
                    <h2 class="text-xl font-bold flex items-center gap-2">
                        <UIcon name="i-heroicons-scale" class="text-purple-500 w-6 h-6" />
                        Rule 6: Respect the mod’s decisions and rules
                    </h2>
                </template>
                <ul class="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300 marker:text-purple-500">
                    <li>No exploiting loopholes.</li>
                    <li>Do not publicly debate moderation actions.</li>
                </ul>
            </UCard>
             <div class="flex justify-center mt-8 pb-8">
                <UButton 
                    size="xl" 
                    to="/" 
                    icon="i-heroicons-arrow-left" 
                    variant="soft" 
                    label="Back to Home"
                    class="hover:scale-105 transition-transform"
                />
            </div>
        </div>
      </div>
    </main>
  </UContainer>
</template>
<script setup lang="ts">
useHead({
  title: 'Discord Rules | Rikkichy',
  meta: [
    { name: 'description', content: 'Community rules and guidelines for the Rikkichy Discord server.' }
  ]
})
definePageMeta({
  prerender: true
})
</script>