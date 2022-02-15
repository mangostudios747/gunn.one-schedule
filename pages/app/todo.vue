<template>
  <div class="h-full w-full mt-4 mx-3">
     <div class="h-full w-full" v-show="$auth.loggedIn">
       <h1 class="text-2xl font-bold mb-2 text-white">Todo</h1>
        <div :key="t.id" v-for="t of todo" class="box my-3 py-2 px-3 text-white">
          <h2 class="text-lg font-semibold">{{t.title}}</h2>
          <div class="prose prose-invert">
            <div v-if="t.parsedBody" v-html="t.parsedBody"></div>
          </div>
        </div>
      </div>
      <div class="h-full w-full" v-show="!$auth.loggedIn">
        <log-in-banner/>
      </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    todo:[]
  }),
  fetchOnServer: false,
  async fetch(){
    console.info("checking for user")
    if (!this.$auth.loggedIn){
      return
    }
    console.info("fetching todos...")
    const resp = await this.$axios.$get('/assignments/pending')
    console.info('todos fetched!')
    console.log(resp)
    this.todo = resp;
  }

}
</script>

<style>

</style>