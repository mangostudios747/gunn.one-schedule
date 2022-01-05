<template>
  <div class="h-full md:pl-2  pl-5 pr-5 w-full">
      <h1 class="text-white text-3xl leading-9 font-bold  md:my-3">Settings</h1>
      <div class="box my-4 p-4">
          <h2 class="text-base leading-4 font-medium text-white/70 mb-5">Appearance</h2>
          <div class="flex flex-row">
              <switch-input @input="toggle" id="dark-mode" :value="darkMode" class="my-auto"/>
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
        this.darkMode = localStorage['g1.darkMode'] == 'true';
        //console.log(this.$store.state.darkMode)
    },
    methods:{
        updateClasses(){
                                                                    
        },
        toggle(value){
            const isDark = document.body.parentElement.classList.toggle('dark', value);
            localStorage['g1.darkMode'] = isDark;
            this.$store.commit('setDarkMode', isDark);
        }
    }
}
</script>

<style>

</style>