import { defineStore } from "pinia";
import { BASE_URL } from "src/api";

export const useCharactersStore = defineStore("characters", {
  state: () => ({
    characters: [],
    singleCharacter: null,
    page: 1,
    totalPages: 0,
    totalEl: 0,
    status: "All",
    filterName: "",
    errorMessageFromApi: null
  }),

  actions: {
    async getCharactersFromServer() {
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
    async getSingleCharacterFromServer(id) {
      try {
        const response = await fetch(`${BASE_URL}/character/${id}`);
        const data = await response.json();
        const { name, species, image, location } = data;
        this.singleCharacter = { name, species, image, location };
      } catch (e) {
        console.error(e);
      }
    },
    updatePage(page) {
      this.page = page;
      this.getCharactersFromServer();
    },
    updateFilters(filter = {}) {
      this.page = 1;
      this.status = filter.status;
      this.filterName = filter.searchName;
      this.getCharactersFromServer();
    }
  },
  persist: {
    enabled: true
  }
});
