<template>
  <div>
    <section v-for="item in this.getData.content" class="catalog-category" :key="`category_` + item.id">
      <div class="catalog-category__content">
        <h2>
          <router-link
              :to="{
            path: 'category', 
            name: 'SubContent', 
            query: {id: item.id}, 
            params: {breadCrumbName: item.name}
          }" :id="item.id">{{ item.name }}</router-link>
        </h2>
        <h3>{{ item.description }}</h3>
        <div class="subcategories-rendered">
          <ul v-if="item.childs.length > 0" class="subcategory-list-ul">
            <li v-for="child in cutSubCategories(item.childs)" class="catalog-category__sub" :key="`subcategory_` + child.id">
              <router-link :to="`/subcontent/subcategory_` + child.id" id="5">{{child.name}}</router-link>
            </li>
          </ul>
          <p v-else class="aside-text">Внутри нет вложенных категорий</p>
        </div>
      </div>
      <div class="catalog-category__link">
        <button class="tools-edit disabled" title="Редактировать категорию" id="adminTools">
          <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 30 30" version="1.1">
            <g id="surface1">
              <path fill="#4e72e1" style="stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 22.773438 0.273438 C 22.949219 0.0976562 23.1875 0 23.4375 0 C 23.6875 0 23.925781 0.0976562 24.101562 0.273438 L 29.726562 5.898438 C 29.902344 6.074219 30 6.3125 30 6.5625 C 30 6.8125 29.902344 7.050781 29.726562 7.226562 L 10.976562 25.976562 C 10.886719 26.066406 10.777344 26.136719 10.660156 26.183594 L 1.285156 29.933594 C 0.9375 30.070312 0.539062 29.992188 0.273438 29.726562 C 0.0078125 29.460938 -0.0703125 29.0625 0.0664062 28.714844 L 3.816406 19.339844 C 3.863281 19.222656 3.933594 19.113281 4.023438 19.023438 Z M 21.011719 4.6875 L 25.3125 8.988281 L 27.738281 6.5625 L 23.4375 2.261719 Z M 23.988281 10.3125 L 19.6875 6.011719 L 7.5 18.199219 L 7.5 18.75 L 8.4375 18.75 C 8.957031 18.75 9.375 19.167969 9.375 19.6875 L 9.375 20.625 L 10.3125 20.625 C 10.832031 20.625 11.25 21.042969 11.25 21.5625 L 11.25 22.5 L 11.800781 22.5 Z M 5.683594 20.015625 L 5.484375 20.214844 L 2.621094 27.378906 L 9.785156 24.515625 L 9.984375 24.316406 C 9.617188 24.179688 9.375 23.828125 9.375 23.4375 L 9.375 22.5 L 8.4375 22.5 C 7.917969 22.5 7.5 22.082031 7.5 21.5625 L 7.5 20.625 L 6.5625 20.625 C 6.171875 20.625 5.820312 20.382812 5.683594 20.015625 Z M 5.683594 20.015625 "/>
            </g>
          </svg>
        </button>
        <router-link to="/subcontent" :id="item.id">Подробнее</router-link>
      </div>
    </section>
  </div>
  
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AllCategories",
  computed: {
    ...mapGetters(['getData']),
    ...mapGetters(['getGlobals']),
  },
  methods: {
    ...mapActions(['sendRequest']),
    cutSubCategories(array) {
      return array.slice(0, 3)
    }
  },
  mounted() {
    const allCategoriesRequest = {
      method: 'GET',
      requestURL: '/v1/categories',
      headers:  this.getGlobals.headers,
      body: null,
    }
    this.sendRequest(allCategoriesRequest);
  }
}
</script>

<style scoped>

</style>