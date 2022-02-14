<template>
  <div class="flex flex-auto flex-col">
    <div
      :class="$route.params.club ? ' hidden' : 'flex flex-row'"
      class="flex w-full pt-1 px-2 gap-1"
    >
      <div class="grow basis-0 text-center">
        <dow
          :active="days['Monday']"
          @click="days['Monday'] = !days['Monday']"
          button
          class="-"
          >M</dow
        >
      </div>
      <div class="grow basis-0 text-center">
        <dow
          :active="days['Tuesday']"
          @click="days['Tuesday'] = !days['Tuesday']"
          button
          class=""
          >T</dow
        >
      </div>
      <div class="grow basis-0 text-center">
        <dow
          :active="days['Wednesday']"
          @click="days['Wednesday'] = !days['Wednesday']"
          button
          class=""
          >W</dow
        >
      </div>
      <div class="grow basis-0 text-center">
        <dow
          :active="days['Thursday']"
          @click="days['Thursday'] = !days['Thursday']"
          button
          class=""
          >Th</dow
        >
      </div>
      <div class="grow basis-0 text-center">
        <dow
          :active="days['Friday']"
          @click="days['Friday'] = !days['Friday']"
          button
          class=""
          >F</dow
        >
      </div>
    </div>
    <div :class="$route.params.club ? ' hidden' : 'flex flex-row'" class="box mt-2 rounded-sm py-1 pl-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-white/50 my-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        v-model="searchString"
        placeholder="Search by name, description, and more"
        class="
          block
          bg-transparent
          pl-2
          outline-none
          text-white
          placeholder:text-white/50
          w-full
        "
      />
    </div>
    <div
      :class="$route.params.club ? ' hidden' : 'flex flex-auto'"
      class="flex-col flex-auto overflow-auto h-0 mt-2 p-1 space-y-1 box"
    >
      <tab
        :href="`/app/people/clubs/${id}`"
        :key="id"
        v-for="(club, id) of filteredClubs"
      >
        {{ club.name }}
      </tab>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
const clubs = require("~/content/clubs");

export default {
  data: () => ({
    clubs,
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    },
    searchString: "",
  }),
  mounted(){
  },
  computed: {
    ss() {
      return this.searchString.toLowerCase();
    },
    selectedDays() {
      return Object.keys(this.days).filter((k) => this.days[k]);
    },
    filteredClubs() {
      return Object.fromEntries(
        Object.entries(this.clubs).filter(([key, value]) => {
          return (
            (this.selectedDays.length
              ? this.selectedDays.includes(value.day)
              : true) &&
            [
              value.name,
              value.desc,
              value.prez,
              value.day,
              value.tier,
              value.room,
              value.advisor,
              value.email,
            ]
              .join(" ")
              .toLowerCase()
              .includes(this.ss)
          );
        })
      );
    },
  },
};
</script>

<style>
</style>