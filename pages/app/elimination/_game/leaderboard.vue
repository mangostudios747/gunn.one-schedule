<template>
  <div class="box flex p-2 space-y-1 mt-2 text-white flex-col">

    <div class=" py-2 px-3 rounded-lg flex flex-row gap-2 hover:bg-white/10" :key="item.id" v-for="(item, idx) of l">
    <span class="mr-2 font-bold w-8">#{{String(idx+1).padStart(3, '0')}}</span>
    <Monogram name :user="item.user" />
    <div class="ml-auto mr-0 font-semibold">{{item.kills}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "leaderboard",
  data:()=>({
    l:[]
  }),
  fetchOnServer: false,
  async fetch(){
    this.l = await this.$parent.game.fetchLeaderboard()
  }
}
</script>

<style scoped>

</style>
