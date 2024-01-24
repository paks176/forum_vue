<template>
<pre>{{this.getData}}</pre>
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
    
  },
  mounted() {
    const testData = {
      method: 'GET',
      requestURL: '/v1/categories',
      headers:  this.getGlobals.headers,
      body: null,
    }
    this.sendRequest(testData);
  }
}
</script>

<style scoped>

</style>