<template>
  <div
    class="
      h-screen
      bg-gradient-to-r
      w-screen
      relative
      pb-16 sm:pb-0
      from-[#5D8AD6] to-[#38B2E8]
      dark:from-slate-750 dark:to-slate-750
    "
  >
    <div
      class="relative  flex flex-col md:flex-row overflow-y-auto w-full h-full"
    >
      <div class="sticky z-[5] backdrop-blur-md flex flex-row md:hidden top-0 py-4">
        <button class="md:hidden px-4" @click="sidebar = true" >
          <menu-icon class="text-white h-8 w-8" />
        </button>
        <div class="text-lg font-semibold text-white px-2 grow">
          {{ Math.round(currentEvent.remaining || currentEvent.elapsed) || currentEvent.remaining }} {{currentEvent.type!=='none'?'minutes':''}} {{ currentEvent.displayText }}
          {{ currentEvent.name }}
        </div>
      </div>

      <button
        :class="
          sidebar
            ? 'bg-black/60 backdrop-blur-[7px]'
            : 'bg-black/0 pointer-events-none'
        "
        @click="sidebar = false"
        class="
          z-10
          md:pointer-events-none
          transition-all
          duration-500
          fixed
          top-0
          left-0
          h-full
          w-full
        "
      ></button>
      <nav
        :class="sidebar ? 'w-60' : 'md:min-w-[200px] w-0'"
        class="
          h-screen
          md:sticky md:bg-transparent
          bg-sky-500
          dark:bg-slate-700
          dark:md:bg-transparent
          transition-all
          fixed
          z-20
          top-0
          left-0
          backdrop-blur-sm
          shadow-2xl
          md:shadow-none
          overflow-x-hidden
          duration-500
        "
      >
        <button
          class="absolute md:hidden top-4 right-4"
          @click="sidebar = false"
        >
          <close-icon class="h-8 w-8 text-white" />
        </button>
        <div class="ml-5 mr-3 md:pt-5 pt-8">
          <h1
            class="
              font-semibold
              text-center
              block
              tracking-wide
              text-slate-50/90 text-xl
            "
          >
            Gunn.One
          </h1>
          <div class="mt-3">
            <div
              class="flex flex-col p-1 space-y-2 box"
              role="tablist"
              aria-orientation="vertical"
            >
              <tab
                @click="sidebar = false"
                :exact="link.exact"
                :key="link.href"
                v-for="link of links"
                v-show="!link.auth || $auth.loggedIn"
                :active="
                  $route.fullPath.split('/')[2] == link.href.split('/')[2]
                "
                :href="link.href"
                >{{ link.title }}</tab
              >
            </div>
          </div>
          <button @click="$auth.logout()" class="btn-primary mt-5 hidden">
            logout
          </button>
        </div>
      </nav>
      <Nuxt />
      <bottom-nav/>
    </div>

  </div>
</template>

<script>
import bottomNav from '~/components/bottom-nav.vue';
export default {
  components: { bottomNav },
  name: "app",

  watch:{
   $route(){
      this.sidebar = false;
    }
  },
  data: () => ({
    links: [
      {
        title: "Schedule",
        href: "/app",
        exact: true,
      },
      {
        title: "Classes",
        href: "/app/classes",
        auth: true
      },
      {
        title: 'Elimination',
        href: '/app/elimination',
      },
      {
        title: "Directories",
        href: "/app/people",
      },
      {
        title: "Utilities",
        href: "/app/utilities",
      },
      {
        title: "Course Catalog",
        href: "/app/course-catalog",
      },
      {
        title: "Settings",
        href: "/app/settings",
      },
    ],
  }),
  computed: {
    currentEvent() {
      return this.$store.getters["schedule/currentEvent"];
    },
    sidebar: {
      get(){
        return this.$store.state.sidebar;
      },
      set(v){
        this.$store.commit('setSidebar', v)
      }
    }
  },
  async mounted(){
    await this.$store.dispatch('schedule/bindSchedule');
    //console.log(localStorage.getItem('g1.darkMode')=='true')
    this.$store.commit('setDarkMode', localStorage.getItem('g1.darkMode')=='true');
    if (this.$auth.loggedIn){
      this.$store.commit('sgy/setUser', await this.$axios.$get('/users/me'))
      console.log('Schoology user detected, loading preferences from server.')
      this.$store.commit('schedule/setCustomizations', {customizations: await this.$axios.$get('/preferences/classes'), sgy: true})
      await this.$store.dispatch('schedule/customize', await this.$axios.$get('/users/me/sections'))
    }
    else {
      console.log('User not detected, loading preferences from browser.')
      this.$store.commit('schedule/setCustomizations', {customizations:JSON.parse(localStorage.getItem('g1.classes'))});
    }
    const v = this;
    window.setInterval(function(){
      v.$store.commit('schedule/resetTime')
    }, 1000)
  }
};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');
</style>
