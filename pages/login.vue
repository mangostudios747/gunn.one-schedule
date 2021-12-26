<template>
  <form @submit.prevent="userLogin" class="mx-auto my-auto min-w-[24rem]  card">
    <h1 class="font-bold text-xl tracking-wide">Login</h1>
    <div class="flex login-info flex-col">
      <input type="text" class="input-text" v-model="login.email" placeholder="School email" />
      <input type="password" class="input-text" v-model="login.password" placeholder="Password" />
    </div>
    <span class="text-small block mb-2">Don't have an account? <a class="link" href="/register">Register</a> instead.</span>
    <button class="float-right block my-2 btn-primary">Login</button>
  </form>
</template>

<script>
export default {
  name: "login",
  data: ()=>({
    login: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.login })
        if (response.data.error){
          console.log(response.data.error)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
