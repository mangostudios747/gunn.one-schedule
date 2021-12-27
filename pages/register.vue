<template>
  <div class="h-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-4xl mx-auto w-full">
    <div class="flex flex-col">
      <div>
        <!---- stepper numbers----->
        <div class="wrapper mx-5">
          <ol class="c-stepper">
            <li :class="{'active':activeStep===1, 'completed':activeStep > 1}" class="c-stepper__item">

              <div class="c-stepper__content">
                <h3 class="c-stepper__title">Create your account</h3>
                <div  class="card expansion block  mt-3">
                  <input @keyup="error = false" name="Name" required type="text" v-model="name" class="input-text mx-auto w-72 block my-4" placeholder="Your Name" />
                  <input @keyup="error = false" required pattern="[a-z]{2}\d{5}@pausd.us" type="email" v-model="email" class="input-text mx-auto w-72 block my-4  invalid:ring-red-500  valid:ring-green-500" placeholder="PAUSD Email" />
                  <input @keyup="error = false" required type="password" v-model="password" class="input-text mx-auto w-72 block my-4" placeholder="Create Password" />
                  <input @keyup="error = false" required type="password" v-model="password2" class="input-text mx-auto w-72 block my-4" placeholder="Confirm Password" />
                  <span class="italic text-red-500 text-sm" v-if="error && profileError">{{profileError}}</span>
                  <button  @click="completeProfile" class="btn-primary float-right mr-0">Next</button>
                </div>
              </div>
            </li>
            <li :class="{'active':activeStep===2, 'completed':activeStep > 2}" class="c-stepper__item">
              <div class="c-stepper__content">
                <h3 class="c-stepper__title">Link Schoology <span class="text-sm text-gray-500 italic font-semibold">(optional)</span></h3>
                <div class="card expansion block mt-3">
                  <p class="mb-2">Clicking the purple button below will take you to Schoology, where you can click "Allow" to allow
                    Schoology integration with Gunn.One. If you're not ready to connect Schoology, you can skip
                    this step for now and complete it at any time.</p>
                  <button @click="goToSchoology" class="btn-primary float-right">Link Schoology</button> <button class="btn-secondary float-right mx-2">Skip</button>
                </div>
              </div>

            </li>
            <li :class="{'active':activeStep===3}" class="c-stepper__item">

              <div class="c-stepper__content">
                <h3 class="c-stepper__title">Start using Gunn.One</h3>
                <div class="card expansion block mt-3">
                  <p class="mb-2">Yay! You're all set. Click the button below to start using Gunn.One.</p>
                  <a href="/app" class="btn-primary mx-auto">Go!</a>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
const getPasswordStrength = require('password-strength-calc');
export default {
  name: "register",
  auth: 'guest',
  data:()=>({
    activeStep:1,
    password:'',
    password2: '',
    email:'',
    name:'',
    error: false,
  }),

  computed: {
    profileError(){
      // check if name exists
      if (this.name.length === 0){
        return 'Please enter a name!'
      }
      if (!(/[a-z]{2}\d{5}@pausd\.us/.test(this.email))) return 'Please use your PAUSD email.'
      if (this.password !== this.password2) return 'Passwords do not match!';
      if (getPasswordStrength(this.password) < 40) return 'Password is not strong!';
      return false
    }
  },
  async mounted(){
    // check if the `jwt` query param is present
    const url = new URL(document.location.href);
    await this.$router.push({path: this.$route.path, query: {}})
    const params = new URLSearchParams(url.search)
    if (params.has('jwt')){
      const jwt = params.get('jwt')
      const oldRedirect = this.$auth.options.redirect;
      this.$auth.options.redirect = false;
      await this.$auth.setUserToken(jwt);
      this.$auth.options.rewriteRedirects = oldRedirect;
      this.activeStep = 3;
    }
    else if (this.$auth.loggedIn){
      this.activeStep = 3;
    }
  },
  methods: {
    completeProfile(){
      if (this.profileError){
        this.error = true;
      }
      else {
        this.error = false;
        this.activeStep ++;
      }
    },
    async goToSchoology(){
      // send the password to save on the server using a cookie
      const result = await this.$axios.$post('/auth/set-credentials', {
        credential: this.password
      })
      console.log(result);
      window.location.href = `/api/auth/register` // going to the server

    }
  }

}
</script>

<style >
.wrapper {
  --circle-size: clamp(1.5rem, 5vw, 3rem);
  --spacing: clamp(0.25rem, 2vw, 0.5rem);
}

.c-stepper__item {
  position: relative;
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
}
.c-stepper__item:before {
  content: "";
  flex: 0 0 var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  @apply bg-gray-200;
}

.c-stepper__item.active:before {

  @apply bg-indigo-500 shadow-indigo-500/50 shadow-lg;
}

.c-stepper__item.completed:before {

  @apply bg-indigo-200 shadow-indigo-500/50 shadow-sm;
}
.c-stepper__item:not(:last-child):after {
  content: "";
  position: absolute;
  left: 0;
  top: calc(var(--circle-size) + var(--spacing));
  bottom: var(--spacing);
  z-index: 0;
  transform: translateX(calc(var(--circle-size) / 2));
  width: 2px;
  @apply  bg-gray-200;
}

.c-stepper__title {
  font-weight: bold;
  font-size: clamp(1rem, 4vw, 1.25rem);
  @apply block my-2;
  /*margin-bottom: clamp(0.85rem, 2vmax, 1rem);*/
}

.c-stepper__content {
  @apply flex flex-col w-full
}

.c-stepper__desc {
  color: grey;
  font-size: clamp(0.85rem, 2vmax, 1rem);
}

.c-stepper__item.active .expansion {
  @apply max-h-full ;
}

.c-stepper__item:not(.active) .expansion {
  @apply max-h-0 p-0 m-0 overflow-y-hidden  ;
}


</style>
