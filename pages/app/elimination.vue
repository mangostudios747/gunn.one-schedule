<template>
  <div class="flex w-full h-full px-5 mb-20 overflow-auto pb-3 flex-auto md:pt-3 px-3 flex flex-col">
    <nuxt-child/>
  </div>
</template>
<script>
export default {
  mounted(){
    document.addEventListener('click', ({target})=>{
      // if the popup exists then only one can click on it
      const clickedOnPopup = target.closest('.popup');
      const clickedOnTrigger = target.closest('.popup-trigger');
      // if clicked outside popup
      if (!clickedOnPopup && !clickedOnTrigger){
        this.$store.commit('elimination/setPopup', {})
      }

    })
  },
  beforeMount(){
    // if user not detected, prompt them to login
    if (!localStorage.getItem('g1.eliminationUser')){
      this.$router.push('/app/elimination/login')
    }
  }

}
</script>
