<template>
  <form @submit.prevent="userLogin" class="mx-auto my-auto sm:min-w-[24rem]  card">
    <h1 class="font-bold text-xl tracking-wide">Login</h1>
    <div v-if="error.valid" class="bg-red-500/20 text-red-600 rounded-md py-2 px-3 my-2 flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
    {{error.message}}
    </div>
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
    },
    error:{
      valid: false,
      message:''
    }
  }),
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith('schoology', { data: this.login })
        if (response.data.error){
          console.log(response.data.error)
          this.error = {
            valid: true,
            message: 'Incorrect email and password combination.'
          }
        }
        else {
          history.push('/app')
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
