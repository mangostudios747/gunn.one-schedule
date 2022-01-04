<template>
    <div class="flex flex-row">
        <div :class="$route.params.club?' hidden':'flex flex-auto'" class=" mr-2   overflow-scroll flex-col mt-2 p-1 space-y-1 bg-indigo-900/20 rounded-xl">

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