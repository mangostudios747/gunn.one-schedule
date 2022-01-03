<template>
    <div class="flex flex-col my-2 p-1 space-y-1 bg-indigo-900/20 rounded-xl"
          role="tablist"
          aria-orientation="vertical">

        <tab :key="club.id" v-for="club of clubs">
            {{club.name}}
        </tab>
    </div>
</template>
<script>
const clubs = require('~/content/clubs')
export default {
    data: ()=>({clubs}),
    async asyncData({$content}){
        return { clubs: await $content('clubs').fetch()}
    }
}
</script>

<style>

</style>