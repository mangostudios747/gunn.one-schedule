<template>
  <div class="flex flex-col mt-10 w-full">
      <div class="header text-center">
      <span class="block tracking-wide text-4xl font-semibold text-white">Monday</span>
       <span class="block text-lg text-white/70">January 5</span>
      </div>
      <div :style="`background-color:${period.color[500].toString()}88; `" :key='period.name' v-for='period of sched' class=" class-block">
        
          <span :style="`color:${period.color[50]}99;`" class="title">{{period.name}}</span>
        <span>{{period.start}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data:()=>({
        sched:[],
    }),
    mounted(){
        this.sched = this.$store.getters['schedule/scheduleForDate'](new Date('1/5/2022'));
    }
}
</script>

<style>
.class-block {
    @apply mx-auto shadow-xl w-[70%] my-2 backdrop-blur-sm py-4 px-6 rounded-md;
}

.class-block .title {
    @apply font-semibold block tracking-wide text-lg ;
}
</style>