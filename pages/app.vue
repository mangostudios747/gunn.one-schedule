<template>
  <div>
app?
    {{$auth.user}}
<button @click="$auth.logout()" class="btn-primary">logout</button>
  </div>
</template>

<script>
export default {
  name: "app",
  layout: "app",


}
</script>

<style scoped>

</style>
