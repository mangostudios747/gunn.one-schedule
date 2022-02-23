<template>
  <div class="box flex flex-col">
    {{l}}
    <div v-for="item of l">
      {{item.type}}
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
