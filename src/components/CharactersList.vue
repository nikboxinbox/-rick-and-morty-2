<template lang="pug">
.characters-list__cont().q-pa-md.text-white
  q-list.characters-list__list(dark bordered separator style="max-width: 80%").q-mt-xl
    q-item.characters-list__item(
      v-for="character in charactersStore.characters"
      :key="character.id"
      ).q-ma-md.bg-grey-10
      q-item-section.characters-list__item__section-avatar(avatar)
        q-avatar(rounded size="180px")
          img(:src="character.image" alt="character.name")
      q-item-section.characters-list__item__section-info
        a(@click.prevent="goCharacterPage(character.id)")
          h2.item__section-info__name().q-ma-none.cursor-pointer.text-h6 {{character.name}}
        span.item__section-info__status
          p.status-text().text-subtitle2 {{character.status}}
          q-icon.status-icon(name="fiber_manual_record" :color="character.status === 'Dead'? 'red' : 'green'" size="sm").q-ml-sm.q-mb-md
        p.item__section-info__species().text-subtitle2 {{character.species}}
        p.text-subtitle2.flex Episodes:
        .characters-list__item__section-info__episodes
          q-list.item__section-info__episodes__list.flex
              q-item.item__section-info__episodes__list__item(
                v-for="episode in character.episode.slice(0,5)"
                :key="episode"
                )
                a.episode-text-link()
                  q-btn(@click.prevent="goEpisodePage(episode)") {{getEpisodeNumber(episode)}}
</template>

<script>
import { useCharactersStore } from "../stores/charactersStore";

export default {
  name: "CharacterList ",
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  },
  methods: {
    getEpisodeNumber(episodeUrl) {
      return episodeUrl.split("/").slice(-1).join();
    },
    goEpisodePage(episode) {
      this.$router.push({
        name: "EpisodePage",
        params: { id: this.getEpisodeNumber(episode) }
      });
    },
    goCharacterPage(characterId) {
      this.$router.push({ name: "CharacterPage", params: { id: characterId } });
    }
  }
};
</script>
<style lang="stylus">

.characters-list__cont
  display flex
  justify-content center

.characters-list__item
  border-radius 10px

a :hover
  color #F2C037

.item__section-info__status
  display: flex

.status-icon
  align-self center

.status-text
  align-self center

.episode-text-link
  font-size 16px
</style>
