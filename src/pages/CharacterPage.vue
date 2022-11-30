<template lang="pug">
q-page(v-if="charactersStore.singleCharacter").page-character-card
  div.container-character-card
    q-card.character-card
      q-card-section(horizontal).character-card__main-section
        q-img.col-5(:src="charactersStore.singleCharacter.image")
        q-card-section.character-card__section()
          h3.character-card__name().q-pa-none {{charactersStore.singleCharacter.name}}
          h4.character-card__species {{charactersStore.singleCharacter.species}}
          h4.character-card__location {{charactersStore.singleCharacter.location.name}}
</template>

<script>
import { useCharactersStore } from "../stores/charactersStore";

export default {
  name: "CharacterPage",
  computed: {
    charactersStore() {
      return useCharactersStore();
    },
    character() {
      return this.charactersStore.singleCharacter;
    }
  },

  async created() {
    await this.charactersStore.getSingleCharacterFromServer(
      this.$route.params.id
    );
  }
};
</script>

<style lang="stylus">
.page-character-card
  padding-top 100px
  height 100%
  width 100%
.container-character-card
  width 100%
  height 100%
.character-card
  max-width 80%
  margin auto
  background #212121
.character-card__section
  color white
</style>
