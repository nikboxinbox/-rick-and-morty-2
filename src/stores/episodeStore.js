import { defineStore } from "pinia";
import { BASE_URL } from "src/api";

export const useEpisodeStore = defineStore("episode", {
  state: () => ({
    episode: null
  }),

  actions: {
    async getEpisodeFromServer(id) {
      try {
        const response = await fetch(`${BASE_URL}/episode/${id}`);
        const data = await response.json();
        const { name, air_date, characters } = data;
        const charactersEpisode = await this.findCharactersEpisodeFromServer(
          characters
        );
        this.episode = { name, air_date, charactersEpisode };
      } catch (e) {
        console.error(e);
      }
    },
    async findCharactersEpisodeFromServer(charactersUrls) {
      try {
        const charactersIds = charactersUrls
          .map((characterUrl) => {
            return characterUrl.split("/").slice(-1).join();
          })
          .join(",");

        const response = await fetch(`${BASE_URL}/character/${charactersIds}`);
        const data = await response.json();
        const CharactersImagesIds = data.map((d) => {
          return { id: d.id, image: d.image };
        });
        return CharactersImagesIds;
      } catch (e) {
        console.error(e);
      }
    }
  },
  persist: {
    enabled: true
  }
});
