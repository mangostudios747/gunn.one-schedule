<template>
  <div class="flex w-full h-full px-5">
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
        this.$store.commit('elimination/setPopup', false)
      }

    })
  },
  middleware({redirect, store}){

  }

}
</script>
