<template>
  <div class="box flex p-2 space-y-1 mt-2 text-white flex-col">
    <div class="py-2 px-3 rounded-lg flex flex-row gap-2 hover:bg-white/10" :key="item.id" v-for="(item, idx) of feed">
      <span>{{new Date(item.at).toISOString() | luxon('LLL dd, h:mm a')}}</span>
      <Monogram :user="item.target" />
      <div class="font-bold">
        {{item.target.firstName}} {{item.target.lastName}}
      </div>
      <span class="text-white/80 italic">{{killTypes[item.type]}}</span>
      <Monogram v-if="item.entity" :user="item.entity"/>
      <div class="font-bold">
        {{item.entity.firstName}} {{item.entity.lastName}}
      </div>
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
