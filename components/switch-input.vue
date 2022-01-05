<template>
  <button
  @click="updateValue(!value)"
  :class="value?'bg-white/50':'bg-white/20'"
    class="
      relative
      inline-flex
      flex-shrink-0
      h-[22px]
      w-[38px]
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors
      ease-in-out
      duration-200
      focus:outline-none
      focus-visible:ring-2
      focus-visible:ring-white
      focus-visible:ring-opacity-75
    "
    id="headlessui-switch-1"
    role="switch"
    tabindex="0"
    aria-checked="false"
  >
    <span class="sr-only">Use setting</span
    ><span
    :class="value?'translate-x-4':'translate-x-0'"
      aria-hidden="true"
      class="
        pointer-events-none
        inline-block
        h-[18px]
        w-[18px]
        rounded-full
        bg-white
        shadow-lg
        transform
        ring-0
        transition
        ease-in-out
        duration-200
      "
    ></span>
  </button>
</template>

<script>
export default {
  props:{
    value:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    updateValue(v){
      this.$emit('input', v)
    }
  }
};
</script>

<style>
</style>