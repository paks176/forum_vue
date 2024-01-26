<template>
  
  <div>
    <!-- categories -->
    <div v-if="subCategories.content">
      <div v-if="subCategories.content.length > 0"></div>
      <section v-for="item in this.subCategories.content" class="catalog-sub-category" :id="`subcategory_` + item.id" :key="item.id">
        <div class="catalog-sub-category__content">
          <h2>
            <router-link
                :to="{
            path: 'category', 
            name: 'SubContent', 
            query: {id: item.id}, 
            params: {breadCrumbName: item.name}
          }" :id="item.id">{{ item.name }}</router-link>
          </h2>
          <p class="catalog-sub-category__description">{{item.description}}</p>
          <div v-if="getSubCategoryInnerContent(item.id)" class="rendered-list">
            fuck
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
            <router-link
                :to="{
            path: 'category', 
            name: 'SubContent', 
            query: {id: item.id}, 
            params: {breadCrumbName: item.name}
          }" :id="item.id">Подробнее</router-link>
        </div>
      </section>
    </div>
    
    <!--  clubs  -->
    <div v-if="subClubs.length > 0">
      <section v-for="club in subClubs" :key="club.id" class="club" :id="`club_` + club.id">
        <div class="club__info">
          <div class="club__image">
            <img src="../assets/img/group.svg" alt="">
          </div>
          <div class="club__content">
            <h2><a>Test edited - 3 edited</a></h2>
            <h3>test edited 6</h3>
            <div class="club__more">
              <p>Общая сумма: <span data-sum="">100000</span> ₽</p>
              <p>Стоимость участия: <span data-cost="">1100</span> ₽</p>
            </div>
          </div>
        </div>
        <div class="club__link">
          <button class="tools-edit disabled" title="Редактировать складчину" id="adminTools">
            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 30 30" version="1.1">
              <g id="surface1">
                <path fill="#4e72e1" style="stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 22.773438 0.273438 C 22.949219 0.0976562 23.1875 0 23.4375 0 C 23.6875 0 23.925781 0.0976562 24.101562 0.273438 L 29.726562 5.898438 C 29.902344 6.074219 30 6.3125 30 6.5625 C 30 6.8125 29.902344 7.050781 29.726562 7.226562 L 10.976562 25.976562 C 10.886719 26.066406 10.777344 26.136719 10.660156 26.183594 L 1.285156 29.933594 C 0.9375 30.070312 0.539062 29.992188 0.273438 29.726562 C 0.0078125 29.460938 -0.0703125 29.0625 0.0664062 28.714844 L 3.816406 19.339844 C 3.863281 19.222656 3.933594 19.113281 4.023438 19.023438 Z M 21.011719 4.6875 L 25.3125 8.988281 L 27.738281 6.5625 L 23.4375 2.261719 Z M 23.988281 10.3125 L 19.6875 6.011719 L 7.5 18.199219 L 7.5 18.75 L 8.4375 18.75 C 8.957031 18.75 9.375 19.167969 9.375 19.6875 L 9.375 20.625 L 10.3125 20.625 C 10.832031 20.625 11.25 21.042969 11.25 21.5625 L 11.25 22.5 L 11.800781 22.5 Z M 5.683594 20.015625 L 5.484375 20.214844 L 2.621094 27.378906 L 9.785156 24.515625 L 9.984375 24.316406 C 9.617188 24.179688 9.375 23.828125 9.375 23.4375 L 9.375 22.5 L 8.4375 22.5 C 7.917969 22.5 7.5 22.082031 7.5 21.5625 L 7.5 20.625 L 6.5625 20.625 C 6.171875 20.625 5.820312 20.382812 5.683594 20.015625 Z M 5.683594 20.015625 "></path>
              </g>
            </svg>
          </button>
          <a data-target="club-page" id="27" data-crumb="Test edited - 3 edited">Подробнее</a>
        </div>
      </section>
    </div>
  </div>
  
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SubContent",
  
  data() {
    return {
      subCategories : [],
      subClubs: [],
      subCategoryInnerContent: {},
    }
  },
  
  computed: {
    currentQuery() {
      return this.$route.query.id;
    },
    ...mapGetters(['getData']),
    ...mapGetters(['getGlobals']),
  },
  
  methods: {
    ...mapActions(['sendRequest']),
    
    getSubCategoryInnerContent(categoryID) {
      
      let itemSubContent = {
        innerCategories: null,
        innerClubs: null,
      }
      
      const getSubCategoryInnerCategoriesRequest = {
        method: 'GET',
        requestURL: `/v1/categories?parent_id=${categoryID}`,
        headers:  this.getGlobals.headers,
        stateTarget: `category-${categoryID}_subcategories`
      };
      
      const getSubCategoryInnerClubsRequest = {
        method: 'GET',
        requestURL: `/v1/clubs?category_id=${categoryID}&expired=false`,
        headers:  this.getGlobals.headers,
        stateTarget: `category-${categoryID}_subclubs`
      };
      
      this.sendRequest(getSubCategoryInnerCategoriesRequest)
          .then(() => {
            let getDataContent = this.getData(`category-${categoryID}_subcategories`);
            itemSubContent.innerCategories = getDataContent.content;
          })
          .then(() => {
            this.sendRequest(getSubCategoryInnerClubsRequest)
                .then(() => {
                  itemSubContent.innerClubs = this.getData(`category-${categoryID}_subclubs`);
                  Object.assign(this.subCategoryInnerContent, itemSubContent);
                 
                    return true
                
                })
          })
          .catch(() => {return false})
    }
  },
  
  mounted() {
    
    const subCategoriesRequest = {
      method: 'GET',
      requestURL: `/v1/categories?parent_id=${this.currentQuery}`,
      headers:  this.getGlobals.headers,
      body: null,
      stateTarget: `subcontent-${this.currentQuery}_category-list`
    }
    
    const subClubsRequest = {
      method: 'GET',
      requestURL: `/v1/clubs?category_id=${this.currentQuery}&expired=false`,
      headers:  this.getGlobals.headers,
      body: null,
      stateTarget: `subcontent-${this.currentQuery}_club-list`
    }
    
    this.sendRequest(subCategoriesRequest)
        .then(() => {
          this.subCategories = this.getData(`subcontent-${this.currentQuery}_category-list`);
          this.sendRequest(subClubsRequest)
              .then(() => {
                this.subClubs = this.getData(`subcontent-${this.currentQuery}_club-list`);
              })
        });

    setTimeout(() => {console.log(this.$store)}, 500)
  },

 
}
</script>

<style scoped>

</style>