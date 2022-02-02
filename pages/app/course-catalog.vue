<template>
    <div class="overflow-auto pb-3 flex-auto md:pt-3 px-3 flex flex-col">
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
export default {
  middleware({redirect, route}){
      const oopRegex = /^\/app\/course-catalog\/?$/;
      if (oopRegex.test(route.fullPath)){
          redirect('/app/course-catalog/browse')
      }
  },
}
</script>

<style>

</style>