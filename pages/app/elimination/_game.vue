<template>
  <div class="h-full w-full">
    <loader v-if="$fetchState.pending"/>
    <div class="w-full h-full" v-else>
      <h1 class="page-title">{{ game.name }} </h1>
      <div class="h-full w-full" v-if="game.start">
        <div
          class="flex sticky top-0 p-1 mt-3 space-x-1 box"
          role="tablist"
          aria-orientation="horizontal"
        >
          <tab :href="`/app/elimination/${$route.params.game}/feed`">
            Updates
          </tab>
          <tab exact :href="`/app/elimination/${$route.params.game}`"> Home</tab>
          <tab :href="`/app/elimination/${$route.params.game}/leaderboard`">
            Leaderboard
          </tab>
        </div>
        <nuxt-child/>
      </div>
      <div class="w-full h-full flex flex-col " v-else>
        <div v-if="game.cache.announcement" :key="game.cache.announcement._id" class="flex my-2 basis-1 font-medium text-base px-3 py-2 flex-col text-amber-400 rounded-xl bg-orange-800/20 dark:bg-orange-200/20">
          <div class="flex gap-2 flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clip-rule="evenodd" />
            </svg>
            <span class="font-bold my-auto text-lg">Announcement</span>
          </div>
          <div class="italic text-xs opacity-90">
            {{new Date(game.cache.announcement.time).toISOString() | luxon('relative') }}
          </div>
          <div v-text="game.cache.announcement.message" :class="announcementCollapsed&&(game.cache.announcement.message.length>100)?'line-clamp-2':'whitespace-pre-wrap'"></div>
          <div v-if="game.cache.announcement.message.length>100" class="mt-2">
            <button @click="announcementCollapsed=!announcementCollapsed" class="btn float-right text-white bg-orange-400/80 ">Show {{announcementCollapsed?'more':'less'}}</button>
          </div>
        </div>
        <p class="my-auto mx-auto text-white text-3xl font-bold text-center">Waiting for game to start...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    game: null,
    socket: null,
    announcementCollapsed: true
  }),
  mounted() {
    this.socket = this.$nuxtSocket({
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('g1.eliminationUser')}`
      }
    });
    this.socket.on('userInfo', (e, f) => {
      Object.assign(this.game.cache.me, e)
      console.log(e)
    })
    this.socket.on('eliminationUpdateSelf', (e, f) => {
      Object.assign(this.game.cache.me, e.user)
      console.log(e)
    })
    window.addEventListener('eliminationKill', ({detail:e})=>{
      Object.assign(this.game.cache.me, e.user)
      console.log(e)
    })
    this.socket.on('eliminationKill', (e, f) => {
      console.log(e, f)
    })
    this.socket.on('gameUpdated', (e, f) => {
      this.game.fetchGame()
      console.log(e)
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
