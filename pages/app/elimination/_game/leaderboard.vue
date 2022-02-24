<template>
  <div class="box flex p-2 space-y-1 mt-2 text-white flex-col">
    <div class="h-full w-full flex text-white font-bold text-2xl" v-if="$fetchState.pending">
     <span class="mx-auto my-auto flex flex-row gap-2"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Loading...</span>
    </div>
    <div v-else class=" py-2 px-3 rounded-lg flex flex-row gap-2 hover:bg-white/10" :key="item.id" v-for="(item, idx) of l">
      <span class="mr-2 font-bold w-8">#{{ String(idx + 1).padStart(3, '0') }}</span>
      <Monogram name :user="item.user"/>
      <div class="ml-auto mr-0 font-semibold">{{ item.kills }}</div>
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
