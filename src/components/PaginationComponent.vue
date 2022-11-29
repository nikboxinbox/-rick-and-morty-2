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
// import { mapGetters, mapActions } from "vuex";
import { useCharactersStore } from "../stores/CharactersStore";

export default {
  name: "PaginationComponent",
  data: () => ({
    currentPage: 1
  }),
  watch: {
    currentPage(val) {
      // this.updatePage(val);
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
    // ...mapGetters(["getTotalPage", "getPage"])
  },
  // methods: {
  //   // ...mapActions(["updatePage"]),
  // },
  mounted() {
    this.currentPage = this.charactersStore.page;
  }
};
</script>
