<template>
  <div id="app">
    <hello></hello>
  </div>
</template>

<script>
import Hello from './lib/Hello.vue'
export default {
  components: {
    Hello
  }
}
</script>

<style>
  body{
    background-color:#fff;
  }
</style>