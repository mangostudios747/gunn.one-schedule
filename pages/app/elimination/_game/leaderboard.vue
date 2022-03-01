<template>
<div class="h-full w-full flex flex-col flex-auto">
  <div v-if="$parent.game.cache.leaderboard.length!==0" class="box flex p-2 space-y-1 mt-2 text-white flex-col flex-auto overflow-auto h-0 mt-2 pb-28 space-y-1 ">
    <div  class=" py-2 px-3 rounded-lg flex flex-row gap-2" :key="item.id" v-for="(item, idx) of $parent.game.cache.leaderboard">
      <span class="mr-2 font-bold w-8">#{{ String(idx + 1).padStart(2, '0') }}</span>
      <Monogram name :user="item.user"/>
      <div class="ml-auto mr-0 font-semibold">{{ item.kills }}</div>
    </div>
  </div>
  <loader v-else/>
</div>
</template>
<script>
export default {
  name: "leaderboard",
  fetchOnServer: false,
  async fetch() {
    await this.$parent.game.fetchLeaderboard()
  }
}
</script>

<style scoped>

</style>
