<template>
  <div>
    <div :key="update.id" v-for="update of updates">
      <update :update='update'/>
    </div>
  </div>
</template>

<script>
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
export default {
  data:()=>({updates:[]}),
  async asyncData({ $auth, $axios, params, app }) {
    const user = await app.$cookies.get('auth._token.schoology');
    //console.log(user)
      if (!user) return {updates: []}
    const { sectionId } = params;

    return { user, sectionId };
  },
  fetchOnServer: false,
  async fetch(){
    const { updates } = await this.$axios.$get(`/sections/${this.$route.params.sectionId}/updates`, {
      headers:{'Authorization': getCookie('auth._token.schoology')}
    });
    this.updates = updates || []
  },
  mounted(){
    const ps = document.querySelectorAll('.update-body');
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        entry.target.classList[entry.target.scrollHeight > entry.contentRect.height ? 'add' : 'remove']('truncated');
      }
    });

    ps.forEach(p => {
      observer.observe(p);
    });
  }
};
</script>

<style>
br {
    display: none;
}

</style>
