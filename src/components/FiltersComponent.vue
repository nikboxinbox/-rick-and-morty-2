<template lang="pug">
.filter-name.q-pa-md
  q-input(
    v-model="searchName"
    ref="inputFilter"
    @keyup.enter="filtration"
    type="search"
    placeholder ="Name"
    color="teal"
    filled
    )
    template(v-slot:append)
      q-icon(
        name="search"
        @click="filtration"
        ).cursor-pointer
      q-icon(
        name="close"
        v-if="searchName!==''"
        @click="clearSearch"
        ).cursor-pointer
.filter-status
  div.q-pa-md()
    q-btn-toggle(
      v-model="status"
      toggle-color="teal"
      :options="statusOptions"
      )
</template>
<script>
import { useCharactersStore } from "../stores/charactersStore";

export default {
  data: () => ({
    status: "All",
    statusOptions: [
      { label: "All", value: "All" },
      { label: "Alive", value: "Alive" },
      { label: "Dead", value: "dead" },
      { label: "Unknown", value: "Unknown" }
    ],
    searchName: ""
  }),

  watch: {
    status() {
      this.filtration();
    },
    "charactersStore.errorMessageFromApi"(val) {
      if (
        val === "There is nothing here" &&
        this.charactersStore.filterName !== ""
      ) {
        const message = `По вашему запросу с именем: ${this.charactersStore.filterName} никого не найдено!`;
        this.showNotif(message);
        this.searchName = "";
        this.filtration();
      }
    }
  },
  computed: {
    charactersStore() {
      return useCharactersStore();
    }
  },
  methods: {
    filtration() {
      this.charactersStore.updateFilters({
        status: this.status,
        searchName: this.searchName
      });
    },
    clearSearch() {
      this.searchName = "";
      this.filtration();
    },
    showNotif(message) {
      this.$q.notify({
        message: message,
        color: "red",
        position: "top"
      });
    }
  },
  mounted() {
    this.status = this.charactersStore.status;
    this.searchName = this.charactersStore.filterName;
    this.$refs.inputFilter.$el.focus();
  }
};
</script>
