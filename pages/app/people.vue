<script>
export default {
  middleware({redirect, route}){
      const oopRegex = /^\/app\/people\/?$/;
      if (oopRegex.test(route.fullPath)){
          redirect('/app/people/clubs')
      }
  },  
  render() {
    return (
      <div class="w-full pt-14 md:pt-3 px-3 h-full">
        <div
          class="flex p-1 space-x-1 bg-indigo-900/20 rounded-xl"
          role="tablist"
          aria-orientation="horizontal"
        >
          <tab href="/app/people/clubs" active={this.$route.fullPath.split('/')[3]==='clubs'}>
            Clubs
          </tab>
          <tab href="/app/people/staff" active={this.$route.fullPath.split('/')[3]==='staff'}>
            Staff
          </tab>
        </div>
        <nuxt-child />
      </div>
    );
  },
};
</script>

<style>
</style>