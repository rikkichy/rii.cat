<template>
  <div class="error-page">
    <h1>{{ randomText }}</h1>
    <UButton
      icon="i-heroicons-home"
      size="xl"
      color="white"
      variant="solid"
      label="Go back"
      dynamic
      to="/"
      class="transition-transform duration-200 hover:-translate-y-1"
    />
    <p>Redirecting in {{ countdown }} seconds...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      randomText: "",
      countdown: 4, // Set initial countdown to 4 seconds
    };
  },
  mounted() {
    this.generateRandomText();

    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.$router.push('/');
      }
    }, 1000); // Decrease countdown every second
  },
  methods: {
    generateRandomText() {
      const randomTextOptions = [
        "🔮 A mysterious journey begins...or?",
        "😶‍🌫️ An unknown force stops you..",
        "👀 Wow, you are a real hacker!",
        "🐱 You found a purple cat!",
      ];
      randomTextOptions.sort(() => Math.random() - 0.5);
      this.randomText = randomTextOptions[0];
    }
  }
};
</script>

<style scoped>
  .error-page {
    margin: 0;
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  h1 {
    font-size: 2em; /* Decrease the font size */
    font-weight: bold;
    margin-bottom: 0.5em; /* Add some bottom margin for spacing */
  }

  p {
    margin-top: 1em; /* Add spacing above the countdown text */
    font-size: 1.2em;
    color: #333; /* Set a darker color for the countdown text */
  }
</style>
