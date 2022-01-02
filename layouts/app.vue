<template>
  <div class="h-screen before:content-['_'] before:brick-indigo before:bg-slate-700 before:absolute before:top-0 before:left-0 before:h-full before:w-full  w-screen relative  ">
    <div class="relative flex flex-row  overflow-y-scroll w-full h-full">
    <button class="fixed md:hidden top-4 left-4" @click="sidebar = true;" v-if="!sidebar"><menu-icon  class="text-white  h-8 w-8" /></button>
    <button
    :class="sidebar?'bg-black/60 backdrop-blur-[7px]':'bg-black/0 pointer-events-none'"
    @click="sidebar=false;"
    class="z-10 md:pointer-events-none transition-all duration-500 fixed  top-0 left-0 h-full w-full "
    ></button>
    <nav :class="sidebar?'w-60':'md:w-60 w-0'" class="h-full md:sticky  transition-all fixed  z-20 top-0 left-0 bg-gray-200/30 backdrop-blur-sm rounded-r-2xl shadow-2xl overflow-x-hidden duration-500">
    <button class="absolute md:hidden top-4 right-4" @click="sidebar = false;" >
      <close-icon class="h-8 w-8 text-white"/>
    </button>
     <div class="mx-5 pt-8">
       <h1 class="font-semi tracking-wide text-slate-50/90 text-xl">Gunn.One</h1>
       <div class="mt-3">
        <a :class="n===2?'bg-indigo-700/50 text-slate-50/70':'bg-slate-50/40 text-slate-50/80 '" class="block cursor-pointer  font-medium  my-3 rounded-lg px-3 py-2" :key="n" v-for="n of 4">
          Option {{n}}
        </a>
       </div>
       <button @click="$auth.logout()" class="btn-primary ">logout</button>
     </div>
    </nav>
    <Nuxt/>
    </div>
  </div>
</template>

<script>
import CloseIcon from '~/components/ui/close-icon.vue'
import menuIcon from '~/components/ui/menu-icon.vue'
export default {
  components: { menuIcon, CloseIcon },
  name: "app",
  data: ()=>({
    sidebar: false,
  })
}
</script>

<style >

</style>
