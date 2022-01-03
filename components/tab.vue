<template>
  <a :class="active?'text-indigo-700 bg-white shadow':'text-indigo-100 hover:bg-white/[0.12] hover:text-white'" class="w-full py-2.5 text-sm leading-5 font-medium  rounded-lg focus:outline-none focus:ring-2 cursor-pointer mx-auto ring-offset-2 ring-offset-indigo-400 ring-white ring-opacity-60  text-center "  role="tab" type="button" aria-selected="false" tabindex="-1"><slot/></a>
</template>

<script>
export default {
    props:{
        active:{
            default:false,
            type:Boolean
        }
    }
}
</script>

<style>

</style>