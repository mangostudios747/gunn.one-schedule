<template>
  <div class="w-full h-full">
    <div class="h-full w-full flex text-white font-bold text-2xl" v-if="$fetchState.pending">
     <span class="mx-auto my-auto flex flex-row gap-2"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Loading...</span>
    </div>
    <div v-else class="box flex p-2 space-y-1 mt-2 text-white flex-col">

    <div class="py-2 px-3 rounded-lg text-sm gap-2 hover:bg-white/10" :key="item.id" v-for="(item, idx) of feed">
      <span class="text-xs">{{new Date(item.at).toISOString() | luxon('relative')}}</span>
      <Monogram small name :user="item.target" />

      <span class="inline text-white/80 italic mr-1">{{killTypes[item.type]}}</span>
      <Monogram small name v-if="item.entity" :user="item.entity"/>
    </div>
  </div></div>

</template>

<script>
export default {
  name: "feed",
  data:()=>({
    feed:[],
    killTypes:{
      kill:'was eliminated by',
      forceKill:'was killed.',
      resurrect:'was resurrected.',
      surrender:'surrendered from the game.'

    }
  }),
  async fetch(){
    this.feed = await this.$parent.game.fetchKillFeed()
  }
}
</script>

<style scoped>

</style>
