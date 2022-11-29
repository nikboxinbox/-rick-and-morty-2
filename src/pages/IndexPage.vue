<template lang="pug">
q-page
  .characters__list
    CharacterList
  q-page-sticky.pagination-container(position="bottom" :offset="[0, 18]")
    PaginationComponent

</template>

<script>
// import { useCharactersStore } from "../stores/CharactersStore";
// Components
import CharacterList from "../components/CharactersList.vue";
import PaginationComponent from "../components/PaginationComponent.vue";

export default {
  components: {
    CharacterList,
    PaginationComponent
  },
  name: "IndexPage"
  // computed: {
  //   // charactersStore() {
  //   //   return useCharactersStore();
  //   // }
  //   // ...mapGetters([
  //   //   "getCharacters",
  //   //   "getErrorMessageFromApi",
  //   //   "getFilterName",
  //   //   "getStatus"
  //   // ])
  // },

  // methods: {
  //   // ...mapMutations(["setFilterName"]),
  //   // ...mapActions(["updateFilters"]),
  // }
};
</script>
<style lang="stylus">
q-page
  padding-top 100px
</style>

<!-- <template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script> -->
