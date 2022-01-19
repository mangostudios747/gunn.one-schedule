<template>
  <div class="h-full w-full">
     <div class="h-full w-full" v-show="$auth.loggedIn">
        <construction/>
      </div>
      <div class="h-full w-full" v-show="!$auth.loggedIn">
        <log-in-banner/>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>