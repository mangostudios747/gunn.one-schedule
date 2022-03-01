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
      <div class="overflow-auto pb-3 flex-auto md:pt-3 px-3 flex flex-col mb-8">
        <div
          class="flex sticky top-0 p-1 space-x-1 box"
          role="tablist"
          aria-orientation="horizontal"
        >
          <tab  href="/app/people/clubs" active={this.$route.fullPath.split('/')[3]==='clubs'}>
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
