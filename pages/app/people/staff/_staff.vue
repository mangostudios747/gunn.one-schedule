<template>
  <div class="p-1 flex flex-col pb-5 mt-2 bg-primary-900/20 rounded-xl">
    <div class="flex mt-2 px-2 flex-row">
        <nuxt-link to="/app/people/staff"><left-icon class="text-white [stroke-linecap:round] [stroke-width:2] h-6 w-6" /></nuxt-link>
        <h1 class="text-white text-lg leading-6 ml-2 font-semibold">{{member.name}}</h1>
    </div>
    <div class="flex mx-3 mt-5 flex-col">
        <p>
            <span class="text-xs leading-4 font-medium text-white/50">Email</span>
                    <span class="text-xs leading-4 font-medium text-white">{{member.email}}</span>
        </p>
        <p>
            <span class="text-xs leading-4 font-medium text-white/50">Department</span>
                    <span class="text-xs leading-4 font-medium text-white">{{member.dept}}</span>
        </p>
        <p>
            <span class="text-xs leading-4 font-medium text-white/50">Phone Number</span>
                    <span class="text-xs leading-4 font-medium text-white">(650)-{{member.phone}}</span>
        </p>
    </div>
  </div>
</template>

<script>
const staff = require('~/content/staff')
export default {
    async asyncData({params}){
        return {member: staff[params.staff]}
    }
}
</script>

<style>

</style>