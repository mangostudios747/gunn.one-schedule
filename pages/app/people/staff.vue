<template>
    <div class="flex flex-col my-2 p-1 space-y-1 bg-indigo-900/20 rounded-xl"
          role="tablist"
          aria-orientation="vertical">

        <tab :key="member.id" v-for="member of staff">
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