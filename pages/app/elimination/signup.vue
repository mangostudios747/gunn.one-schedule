<template>
  <div class="box flex flex-col gap-2 mx-auto my-auto text-white py-4 px-4 w-full ">
    <div class="flex flex-col"><h1 class="text-lg font-bold block mx-auto">Sign up to play <span class="text-elimination">Elimination</span></h1>
      <div v-if="error.valid" class="rounded-md py-3 px-2 bg-red-500/20 flex flex-row gap-2 text-red-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        {{error.message}}
      </div>
      <div v-if="emailSent" class="rounded-md py-3 px-2 bg-green-500/20 flex flex-row gap-2 text-green-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 grow my-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        An verification email has been sent to {{emailSent}}. You must verify your email address before logging in.
      </div>
      <div class="flex w-full flex-row gap-2 ">
        <input v-model="firstName" placeholder="First name" class="box-input grow w-1/3" />
        <input v-model="lastName" placeholder="Last name" class="box-input grow w-1/3" />
      </div>
      <input disabled v-model="email" placeholder="PAUSD email" class="box-input" />
      <input disabled v-model="password" placeholder="Password" type="password" class="box-input" />
      <input disabled v-model="password2" placeholder="Confirm password" type="password" class="box-input" />
      <button @click="signup" class="btn-elimination">Sign Up</button>
      <span class="text-white/60 italic text-sm">Already have an account? <a href="/app/elimination/login" class="link-elimination font-bold">Log in</a> to play.</span>
    </div>


  </div>
</template>

<script>
export default {
  name: "signup",
  data:()=>({
    firstName: '',
    lastName: '',
    password: '',
    password2: '',
    email:'',
    error:{
      valid: false,
      message:''
    },
    emailSent: false
  }),
  methods:{
    signup(){
      const {firstName, lastName, email, password, password2} = this;
      const errors = [
        [firstName, 'first name'],
        [lastName, 'last name'],
        [email, 'email'],
        [password, 'password']
      ]
      for (const [p, e] of errors){
        if (!p){
          this.error.message = `Please enter your ${e}.`;
          this.error.valid = true
          return;
        }
      }
      if (password !== password2){
        this.error.message = 'Passwords do not match.'
        this.error.valid = true
        return;
      }
      this.error.message = '';
      this.error.valid = false;
      this.$store.dispatch('elimination/signup', {firstName, lastName, email, password})
      this.emailSent = this.email;

    }
  }
}
</script>

<style scoped>

</style>
