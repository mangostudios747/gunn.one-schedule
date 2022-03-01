<template>
  <div class="fixed border-t border-primary-200/20 bottom-0 w-full h-16 dark:bg-gray-600/40 bg-primary-500/40 flex flex-row backdrop-blur-xl z-[5] pb-1 px-2 pt-1 sm:hidden sm:pointer-events-none">
  <nuxt-link active-class="active" to="/app/classes" class="option ">
      <classes-icon  class="option-icon" />
      <span class="option-text">Classes</span>
    </nuxt-link>
    <nuxt-link active-class="active" to="/app/todo" class="option ">
      <checklist-icon  class="option-icon" />
      <span class="option-text">Todo</span>
    </nuxt-link>
    <nuxt-link active-class="active" exact to="/app" class="option">
      <calendar-icon  class="option-icon" />
      <span class="option-text">Schedule</span>
    </nuxt-link>
    <nuxt-link active-class="active" to='/app/settings' class="option">
      <cog-icon  class="option-icon" />
      <span class="option-text">Settings</span>
    </nuxt-link>
    <nuxt-link active-class="active" to="/app/elimination/"  class="option">
      <svg xmlns="http://www.w3.org/2000/svg" class="option-icon" viewBox="0 0 24 24" fill="transparent" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>

      <span class="option-text">Elimination</span>
    </nuxt-link>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.option {
 @apply grow cursor-pointer rounded-lg hover:bg-white/10 m-1 flex hover:text-white/50 text-white/40 flex-col  text-center basis-0;
}
.option-icon {
    @apply h-7 w-7 mx-auto mt-auto;
}
.option-text {
    @apply block mx-auto mb-auto text-xs font-light;
}

.option.active {
  @apply text-white;
}
</style>
