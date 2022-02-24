<template>
  <div class="box flex p-2 space-y-1 mt-2 text-white flex-col">
    <div class="py-2 px-3 rounded-lg text-sm gap-2 hover:bg-white/10" :key="item.id" v-for="(item, idx) of feed">
      <span class="text-xs">{{new Date(item.at).toISOString() | luxon('relative')}}</span>
      <Monogram small name :user="item.target" />

      <span class="inline text-white/80 italic mr-1">{{killTypes[item.type]}}</span>
      <Monogram small name v-if="item.entity" :user="item.entity"/>
    </div>
  </div>
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
