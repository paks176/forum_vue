<template>
  <div id="app">
    <Header/>
    <div class="container" id="page-container">
      <div class="content-wrapper">
        <div class="content">
          <RouterView/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
//import AllCategories from './components/AllCategories.vue'

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  display: block;
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
