<template>
  <div>
    <ClubBody :clubId="this.id"/>
    <ClubComments :clubId="this.id"/>
  </div>
</template>

<script>
import ClubBody from "@/components/ClubBody.vue";
import ClubComments from "@/components/ClubComments.vue";
export default {
  name: "ClubPage",
  components: {ClubComments, ClubBody},
  data() {
    return {
      id: this.$route.params.id,
    }
  }
}
</script>

<style scoped>

</style>