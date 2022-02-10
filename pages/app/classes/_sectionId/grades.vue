<template>
  <div>
    {{grades}}
  </div>
</template>

<script>
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export default {
  data:()=>({grades:[]}),
  async asyncData({ params, app }) {
    const user = await app.$cookies.get('auth._token.schoology');
    //console.log(user)
    if (!user) return {grades: []}
    const { sectionId } = params;

    return { user, sectionId };
  },
  fetchOnServer: false,
  async fetch(){
    const { grades } = await this.$axios.$get(`/sections/${this.$route.params.sectionId}/grades`, {
      headers:{'Authorization': getCookie('auth._token.schoology')}
    });
    this.grades = grades || []
  },
}
</script>

<style scoped>

</style>
