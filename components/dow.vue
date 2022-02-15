<template>
<span @click="$emit('click')" :class="active?'bg-white shadow':`bg-primary-900/20 dark:bg-slate-900/20 ${button?'hover:bg-primary-50/20 cursor-pointer':'cursor-auto'}`" class="rounded-full inline-flex text-center items-center h-12 w-12  ">
  <span :class="active?'text-primary-700':(disabled?'text-primary-300':'text-primary-100')" class="flex mx-auto text-lg font-semibold leading-5  items-center text-center"><slot></slot></span></span>
</template>

<script>
export default {
    props:{
        button:{
            default: false,
            type: Boolean,
        },
        active: {
            default: false,
            type: Boolean,
        },
        disabled: {
            default: false, 
            type: Boolean
        }
    }
}
</script>

<style>

</style>