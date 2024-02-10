<template>
  <div>
    <EmptyList v-if="isEmpty"></EmptyList>
    <div v-else>
      <SubCategories
          @emptyList="emptyCategories = true"
          :currentId="this.id"
      />
      <SubClubs
          @emptyList="emptyClubs = true"
          :currentId="this.id"
      />
    </div>
  </div>
</template>

<script>
import SubCategories from "@/components/subCategories.vue";
import SubClubs from "@/components/subClubs.vue";
import EmptyList from "@/components/EmptyList.vue";

export default {
  name: "SubContent",
  
  components: {
    EmptyList,
    SubCategories,
    SubClubs
  },
  
  data() {
    return {
      id: this.$route.params.id,
      emptyCategories: false,
      emptyClubs: false,
      isEmpty: false,
    }
  },
  
  methods: {
    giveEmptyMessage() {
      if (this.emptyCategories && this.emptyClubs) {
        this.isEmpty = true;
      }
    }
  },
  
  watch: {
    emptyCategories() {
      this.giveEmptyMessage();
    },
    emptyClubs() {
      this.giveEmptyMessage();
    }
  },
  
  mounted() {
    
  }
}
</script>

<style scoped>

</style>