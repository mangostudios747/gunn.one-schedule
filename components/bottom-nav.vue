<template>
  <div class="fixed border-t border-primary-200/20 bottom-0 w-full h-16 bg-primary-500/40 flex flex-row backdrop-blur-xl z-[5] pb-1 px-2 pt-1 sm:hidden sm:pointer-events-none">
  <div class="option">
      <dots-icon  class="option-icon" />
      <span class="option-text">More</span>
    </div>
    <nuxt-link active-class="active" to="/app/todo" class="option ">
      <checklist-icon  class="option-icon" />
      <span class="option-text">Todo</span>
    </nuxt-link>
    <nuxt-link active-class="active" exact to="/app" class="option">
      <calendar-icon  class="option-icon" />
      <span class="option-text">Schedule</span>
    </nuxt-link>
    <div class="option ">
      <classes-icon  class="option-icon" />
      <span class="option-text">Classes</span>
    </div>
    <nuxt-link active-class="active" to='/app/settings' class="option">
      <cog-icon  class="option-icon" />
      <span class="option-text">Settings</span>
    </nuxt-link>
    
    </div>
</template>

<script>
export default {

}
</script>

<style>
.option {
 @apply grow cursor-pointer rounded-lg hover:bg-white/10 m-1 flex hover:text-white/50 text-white/40 flex-col text-center basis-0;
}
.option-icon {
    @apply h-7 w-7 mx-auto mt-auto;
}
.option-text {
    @apply block mb-auto text-xs font-light;
}

.option.active {
  @apply text-white;
}
</style>