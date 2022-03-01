<template>
<div class="h-full w-full flex flex-col flex-auto">
  <loader v-if="$fetchState.pending"/>
  <div v-else class="box flex p-2 space-y-1 mt-2 text-white flex-col flex-col flex-auto overflow-auto h-0 mt-2 p-1 space-y-1 box">

    <div  class=" py-2 px-3 rounded-lg flex flex-row gap-2" :key="item.id" v-for="(item, idx) of l">
      <span class="mr-2 font-bold w-8">#{{ String(idx + 1).padStart(2, '0') }}</span>
      <Monogram name :user="item.user"/>
      <div class="ml-auto mr-0 font-semibold">{{ item.kills }}</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "leaderboard",
  data: () => ({
    l: []
  }),
  fetchOnServer: false,
  async fetch() {
    this.l = await this.$parent.game.fetchLeaderboard()
  }
}
</script>

<style scoped>

</style>
