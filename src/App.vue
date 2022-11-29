<template>
  <router-view />
</template>

<script>
import { useCharactersStore } from "./stores/CharactersStore";

export default {
  name: "App",
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  },
  async mounted() {
    this.charactersStore.updateData();
  }
};
</script>
