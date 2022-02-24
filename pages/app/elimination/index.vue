<template>
  <div class="h-full w-full">
    <h1 class="page-title">Elimination</h1>
    <div class="box p-2 space-y-1 mt-2">
      <div class="text-white px-3 py-2 rounded-lg hover:bg-white/10 flex flex-row" :key="game.id" v-for="game of games">
        <div class="flex flex-col justify-around"><h1 class="font-semibold text-lg ">{{game.name}}</h1>
          <p v-if="game.description.trim().replace('\u8203','')" class="">{{game.description.trim()}}</p></div>
        <div class="flex mr-0 ml-auto">
          <a :href="`/app/elimination/${game.id}`" v-if="game.joined" class="btn-elimination ml-auto block my-auto float-right">Open</a>
          <a v-else @click='joinGame(game.id)' class="btn-elimination ml-auto block my-auto float-right">Join</a>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  fetchOnServer: false,
  data: ()=>({
    games:[]
  }),
  async fetch(){
    this.games = (await this.$elim.fetchGames()).filter(e=>e.dev===undefined)
  },
  methods:{
    async joinGame(id){
      const response = await this.$elim.joinGame(id)
      this.$router.push(`/app/elimination/${id}`);
    }
  },
  beforeMount(){
    // if user not detected, prompt them to login
    if (!localStorage.getItem('g1.eliminationUser')){
      this.$router.push('/app/elimination/login')
    }
  }

}
</script>

<style scoped>

</style>
