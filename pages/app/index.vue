<template>
  <div class="flex flex-col mt-5 pb-10 w-full">
    <div class="header w-[70%] mx-auto px-4 flex flex-row mb-3 text-center">
        <button @click="previousDay"><left-icon class="w-8 h-8 [stroke-linecap:round] [stroke-width:2] text-white" /></button>
        <div class="grow">
      <span class="block  tracking-wide text-3xl font-semibold text-white"
        >{{DateTime.fromJSDate(currentDate).get('weekdayLong')}}</span
      >
      <span class="block text-lg text-white/70">{{new Date(currentDate).toISOString() | luxon}}</span>
        </div>
        <button @click="nextDay"><right-icon class="w-8 h-8 [stroke-linecap:round] [stroke-width:2] text-white" /></button>
    </div>
    <div
      :style="`background-color:${period.color[500] || period.color}99; `"
      :key="period.id"
      v-for="period of sched"
      class="class-block z-0"
      :class="period.status==0?'scale-105  period-status-0':`period-status-${period.status}`"
    >
    <div :style="`background-color:${period.color[600] || period.color}ee; width:${period.progress}%;`" class="h-full transition-all duration-500 absolute left-0 rounded-md top-0 z-10">
    </div>


    <!-- begin body -->
        <div class="z-20 relative">
      <span :style="`color:${period.color[50]}dd;`" class="title">{{
        period.name
      }}</span>
      <span :style="`color:${period.color[50]}bb`" class="text-sm"
        >{{
          DateTime.fromJSDate(new Date(period.start)).toLocaleString(
            DateTime.TIME_SIMPLE
          )
        }}
        to
        {{
          DateTime.fromJSDate(new Date(period.end)).toLocaleString(
            DateTime.TIME_SIMPLE
          )
        }}</span
      >
        </div>
    <!-- end body -->
    </div>
  </div>
</template>

<script>
import leftIcon from '~/components/left-icon.vue';
import RightIcon from '~/components/right-icon.vue';
const { DateTime } = require("luxon");

export default {
  components: { leftIcon, RightIcon },
  data: () => ({
    currentDate: new Date("1/6/2022 12:40 PM"),
    DateTime,
  }),
  methods: {
      nextDay(){
          this.currentDate = this.currentDate.addDays(1);
      },
      previousDay(){
          this.currentDate = this.currentDate.addDays(-1);
      }
  },
  computed: {
    sched(){
        return this.$store.getters["schedule/scheduleForDate"](
      this.currentDate
    );
    }
  },
};
</script>

<style>
.class-block {
  @apply mx-auto relative shadow-primary-600/50 shadow-2xl w-[70%] my-2 backdrop-blur-sm py-4 px-6 rounded-md;
}

.class-block .title {
  @apply font-semibold block tracking-wide text-lg;
}


/*
.period-status--1 ~ .period-status-0 {
  scale: 1.03;
}

.period-status-1 {
  scale: 1.03;
}

.period-status-1 ~ .period-status-1 {
  scale: 1.00;
}*/
</style>