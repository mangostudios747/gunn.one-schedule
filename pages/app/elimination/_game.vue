<template>
  <div class="h-full w-full">
    <div v-if="$fetchState.pending">
      Loading...
    </div>
    <div v-else>
    <h1 class="page-title">{{ game.name }}</h1>
    <div
      class="flex sticky top-0 p-1 mt-3 space-x-1 box"
      role="tablist"
      aria-orientation="horizontal"
    >
      <tab :href="`/app/elimination/${$route.params.game}/feed`">
        Kill Feed
      </tab>
      <tab exact :href="`/app/elimination/${$route.params.game}`"> Home </tab>
      <tab :href="`/app/elimination/${$route.params.game}/leaderboard`">
        Leaderboard
      </tab>
    </div>
    <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    game: null,
    socket:null,
  }),
  mounted(){
    this.socket = this.$nuxtSocket({
      extraHeaders:{
        Authorization: `Bearer ${localStorage.getItem('g1.eliminationUser')}`
      }
    });
    this.socket.on('userInfo', (e, f)=>{
      console.log(e, f)
    })
    this.socket.on('eliminationUpdateSelf', (e, f)=>{
      console.log(e, f)
    })
    this.socket.on('eliminationKill', (e, f)=>{
      console.log(e, f)
    })
    this.socket.on('gameUpdated', (e, f)=>{
      console.log(e, f)
    })

    this.socket.on('gameCreated', (e, f)=>{
      console.log(e, f)
    })
  },
  fetchOnServer: false,
  async fetch() {
    this.game = this.$elim.Game(this.$route.params.game);
    await this.game.init();
  },
};
</script>

<style scoped>
</style>
