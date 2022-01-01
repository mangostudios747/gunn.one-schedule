<template>
  <div class="h-screen brick w-screen flex flex-col overflow-y-scroll  bg-gray-50">
    <nav class="sticky z-3 brick bg-gray-50/30 backdrop-filter backdrop-blur-md py-4 px-5 top-0 w-full">
      <span class="text-indigo-500 text-2xl font-semibold">Gunn.One</span>
      <a key="a" v-if="l" :href="`/app/`" class="float-right btn-primary">Open</a>
      <a key="b" v-if="!l" href="/login" class="float-right btn-primary">Login</a>
      <a key="c" v-if="!l" href="/app" class="float-right mx-2 btn-secondary">Guest</a>
    </nav>
    <Nuxt/>
  </div>
</template>

<script>
export default {
  name: "default",
  computed:{
    l(){
      return this.$auth.loggedIn;
    }
  }
}
</script>

<style >

</style>
