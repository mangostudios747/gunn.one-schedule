<template>
  <div>
    <div :key="update.id" v-for="update of updates">
      <update :update='update'/>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $auth, $axios, params }) {
      console.log($auth.loggedIn)
      if (!$auth.loggedIn) return {updates: []}
    const { sectionId } = params;
    const { updates } = await $axios.$get(`/sections/${sectionId}/updates`);
    return { updates };
  },
};
</script>

<style>
br {
    display: none;
}

</style>