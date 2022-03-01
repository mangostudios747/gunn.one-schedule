<template>
  <div class="w-full h-full flex flex-col flex-auto">
    <loader v-if="!$parent.game.cache.killFeed"/>
    <div v-else-if="$parent.game.cache.killFeed.length!==0" class="box flex p-2 space-y-1 mt-2 text-white flex-col flex-col flex-auto overflow-auto h-0 mt-2 p-1 space-y-1">

    <div class="py-2 px-3 rounded-lg flex flex-row text-sm gap-3" :key="item.id" v-for="item of $parent.game.cache.killFeed">
      <div class="my-auto justify-around pr-1"><Monogram :user="item.target" /></div>
      <div class="flex flex-col">
        <div class="flex flex-row gap-2"><Monogram name :icon="false" :user="item.target" /> <span class="text-white/80 text-xs my-auto">{{new Date(item.at).toISOString() | luxon('relative')}}</span></div>
        <div class="flex flex-row gap-1"><span class="my-auto">{{killTypes[item.type]}}</span> <Monogram class="my-auto" :name="false" :icon="false" :user="item.entity" /> </div>
      </div>
    </div>

  </div>
    <div v-else class="box flex p-2 space-y-1 mt-2 text-white flex-col flex-col flex-auto overflow-auto h-0 mt-2 p-1 space-y-1">
      <div class="h-full flex w-full text-center">
        <p class="my-auto mx-auto text-lg">The game log will appear here.</p>
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
