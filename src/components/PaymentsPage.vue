<template>
  <div>
    <section v-for="item in allPayments.content" :key="item.id" class="payment">
      <div class="payment__left">

        <div>
          <p class="payment__header">Имя складчины:</p>
          <h2>
            <router-link :to="`clubpage_${item.paymentInfo.clubId}`">
              {{ item.clubName }}
            </router-link>
          </h2>
        </div>

        <div class="payment__actions">
          <button class="user__button requisite" @click="showRequisite" :data-payment="item.id" :data-club="item.paymentInfo.clubId" style="margin-right: 20px">
            Посмотреть реквизиты
          </button>
          <div v-if="item.status === 'NEW'">
            <button class="user__button" :data-payment="item.id">
              Я оплатил
            </button>
          </div>
        </div>

        <div v-if="item.comment" class="payment__comment">
          <p>Комментарий пользователя к платежу:</p>
          <div class="payment__comment--field">
            {{ item.comment }}
          </div>
        </div>

      </div>

      <div class="status">
        <p class="payment__header">Статус платежа:</p>
        <div class="status-button" :class="{[item.enterStatus.buttonStatusClass]: true}">{{ item.enterStatus.enterButtonText }}</div>
        <p class="aside-text">{{ item.enterStatus.enterMessage }}</p>

        <div v-if="item.paymentInfo.comment" class="payment__comment">
          <p>Комментарий модератора к платежу:</p>
          <div class="payment__comment--field">
            {{ item.paymentInfo.comment }}
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
    
    showRequisite(event) {
      const paymentId = event.target.dataset.payment;
      const options = {
        content: `<div class="requisite-info">
                    <h2 style="margin-bottom: 20px">Реквизиты для оплаты вступления</h2>
                    <div class="requisite-info__item">
                        <span>Название клуба:</span>
                        <p class="requisite-info__value">${this.allPayments.content[paymentId].clubName}</p>
                    </div>
                    <div class="requisite-info__item">
                         <span>Имя владельца карты:</span>
                         <p class="requisite-info__value">${this.allPayments.content[paymentId].requisiteDTO.requisiteInfo.cardHolder}</p>
                    </div>
                    <div class="requisite-info__item">
                         <span>Номер карты:</span>
                         <p class="requisite-info__value">${this.allPayments.content[paymentId].requisiteDTO.requisiteInfo.cardNumber}</p>
                    </div>
                </div>`,
        action: {
          display: 'block',
          buttonText: 'Я оплатил',
          function: this.askConfirmation,
          argument: paymentId,
        },
      }
      this.$modal.initModal(options);
    },
    askConfirmation(paymentId) {
      const options = {
        content: `<div>
                    <h2 style="margin-bottom: 20px">Вы подтверждаете внесение оплаты?</h2>
                    <br>
                    <p>Ваш платеж в складчину <b>${this.allPayments.content[paymentId].clubName}</b> будет переведен в статус "Платеж отправлен" и будет ожидать проверки администратором.</p>
                   </div>`,
        action: {
          display: 'block',
          buttonText: 'Да',
          function: this.sendConfirmation,
          argument: paymentId,
        },
      }
      this.$modal.initModal(options);
    },
    sendConfirmation(paymentId) {
      fetch(`/v1/payment/${paymentId}/send`, {
        method: 'POST',
        credentials: "include"
      }).then(data => {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty('paymentInfo')) {
          console.log(data)
        } else {
          // error message modal
        }
      })
    }
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
      headers: this.getGlobals.headers,
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
                  this.rawPaymentsData[key].enterStatus = this.$definePaymentStatus(this.rawPaymentsData[key]);
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