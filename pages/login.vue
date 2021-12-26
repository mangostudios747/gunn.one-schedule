<template>
  <div class="mx-auto my-auto min-w-[24rem]  card">
    <h1 class="font-bold text-xl tracking-wide">Login</h1>
    <div class="flex login-info flex-col">
      <input placeholder="School email" />
      <input placeholder="Password" />
    </div>
    <span class="text-small block mb-2">Don't have an account? <a class="link" href="/register">Register</a> instead.</span>
    <button class="float-right block my-2 btn-primary">Login</button>
  </div>
</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>
.login-info input {
  @apply bg-gray-50 shadow-lg rounded-lg px-3 py-2 my-2;
}
</style>
