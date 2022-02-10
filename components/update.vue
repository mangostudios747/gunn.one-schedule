<template>
  <div class="box flex update flex-col py-4 px-6 my-3">
    <div class="flex flex-row">
      <img class="h-8 w-8 object-cover rounded-full" :src="update.author.picture_url"/>
      <span
        class="text-xl ml-4 text-white tracking-wide leading-8 font-medium"
      >{{ update.author.name_display }}</span
      >
    </div>
    <input :id="`update-${update.id}-show-more`" type="checkbox">
    <div class="prose update-body truncated prose-invert opacity-80">

      <div v-html="update.parsedBody"></div>

    </div>

    <label class="show-more" :for="`update-${update.id}-show-more`" role="button">read more</label>
    <label class="show-less hidden" :for="`update-${update.id}-show-more`" role="button">read less</label>
  </div>
</template>

<script>
export default {
  props: ['update'],
}
</script>

<style lang="scss">
.update {

  input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
  }

  .update-body {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  input:focus ~ label {
    outline: -webkit-focus-ring-color auto 5px;
  }

  input:checked ~ .update-body {
    -webkit-line-clamp: unset;
  }

  input:checked ~ label.show-more,
  .update-body:not(.truncated) ~ label.show-more {
    display: none;
  }
  input:checked ~ label.show-less,
  .update-body:not(.truncated) ~ label.show-less {
    display: block;
  }

}


</style>
