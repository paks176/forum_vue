<template>
  <div id="app">
    <Header/>
    <BreadCrumbs/>
    <div class="container" id="page-container">
      <div class="content-wrapper">
        <div class="content">
          <Transition name="fade">
            <RouterView/>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import BreadCrumbs from './components/BreadCrumbs.vue'

export default {
  name: 'App',
  components: {
    Header,
    BreadCrumbs
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
