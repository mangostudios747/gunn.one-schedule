<template>
  <div class="h-full w-full">
      <div class="h-full md:pl-2 pl-5 pr-5 w-full" v-show="$auth.loggedIn">
        <nuxt-child/>
      </div>
      <div class="h-full w-full" v-show="!$auth.loggedIn">
        <log-in-banner/>
      </div>
      
  </div>
</template>

<script>
import calendarIcon from '~/components/calendar-icon.vue';
export default {
  components: { calendarIcon },
  async asyncData(){
    console.log("container runs")
    return {}
  }
}
</script>

<style>
</style>