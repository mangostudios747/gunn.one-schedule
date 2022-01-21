<template>
  <div class="flex flex-auto flex-col">
    <div class="flex w-full flex-row pt-1 px-2 gap-1">

      <div class="grow basis-0 text-center"><dow button class="-">M</dow></div>
      <div class="grow basis-0 text-center"><dow button class="">T</dow></div>
      <div class="grow basis-0 text-center"><dow button class="">W</dow></div>
      <div class="grow basis-0 text-center"><dow button class="">Th</dow></div>
      <div class="grow basis-0 text-center"><dow button class="">F</dow></div>
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
  data: () => ({ clubs, days:{
      "Monday": false,
      "Tuesday": false,
      "Wednesday": false,
      "Thursday": false,
      "Friday": false,
  } }),
  computed: {
    selectedDays(){
        return Object.keys(this.days).filter(k=>this.days[k]);
    },
    filteredClubs() {
      if (!selectedDays) return this.clubs;
      else {
          return this.clubs.filter((club)=>{
            return this.selectedDays.includes(club.day)
          })
      }
    },
  },
};
</script>

<style>
</style>