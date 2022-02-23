<template>
  <form class="box flex max-w-sm flex-col gap-2 w-full mx-auto my-auto text-white py-3 px-4">
    <h1 class="text-lg font-bold block mx-auto">Log in to <span class="text-elimination">Elimination</span></h1>
    <div v-if="error.valid" class="rounded-md py-3 px-2 bg-red-500/20 flex flex-row gap-2 text-red-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {{error.message}}
    </div>
    <input autocomplete="pausd-email" v-model="email" placeholder="PAUSD email" class="box-input" />
    <input autocomplete="elimination-password" v-model="password" placeholder="Password" type="password" class="box-input" />
    <button @click.prevent="login" class="btn-elimination">Login</button>
    <span class="text-white/60 italic text-sm">Don't have an account? <a href="/app/elimination/signup" class="link-elimination font-bold">Sign Up.</a></span>
   </form>
</template>

<script>
export default {
  name: "login",
  data:()=>({
    email:'',
    password:'',
    error:{
      valid: false,
      message:''
    }
  }),
  methods: {
    login(){
      const {email, password} = this;
      const errors = [
        [email, 'PAUSD email'],
        [password, 'password'],
      ]
      for (const [p, e] of errors){
        if (!p){
          this.error.message = `Please enter your ${e}.`;
          this.error.valid = true
          return;
        }
      }
      this.error.valid = false;
      this.error.message = ''
      this.$store.dispatch('elimination/login', {email, password})
    }
  }
}
</script>

<style scoped>

</style>
