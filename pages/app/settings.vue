<template>
  <div class="h-full md:pl-2 pl-5 pr-5 w-full">
    <h1 class="text-white text-3xl leading-9 font-bold md:my-3">Settings</h1>
    <div class="box my-4 p-4">
      <h2 class="text-base leading-4 font-medium text-white/70 mb-5">
        Appearance
      </h2>
      <div class="flex flex-row">
        <switch-input
          @input="toggle"
          id="dark-mode"
          :value="darkMode"
          class="my-auto"
        />
        <label for="dark-mode" class="text-white my-auto font-medium mx-2"
          >Dark Mode</label
        >
      </div>
    </div>
    <div class="box my-4 p-4">
      <h2 class="text-base leading-4 font-medium text-white/70 mb-5">
        Classes
      </h2>
      <div class="flex flex-col">
        <div
          class="flex flex-row border-b border-b-slate-50/20 py-3"
          :key="cid"
          v-for="(c, cid) of customizations"
        ><div>
          <div
            class="w-8  h-8 my-auto rounded-full"
            :style="`background-color:${c.color[500]}`"
          >
          <input
          class="block cursor-pointer opacity-0"
          type="color"
          v-model="c.color[500]"
        />
          </div>
          </div>
          <input class="w-full transition-all duration-200 text-white mx-4 px-2 bg-transparent placeholder:dark:text-white/40 placeholder:text-white/50 outline-none focus:bg-slate-50/10 rounded-lg" :placeholder="cid" v-model="c.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { customizations } = require("~/assets/defaultCustomizations");
export default {
  data: () => ({
    customizations,
    darkMode: false,
  }),
  mounted() {
    this.darkMode = localStorage["g1.darkMode"] == "true";
    this.customizations = JSON.parse(localStorage.getItem('g1.classes') || JSON.stringify(customizations))
    //console.log(this.$store.state.darkMode)
  },
  watch:{
      customizations:{
          deep: true,
          handler(){
              this.updateClasses()
          }
      }
  },
  methods: {
    updateClasses() {
        localStorage.setItem('g1.classes', JSON.stringify(this.customizations))
        this.$store.commit('schedule/setCustomizations', this.customizations)
    },
    toggle(value) {
      const isDark = document.body.parentElement.classList.toggle(
        "dark",
        value
      );
      localStorage["g1.darkMode"] = isDark;
      this.$store.commit("setDarkMode", isDark);
      this.darkMode = value;
    },
  },
};
</script>

<style>
</style>