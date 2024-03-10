<template>
<div>
  <p>{{this.$route.params}}</p>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PaymentsPage",
  data() {
    return {
      allPayments: [],
    }
  },
  computed: {
    ...mapGetters(['getData', 'getUserInfo', 'getGlobals']),
  },

  methods: {
    ...mapActions(['sendRequest', 'getUserPayment']),
  },
  mounted() {
    const allPaymentsRequest = {
      method: 'GET',
      requestURL: '/v1/payments',
      headers:  this.getGlobals.headers,
      stateTarget: ['all-my-payments'],
    }
    this.sendRequest(allPaymentsRequest).then(() => {
      this.allPayments = this.getData(['all-my-payments']);
    })
  }
}
</script>

<style scoped>

</style>