<template>
  <div>

  </div>
</template>

<script>
export default {
  name: "callback",
  middleware({ query, store, redirect }){
    const {token} = query;
    if (token){
      store.commit('elimination/setUser', token);
      redirect('/app/elimination')
    }
  }
}
</script>

<style scoped>

</style>
