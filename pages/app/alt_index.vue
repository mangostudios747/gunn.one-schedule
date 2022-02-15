<template>
  <div class="flex text-white flex-col mt-5 px-3 pb-10 w-full">
    <div class="flex flex-col mx-auto mb-7">
      <div class="relative flex flex-row">
        <span
          class="
            text-8xl text-center
            mx-auto
            leading-none
            items-start
            flex
            font-normal
          "
          >{{
            Math.round(currentEvent.remaining || currentEvent.elapsed) ||
            currentEvent.remaining
          }}</span
        >
        <span
          class="
            text-lg
            absolute
            h-full
            origin-left
            -right-7
            mt-2
            leading-7
            font-medium
            items-start
            flex
          "
          >min</span
        >
      </div>
      <span class="text-lg ml-1 block leading-7 font-medium"
        >{{ currentEvent.displayText }} {{ currentEvent.name }}</span
      >
    </div>
    <div
      class="box my-2  overflow-x-auto justify-between py-2 px-2 flex flex-row"
    >
      <div
        :key="period.hcname"
        v-for="(period, idx) of sched"
        :class="idx == 0 ? 'bg-blue-200/20 rounded-md' : ''"
        class="flex py-2 flex-shrink-0 px-5 flex-col"
      >
        <span
          :class="
            idx == 0 ? 'font-semibold' : 'text-white/80 font-medium'
          "
          class="block mx-auto text-xs leading-4"
          >{{period.start.getHours()}}:{{(''+period.start.getMinutes()).padStart(2, '0')}}</span
        >

        <div
          :style="`color:${chroma(period.color[500]).darken(3).hex()}42;background-color:${chroma.mix(period.color[500], 'white', 0.5).hex()}`"
          class="icon-parent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span
        :style="`color:${chroma.mix(period.color[500], 'white', 0.3).hex()};flex:1`"
          class="
            
            mx-auto
            mt-1
            
            font-bold
            overflow-x-visible
            
            text-[9px]
            leading-4
          "

        >
          {{ period.name }}
        </span>
      </div>
    </div>
    <div class="box my-2 p-2 px-4">
      <div
        :class="idx !== 0 ? 'border-t border-t-white/20' : ''"
        class="flex py-2 flex-row"
        :key="idx"
        v-for="(day, idx) in ['MON', 'TUE', 'WED', 'THU', 'FRI']"
      >
        <span class="min-w-[1.5rem] text-xs leading-4 font-semibold">{{
          day
        }}</span>
        <span
          class="
            text-center
            rounded-full
            min-h-[12px] min-w-[12px]
            ml-3
            bg-red-500
            font-bold
            text-[9px]
            my-auto
          "
          ><span class="mx-auto my-auto">{{
            Math.round(Math.random() * 5 + 1)
          }}</span></span
        >
        <span
          class="ml-2 shrink-0 my-auto block font-medium text-[8px] leading-3"
          >9:00 AM</span
        >
        <div
          class="
            h-[7px]
            w-full
            mx-2
            gap-[1px]
            flex flex-row
            my-auto
            rounded-[3.5px]
            p-[1px]
            bg-blue-900/20
          "
        >
          <div class="h-full w-1/4 my-auto rounded-[2.5px] bg-red-200" />
          <div class="h-full w-1/4 my-auto rounded-[2.5px] bg-lime-200" />
          <div class="h-full w-1/6 my-auto rounded-[2.5px] bg-sky-200" />
          <div class="h-full w-1/6 my-auto rounded-[2.5px] bg-purple-200" />
          <div class="h-full w-1/6 my-auto rounded-[2.5px] bg-amber-200" />
        </div>
        <span class="my-auto block font-medium shrink-0 text-[8px] leading-3"
          >4:10 PM</span
        >
      </div>
    </div>
    <div class="box my-2 p-2"></div>
  </div>
</template>

<script>
import chroma from "chroma-js"
export default {
  data: () => ({
    currentDate: new Date().addDays(1),
    chroma,
  }),
  mounted(){
      this.currentDate = new Date().addDays(1)
  },
  computed: {
    currentEvent() {
      return this.$store.getters["schedule/currentEvent"];
    },
    sched() {
      return this.$store.getters["schedule/upcomingEvents"];
    },
  },
};
</script>

<style>
.icon {
  @apply h-[22px] w-[22px] block my-auto mx-auto;
}
.icon-parent {
  @apply w-7 h-7 mt-2 mx-auto rounded-full flex;
}

</style>