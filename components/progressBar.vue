<template>
  <div class="h-3 relative  max-w-xl rounded-full overflow-hidden">
    <div class="w-full shadow-inner h-full box dark:bg-gray-700 absolute"></div>
    <div
      class="h-full transition-all duration-200 shadow-2xl rounded-full absolute"
      :style="{
        width: value,
        backgroundColor: color
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    value: {
      default: 0, type: Number | String
    },
    color: {
      default: '#28a745',
      type: String
    }
  }
}
</script>

<style scoped>
</style>
