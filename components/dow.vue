<template>
<span :class="active?'bg-white shadow':`bg-indigo-900/20 ${button?'hover:bg-indigo-50/20 cursor-pointer':'cursor-auto'}`" class="rounded-full inline-flex text-center items-center h-12 w-12  ">
  <span :class="active?'text-indigo-700':(disabled?'text-violet-300':'text-indigo-100')" class="flex mx-auto text-lg font-semibold leading-5  items-center text-center"><slot></slot></span></span>
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