<template>
    <div class="overflow-auto pb-3 flex-auto md:pt-3 px-3 flex flex-col">
      <div @click="$store.commit('catalog/setSelectedCourse', false)" v-if="$store.state.catalog.selectedCourse" class="absolute cursor-pointer flex z-50 top-0 left-0 w-full h-full backdrop-blur-2xl">
        <div  class="cursor-default z-2  box my-auto flex relative max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-xl mx-5 flex-col text-white sm:mx-auto px-3 py-3">
          <button class="cursor-pointer"   @click="$store.commit('catalog/setSelectedCourse', false)"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute top-2 right-2" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
</svg></button>
<div><div class="text-white flex gap-2 flex-row"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 my-auto" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
</svg> {{courses[$store.state.catalog.selectedCourse].homework || 0}} minutes homework / week</div></div>
<div class="flex flex-row gap-2">
          <div class="big-icon flex">
          <div v-if="courses[$store.state.catalog.selectedCourse].subject.a"
            class="
              icon-parent
              bg-red-100
              text-red-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 block my-auto mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.b"
            class="
              icon-parent
              bg-blue-100
              text-blue-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.c"
            class="
              icon-parent
              bg-amber-100
              text-amber-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.d"
            class="
              icon-parent
              bg-green-100
              text-green-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.e"
            class="
              icon-parent
              bg-cyan-100
              text-cyan-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.cte"
            class="
              icon-parent
              bg-purple-100
              text-purple-700/30
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13 7H7v6h6V7z" />
  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
</svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.vpa"
            class="
              icon-parent
              bg-orange-100
              text-orange-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
              />
            </svg>
          </div>
          <div v-else-if="courses[$store.state.catalog.selectedCourse].subject.pe"
            class="
              icon-parent
              bg-indigo-100
              text-indigo-700/30
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
</svg>
          </div>
        </div>
        <div class="info grow-0 flex flex-col">
          <span class="block font-semibold text-lg leading-6"
            >{{ courses[$store.state.catalog.selectedCourse].code
            }}<span class="text-white/60">#{{ courses[$store.state.catalog.selectedCourse].id }}</span></span
          >
          <p v-if="courses[$store.state.catalog.selectedCourse].body" class=" text-xs leading-4">{{ courses[$store.state.catalog.selectedCourse].body.description }}</p>
        </div>
        
</div>
        </div>
      </div>
    <h1 class="text-white text-3xl leading-9 mb-2 font-bold md:my-3">Course Catalog</h1>
    <div
          class="flex sticky top-0 p-1 space-x-1 box"
          role="tablist"
          aria-orientation="horizontal"
        >
          <tab  href="/app/course-catalog/browse" :active="$route.fullPath.split('/')[3]==='browse'">
            Browse
          </tab>
          <tab href="/app/course-catalog/my-courses" :active="$route.fullPath.split('/')[3]==='my-courses'">
            My Courses
          </tab>
        </div>
         <nuxt-child />
    </div>
</template>

<script>
import courses from '~/content/parsedCourses.json'
export default {
  data:()=>({courses}),
  middleware({redirect, route}){
      const oopRegex = /^\/app\/course-catalog\/?$/;
      if (oopRegex.test(route.fullPath)){
          redirect('/app/course-catalog/browse')
      }
  },
  mounted(){
    this.$store.commit('catalog/loadSelection')
  }
}
</script>

<style scoped>
.icon {
  @apply h-5 w-5 block my-auto mx-auto;
}
.icon-parent {
  @apply w-8 h-8 mt-2 mx-auto rounded-full flex;
}
</style>