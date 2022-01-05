<template>
    <div class="flex  flex-auto flex-col">
        <div :class="$route.params.club?' hidden':'flex flex-auto'" class="    flex-col flex-auto overflow-auto h-0 mt-2 p-1 space-y-1 box">

        <tab :href="`/app/people/clubs/${id}`" :key="id" v-for="(club, id) of clubs">
            {{club.name}}
        </tab>
    </div>
    <nuxt-child/>
    </div>
</template>
<script>
const clubs = require('~/content/clubs')
export default {
    data: ()=>({clubs}),
    
}
</script>

<style>

</style>