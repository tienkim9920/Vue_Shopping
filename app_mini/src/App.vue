<template>
  <div>
    <Header />
  </div>
</template>

<script>
import Header from './Header/Header.vue'

export default {
  name: 'App',

  components: {
    Header
  }
}
</script>

<style>
  .banner{
    height: 45rem;
    background-size: cover;
    background-repeat: no-repeat;
  }
</style>
