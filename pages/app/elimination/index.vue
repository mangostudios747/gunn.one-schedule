<template>
  <div>
    <a href="/app/elimination/signup">Sign Up</a>
  </div>
</template>

<script>
export default {
  name: "index",
  beforeMount(){
    // if user not detected, prompt them to login
    if (!this.$store.state["elimination/user"]){
      this.$router.push('/app/elimination/login')
    }
  }

}
</script>

<style scoped>

</style>
