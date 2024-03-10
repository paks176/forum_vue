<template>
<div>
  <section v-for="item in allPayments.content" :key="item.id" class="payment">
    <div class="payment__left">
      <div>
        <p class="payment__header">Складчина:</p>
        <h2><router-link :to="`clubpage_${item.id}`">{{item.clubName}}</router-link></h2>
      </div>
      <div class="payment__actions">
        <button class="user__button" style="margin-right: 20px" id="requisite" data-club="${element.paymentInfo.clubId}">Посмотреть реквизиты</button>
        ${paymentButton(paymentIndicator.enterButtonVisibility, element.id)}
      </div>

      <div class="payment__comment" style="${commentStatus.userComment}">
        <p>Комментарий пользователя к платежу:</p>
        <div class="payment__comment--field">
          ${commentStatus.userCommentText}
        </div>
      </div>
    </div>

    <div class="status">
      <p class="payment__header">Статус платежа:</p>
      <div class="status-button ${paymentIndicator.buttonStatus}">${paymentIndicator.enterButtonText}</div>
      <p class="aside-text">${paymentIndicator.enterMessage}</p>

      <div class="payment__comment" style="${commentStatus.moderatorComment}">
        <p>Комментарий модератора к платежу:</p>
        <div class="payment__comment--field">
          ${commentStatus.moderatorCommentText}
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "PaymentsPage",
  data() {
    return {
      allPayments: [],
      promises: 0,
      rawPaymentsData: {}
    }
  },
  computed: {
    ...mapGetters(['getData', 'getUserInfo', 'getGlobals']),
  },

  methods: {
    ...mapActions(['sendRequest', 'getUserPayment']),
  },
  
  watch: {
    promises() {
      if (this.promises === 0) {
        this.$set(this.allPayments, 'content', this.rawPaymentsData);
        console.log('this.allPayments:')
        console.log(this.allPayments)
      }
    }
  },
  
  mounted() {
    const allPaymentsRequest = {
      method: 'GET',
      requestURL: '/v1/payments',
      headers:  this.getGlobals.headers,
      stateTarget: ['all-my-payments'],
    }
    
    this.sendRequest(allPaymentsRequest).then(() => {
      Object.assign(this.rawPaymentsData, this.getData(['all-my-payments']));
      if (Object.keys(this.rawPaymentsData).length > 0) {
        for (let key in this.rawPaymentsData) {
            this.promises = Object.keys(this.rawPaymentsData).length;
            fetch(`${this.getGlobals.siteName}/v1/club/${this.rawPaymentsData[key].paymentInfo.clubId}`, {
              method: 'GET',
              credentials: 'include',
            }).then(response => {
              response.json()
                  .then(data => {
                this.rawPaymentsData[key].clubName = data.name;
                this.promises -= 1;
              })
            })
        }
      }
    })
  }
}
</script>

<style scoped>

</style>