<template>
  <transition name="fade">
    <div class="empty">
      <h2>Здесь пусто</h2>
      <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 200 200" version="1.1">
        <g id="surface1">
          <path style=" stroke:none;fill-rule:nonzero;fill:#00382B;fill-opacity:1;" d="M 10.890625 69.023438 L 2 113.625 L 2 175.53125 L 198 175.53125 L 198 113.625 L 189.109375 69.023438 L 180.167969 24.46875 L 19.832031 24.46875 Z M 171.230469 33.214844 C 171.230469 33.40625 187.769531 110.46875 188.199219 112.285156 L 188.441406 113.386719 L 125.097656 113.386719 L 123.425781 116.636719 C 119.074219 125.097656 109.417969 131.074219 100 131.074219 C 90.582031 131.074219 80.925781 125.097656 76.574219 116.636719 L 74.902344 113.386719 L 11.464844 113.386719 L 11.753906 112.238281 C 11.894531 111.617188 15.574219 94.550781 19.925781 74.375 C 24.324219 54.15625 28.101562 36.609375 28.339844 35.320312 L 28.867188 33.074219 L 100.046875 33.074219 C 139.199219 33.074219 171.230469 33.167969 171.230469 33.214844 Z M 171.230469 33.214844 "/>
        </g>
      </svg>
      <a class="bright-button" id="${backTarget.id}" data-target="${backTarget.dataset.target}" data-crumb="${backTarget.dataset.crumb}">Назад</a>
    </div>
  </transition>
  
</template>

<script>
export default {
  name: "emptyList"
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  display: block;
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>