<template>
  <div class="box flex flex-col py-4 px-6 my-3">
        <div class="flex flex-row">
          <img class="h-8 w-8 object-cover rounded-full" :src="update.author.picture_url" />
          <span
            class="text-xl ml-4 text-white tracking-wide leading-8 font-medium"
            >{{ update.author.name_display }}</span
          >
        </div>
        <div :class="expanded?'':'clamped'" class="prose update-body  prose-invert opacity-80">
          <div  v-html="update.parsedBody"></div>
        </div>
      </div>
</template>

<script>
export default {
    props: ['update'],
    data:()=>({
        expanded:false,
    })
}
</script>

<style>

</style>