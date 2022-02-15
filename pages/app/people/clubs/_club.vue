<template>
  <div class="p-1 flex flex-col mt-2 box">
    <div class="flex mt-2 px-2 flex-row">
        <nuxt-link to="/app/people/clubs"><left-icon class="text-white [stroke-linecap:round] [stroke-width:2] h-6 w-6" /></nuxt-link>
        <h1 class="text-white text-lg leading-6 ml-2 font-semibold">{{club.name}}</h1>
    </div>
     <div class="flex flex-row px-3 py-5">
            <div class=" flex flex-col">
                
                    <dow  >{{dow[club.day]}}</dow>
                
                
                <div class="flex mt-2 flex-row">
                    <div class="rounded-full block h-3 w-3 mx-[2px] bg-white" :key="n+'full'" v-for="n of club.tier" >

                    </div>
                    <div class="rounded-full block h-3 w-3 mx-[2px] dark:bg-slate-900/20 bg-primary-900/20" :key="n" v-for="n of (3 - club.tier)" >

                    </div>
                </div>
            </div>
            <div class=" flex flex-col mx-4 text-center">
                <span class="text-sm mt-2 block leading-5 font-medium text-white">{{club.time}}</span>
                <span v-if="club.room.length < 6" class="text-2xl mb-0 block leading-8 font-bold text-white">{{club.room}}</span>
                <span class="text-white/80 tracking-tight text-lg font-semibold" v-else >{{club.room}}</span>
            </div>
            <div class="text-right grow">
                <p>
                    <span class="text-xs leading-4 font-medium text-white/50">President</span>
                    <span class="text-xs leading-4 font-medium text-white">{{club.prez}}</span>
                </p>
                <p>
                    <span class="text-xs leading-4 font-medium text-white/50">Advisor</span>
                    <span class="text-xs leading-4 font-medium text-white">{{club.advisor}}</span>
                </p>
                <p>
                    <span class="text-xs leading-4 font-medium text-white/50">Email</span>
                    <span class="text-xs leading-4 font-medium text-white">{{club.email}}</span>
                </p>
            </div>
        </div>
    <p class="text-sm mx-3 mb-10 leading-5 font-medium text-primary-50">
        {{club.desc}}
    </p>
    <div >
        <a target="_blank" :href="signInLink" class="btn bg-water/20 text-white mb-2 mr-2 float-right">Attendance Form</a>
    </div>
  </div>
</template>

<script>
const clubs = require('~/content/clubs')
export default {
    data: ()=>({clubs, dow:{
        "Monday":"M",
        "Tuesday":"T",
        "Wednesday":"W",
        "Thursday":"Th",
        "Friday":"F",
        "Sunday":"Su",
        "Saturday":"S"
    }}),
    async asyncData({params}){
        return {club: clubs[params.club]}
    },
    computed: {
        signInLink(){
            return `https://docs.google.com/forms/d/e/1FAIpQLSfFaDat-272V6ZGE1iocJHWoNi8vxDxMETeWWn4rbGOqPXOFQ/viewform?entry.272185165=${encodeURIComponent((this.club||{name:''}).name)}`
        }
    }
}
</script>

