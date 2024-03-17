<template>
  <div style="display:flex; flex-direction: column; align-items: center">
    <h2>Error! Such page doesn't exist!</h2>
    <br>
    <br>
    <img height="200px" width="auto" src="@/assets/img/website-construction-graphic-4.jpg" alt="">
    <br>
    <br>
    <router-link class="user__button" to="/main">Go to main page</router-link>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Page404"
}
</script>

<style scoped>

</style>