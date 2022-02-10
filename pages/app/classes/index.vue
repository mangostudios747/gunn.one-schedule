<template>
  <div class="h-full w-full">
    <h1 class="text-white text-3xl leading-9 font-bold md:my-3">Classes</h1>
    <div
      class="flex flex-col my-3 box px-6 pt-4 pb-2"
      :key="section.id"
      v-for="section of sections"
    >
      <div class="flex flex-row">
        <img class="object-cover h-8 w-8 rounded-full" :src="section.profile_url" />
        <span
          class="text-xl ml-4 text-white tracking-wide leading-8 font-medium"
          >{{ section.course_title }}</span
        >
      </div>
      <div class="flex mt-1 w-full flex-row">
        <div class="option">
          <grades-icon class="option-icon" />
          <span class="option-text">Grades</span>
        </div>
        <nuxt-link :to="`/app/classes/${section.id}/updates`" class="option">
          <updates-icon class="option-icon" />
          <span class="option-text">Updates</span>
        </nuxt-link>
        <div class="option">
          <checklist-icon class="option-icon" />
          <span class="option-text">Todo</span>
        </div>
        <div class="option">
          <calendar-icon class="option-icon" />
          <span class="option-text">Calendar</span>
        </div>
        <div class="option">
          <folder-icon class="option-icon" />
          <span class="option-text">Materials</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import calendarIcon from "~/components/calendar-icon.vue";
export default {
  components: { calendarIcon },
  async asyncData({ $auth, $axios, store }) {

    if (!$auth.loggedIn) return { sections: [] };
    // user exists!
    const sections = await $axios.$get("/users/me/sections");
    return { sections };
  },
};
</script>

<style>
.option {
  @apply grow cursor-pointer rounded-lg p-1 hover:text-white hover:bg-white/10 m-1 flex  text-white/70 flex-col  text-center basis-0;
}
.option-icon {
  @apply h-7 w-7 mx-auto mt-auto;
}
.option-text {
  @apply block mx-auto mb-auto text-xs font-light;
}
</style>
