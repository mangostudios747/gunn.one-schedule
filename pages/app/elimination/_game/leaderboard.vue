<template>
  <div class="box flex p-2 space-y-1 mt-2 text-white flex-col">

    <div class="font-bold py-2 px-3 rounded-lg hover:bg-white/10" v-for="(item, idx) of l">
      {{idx+1}} {{item.user.firstName}} {{item.user.lastName}}
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
    this.l = await this.$elim.fetchLeaderboard(this.$route.params.game)
  }
}
</script>

<style scoped>

</style>
