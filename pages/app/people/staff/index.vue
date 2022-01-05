<template>
  <div class="flex h-0 overflow-auto flex-auto flex-col my-2 p-1 space-y-1 box"
          role="tablist"
          aria-orientation="vertical">

        <tab :href="`/app/people/staff/${id}`" :key="id" v-for="(member, id) of staff">
            {{member.name}}
        </tab>
    </div>
</template>

<script>
const staff = require('~/content/staff')
export default {
    data:()=>({staff})
}
</script>

<style>

</style>