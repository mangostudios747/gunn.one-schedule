<template>
  <div class="fixed border-t border-primary-200/20 bottom-0 w-full h-16 dark:bg-gray-600/40 bg-primary-500/40 flex flex-row backdrop-blur-xl z-[5] pb-1 px-2 pt-1 sm:hidden sm:pointer-events-none">
    <nuxt-link active-class="active" to="/app/todo" class="option ">
      <checklist-icon  class="option-icon" />
      <span class="option-text">Todo</span>
    </nuxt-link>
    <nuxt-link active-class="active" to="/app/utilities" class="option ">
      <svg xmlns="http://www.w3.org/2000/svg" className="option-icon" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
</svg>
      <span class="option-text">Utilities</span>
    </nuxt-link>
    <nuxt-link active-class="active" exact to="/app" class="option">
      <calendar-icon  class="option-icon" />
      <span class="option-text">Schedule</span>
    </nuxt-link>
    <nuxt-link active-class="active" to="/app/people/"  class="option">
      <group-icon class="option-icon" />
      <span class="option-text">Directories</span>
    </nuxt-link>
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
