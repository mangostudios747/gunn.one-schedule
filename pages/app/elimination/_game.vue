<template>
  <div class="h-full w-full">
    <h1 class="page-title">Elimination</h1>
    <div
      class="flex sticky top-0 p-1 mt-3 space-x-1 box"
      role="tablist"
      aria-orientation="horizontal"
    >
    <tab  :href="`/app/elimination/${$route.params.game}/feed`">
      Kill Feed
    </tab>
    <tab :href="`/app/elimination/${$route.params.game}`" >
      Home
    </tab>
    <tab :href="`/app/elimination/${$route.params.game}/leaderboard`">
      Leaderboard
    </tab>
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

</style>
