<template>
  <div class="h-full  w-full">
    <div v-if="$fetchState.pending">
      Loading...
    </div>
    <div v-else class="flex flex-col gap-3 mt-3">
      <div class="box flex flex-col gap-2 -!bg-red-500/80 -dark:!bg-red-500/20  px-3 py-2">
      <div class="flex flex-row gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>

        <span class="my-auto">Current Target</span>
      </div>
        <div class="flex flex-row mb-2">
          <div class="flex w-1/2 flex-col ml-2"><Monogram huge class="mx-auto" :user="target"/>
            <span class="mx-auto text-lg font-bold">{{target.firstName}} {{target.lastName}}</span></div>
          <div class="flex flex-col mr-4 justify-around ml-auto text-right">
            <span><span class="text-xl font-bold mr-4">{{target.kills}}</span> kills</span>
            <span><span class="text-xl font-bold mr-3">#21</span> rank</span>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <input :placeholder="`Enter ${target.firstName}'s kill code`" class="box-input grow" /> <button class="btn text-white bg-red-400">Eliminate</button>
        </div>
    </div>
      <div class="box flex flex-col gap-2 px-3 py-2">
        <div class="flex flex-row gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
          </svg>
          <span class="my-auto">Profile</span>
        </div>
        <div class="flex flex-row mb-2">
          <div class="flex w-1/2 flex-col ml-2"><Monogram huge class="mx-auto" :user="me"/>
            <span class="mx-auto text-lg font-bold">{{me.firstName}} {{me.lastName}}</span></div>
          <div class="flex flex-col mr-4 justify-around ml-auto text-right">
            <span><span class="text-xl font-bold mr-4">{{me.kills}}</span> kills</span>
            <span><span class="text-xl font-bold mr-3">#21</span> rank</span>
          </div>
        </div>
        <div class="flex flex-row gap-2">
          <input disabled readonly :value="me.secret" class="box-input select-none grow blur-sm" /> <button class="btn bg-white/10">Show code</button>
        </div>

      </div></div>

  </div>
</template>

<script>
export default {
  name: "index",
  data:()=>({
    me:null,
    target:null
  }),
  fetchOnServer: false,
  async fetch(){
    this.me = await this.$parent.game.fetchSelf();
    this.target = await this.$parent.game.fetchUser(this.me.targetID)
  }
}
</script>

<style scoped>

</style>
