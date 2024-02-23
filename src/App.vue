<template>
  <div id="app">
    <Header/>
    <BreadCrumbs/>
    <div class="container" id="page-container">
      <div class="content-wrapper">
        <div class="content">
          <Transition name="fade">
            <router-view :key="this.$route.path"></router-view>
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
    BreadCrumbs,
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  display: block;
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
