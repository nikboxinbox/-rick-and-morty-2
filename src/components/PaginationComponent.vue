<template lang="pug">
.q-pa-lg.flex.flex-center
  q-pagination(
    v-model="currentPage"
	  :max="charactersStore.totalPages"
    :max-pages="3"
    size="20px"
    color="amber-9"
    )
</template>

<script>
import { useCharactersStore } from "../stores/charactersStore";

export default {
  name: "PaginationComponent",
  data: () => ({
    currentPage: 1
  }),
  watch: {
    currentPage(val) {
      this.charactersStore.updatePage(val);
    },
    "charactersStore.page"(val) {
      this.currentPage = val;
    }
  },
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  },
  mounted() {
    this.currentPage = this.charactersStore.page;
  }
};
</script>
