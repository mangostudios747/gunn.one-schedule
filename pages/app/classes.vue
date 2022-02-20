<template>
  <div class="h-full w-full">
      <div class="h-full md:pl-2 pl-5 pr-5 w-full" v-show="user">
        <nuxt-child/>
      </div>
      <div class="h-full w-full" v-show="!user">
        <log-in-banner/>
      </div>

  </div>
</template>

<script>
import calendarIcon from '~/components/calendar-icon.vue';
export default {
  components: { calendarIcon },
  async asyncData({app}){
    const user = await app.$cookies.get('auth._token.schoology');
    //console.log("container runs")
    return {user}
  }
}
</script>

<style>
</style>
