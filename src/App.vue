<template>
  <div id="app">
    <Header/>
    <AllCategories/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import AllCategories from './components/AllCategories.vue'

export default {
  name: 'App',
  components: {
    Header,
    AllCategories,
  }
}
</script>

<style></style>
