import { defineStore } from "pinia";
import { ref } from "vue";
import { BASE_URL } from "src/api";

export const useCharactersStore = defineStore("charactersStore", {
  state: () => ({
    characters: [],
    page: 1,
    totalPages: 0,
    totalEl: 0,
    status: "All",
    filterName: "",
    errorMessageFromApi: null,
    singleCharacter: null,
    singleEpisode: null,
    multipleCharactersImages: null
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    async updateData() {
      try {
        this.errorMessageFromApi = null;

        const STATUS_URL = this.status == "All" ? "" : `&status=${this.status}`;

        const NAME_URL =
          this.filterName == "" ? "" : `&name=${this.filterName}`;

        const response = await fetch(
          `${BASE_URL}/character/?page=${this.page}${NAME_URL}${STATUS_URL}`
        );

        const data = await response.json();

        if (data.error) {
          this.errorMessageFromApi = data.error;
          return;
        }
        this.characters = data.results;
        this.totalPages = data.info.pages;
        this.totalEl = data.info.count;
      } catch (e) {
        console.error(e);
      }
    },
    async updateSingleCharacter(id) {
      try {
        const response = await fetch(`${BASE_URL}/character/${id}`);
        const data = await response.json();
        const { name, species, image, location } = data;
        this.singleCharacter = { name, species, image, location };
      } catch (e) {
        console.error(e);
      }
    },
    async updateSingleEpisode(id) {
      try {
        const response = await fetch(`${BASE_URL}/episode/${id}`);
        const data = await response.json();
        const { name, air_date, characters } = data;
        const charactersEpisode = await this.updateMultipleCharactersEpisode(
          characters
        );
        this.singleEpisode = { name, air_date, charactersEpisode };
      } catch (e) {
        console.error(e);
      }
    },
    async updateMultipleCharactersEpisode(charactersUrls) {
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
    },
    updatePage(page) {
      this.page = page;
      this.updateData();
    },
    updateFilters(filter = {}) {
      this.page = 1;
      this.status = filter.status;
      this.filterName = filter.searchName;
      this.updateData();
    }
  },
  persist: {
    enabled: true
  }
});
