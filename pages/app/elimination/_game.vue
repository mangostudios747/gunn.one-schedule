<template>
  <div class="h-full w-full">
    <div class="h-full w-full flex text-white font-bold text-2xl" v-if="$fetchState.pending">
     <span class="mx-auto my-auto flex flex-row gap-2"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg> Loading...</span>
    </div>
    <div class="w-full h-full" v-else>
      <h1 class="page-title">{{ game.name }}</h1>
      <div class="h-full w-full" v-if="game.start">
        <div
          class="flex sticky top-0 p-1 mt-3 space-x-1 box"
          role="tablist"
          aria-orientation="horizontal"
        >
          <tab :href="`/app/elimination/${$route.params.game}/feed`">
            Kill Feed
          </tab>
          <tab exact :href="`/app/elimination/${$route.params.game}`"> Home</tab>
          <tab :href="`/app/elimination/${$route.params.game}/leaderboard`">
            Leaderboard
          </tab>
        </div>
        <nuxt-child/>
      </div>
      <div class="w-full h-full flex text-white text-3xl font-bold text-center" v-else>
        <span class="my-auto mx-auto">Waiting for game to start...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    game: null,
    socket: null,
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('g1.eliminationUser')}`
      }
    });
    this.socket.on('userInfo', (e, f) => {
      console.log(e, f)
    })
    this.socket.on('eliminationUpdateSelf', (e, f) => {
      console.log(e, f)
    })
    this.socket.on('eliminationKill', (e, f) => {
      console.log(e, f)
    })
    this.socket.on('gameUpdated', (e, f) => {
      this.game.fetchGame()
    })

    this.socket.on('gameCreated', (e, f) => {
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
