<template>
  <router-view />
</template>

<script>
import { useCharactersStore } from "./stores/charactersStore";

export default {
  name: "App",
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  },
  async mounted() {
    this.charactersStore.getCharactersFromServer();
  }
};
</script>
