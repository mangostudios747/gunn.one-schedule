<template>
  <nuxt-link
    
    :to="href"
    class="
      w-full
      py-2.5
      text-sm
      leading-5
      font-medium
      text-primary-100
      hover:bg-white/[0.12] hover:text-white
      rounded-lg
      focus:outline-none focus:ring-2
      cursor-pointer
      mx-auto
      ring-offset-2 ring-offset-primary-400 ring-white ring-opacity-60
      text-center
    "
    :exact="exact"
    exact-active-class="active-tab"
    :active-class="
      exact ? '' : `active-tab`
    "
    ><slot
  /></nuxt-link>
</template>

<script>
export default {
  props: {
    active: {
      default: false,
      type: Boolean,
    },
    href: {
      type: String,
      default: "/page-does-not-exist",
    },
    exact: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.active-tab {
    @apply hover:bg-white dark:hover:bg-slate-300 dark:bg-slate-300 dark:text-primary-900 hover:text-primary-700 text-primary-700 bg-white shadow !important;
}
</style>