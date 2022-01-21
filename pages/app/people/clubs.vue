<template>
  <div class="flex flex-auto flex-col">
    <div class="flex w-full flex-row pt-1 px-2 gap-1">
      <div class="grow basis-0 text-center"><dow :active="days['Monday']" @click="days['Monday'] = !days['Monday']" button class="-">M</dow></div>
      <div class="grow basis-0 text-center"><dow :active="days['Tuesday']" @click="days['Tuesday'] = !days['Tuesday']" button class="">T</dow></div>
      <div class="grow basis-0 text-center"><dow :active="days['Wednesday']" @click="days['Wednesday'] = !days['Wednesday']" button class="">W</dow></div>
      <div class="grow basis-0 text-center"><dow :active="days['Thursday']" @click="days['Thursday'] = !days['Thursday']" button class="">Th</dow></div>
      <div class="grow basis-0 text-center"><dow :active="days['Friday']" @click="days['Friday'] = !days['Friday']" button class="">F</dow></div>
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
      if (!this.selectedDays.length) return this.clubs;
      else {
          return Object.fromEntries(
    Object.entries(this.clubs).filter(([key, value]) => this.selectedDays.includes(value.day)) )
            
          
      }
    },
  },
};
</script>

<style>
</style>