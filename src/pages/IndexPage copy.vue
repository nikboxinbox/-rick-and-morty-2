<template lang="pug">
q-page
  .characters__list
    CharacterList
  q-page-sticky.pagination-container(position="bottom" :offset="[0, 18]")
    PaginationComponent

</template>

<script>
import { useCharactersStore } from "../stores/charactersStore";
// Components
import CharacterList from "../components/CharactersList.vue";
import PaginationComponent from "../components/PaginationComponent.vue";

export default {
  components: {
    CharacterList,
    PaginationComponent
  },
  name: "IndexPage",
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  }
};
</script>
<style lang="stylus">
q-page
  padding-top 100px
</style>
