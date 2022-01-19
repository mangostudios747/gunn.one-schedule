<template>
  <div class="h-full w-full">
      <div v-if="$auth.loggedIn"></div>
      <log-in-banner v-else/>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>