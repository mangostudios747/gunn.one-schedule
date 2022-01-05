<template>
  <div class="h-full md:pl-2  pl-5 pr-5 w-full">
      <h1 class="text-white text-3xl leading-9 font-bold  md:my-3">Settings</h1>
      <div class="box my-4 p-4">
          <h2 class="text-base leading-4 font-medium text-white/70 mb-5">Appearance</h2>
          <div class="flex flex-row">
              <switch-input id="dark-mode" v-model="darkMode" class="my-auto"/>
              <label for="dark-mode" class="text-white my-auto font-medium mx-2">Dark Mode</label>
              </div>
      </div>
      <div class="box my-4 p-4">
          <h2 class="text-base leading-4 font-medium text-white/70 mb-5">Classes</h2>
          <label class="text-white my-auto font-medium mx-2">Coming Soon!</label>


      </div>
  </div>
</template>

<script>
const {customizations} = require('~/assets/defaultCustomizations');
export default {
    data:()=>({
        customizations,
        darkMode: false,
    }),
    mounted(){
        this.darkMode = this.$store.state.darkMode;
    },
    watch:{
        darkMode(){
            this.updateDarkMode()
        }
    },
    methods:{
        updateClasses(){

        },
        updateDarkMode(){
            this.$store.commit('setDarkMode', this.darkMode)
            localStorage.setItem('g1.theme', this.darkMode?'dark':'light')
        }
    }
}
</script>

<style>

</style>