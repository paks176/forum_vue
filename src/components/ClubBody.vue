<template>
  <div v-if="clubPageData.content" class="theme-content__top">
    <section class="project-theme">
      <div class="user">
        <div class="user__avatar">
          <p>{{ clubPageData.content.author.avatar }}</p>
        </div>
        <h3 class="user__nickname">{{ clubPageData.content.author.nick }}</h3>
        <p class="aside-text">{{ clubPageData.content.author.role }}</p>
      </div>
      <div class="project-theme__body">
        <div>
          <div class="project-theme__body--header">
            <div>
              <h2>{{ clubPageData.content.clubContent.header }}</h2>
            </div>
          </div>
          <div class="project-theme__body--text">
            <p>{{ clubPageData.content.clubContent.description }}</p>
          </div>
        </div>

        <div class="aside-text">
          {{ ((clubPageData.content.clubContent.created).split(' ')[0]).replaceAll(':', '.') }}
        </div>
        <div class="project-images" style="display: none;">
          <button class="button-dark">
            Показать изображения
          </button>
          <div class="project-images__container">
          </div>
        </div>
      </div>
    </section>
    <section class="sidebar">
      <div class="project-info">
        <div class="project-info__header">
          <h5>Информация о складчине</h5>
          <p class="text-light">Активна:</p>
          <p class="aside-text">{{ clubPageData.content.clubInfo.notExpired }}</p>
          <p class="text-light">Когда закроется:</p>
          <p class="aside-text">{{ clubPageData.content.clubInfo.expireCondition }}</p>
        </div>
        <div class="project-info__body">
          <div class="project-info__item">
            <p>Вход</p>
            <div>
              <div v-if="clubPageData.content.clubInfo.discountEntryCost">
                <p class="old-price text-light"> {{ clubPageData.content.clubInfo.entryCost }} ₽</p>
                <p>{{ clubPageData.content.clubInfo.discountEntryCost }} ₽</p>
              </div>
              <div v-else>
                <span>{{ clubPageData.content.clubInfo.entryCost }} ₽</span>
              </div>
            </div>
          </div>
          <div class="project-info__item">
            <p>Целевая<br>сумма</p>
            <div v-html="clubPageData.content.clubInfo.certificateCost + ' ₽'">
            </div>
          </div>
          <div class="project-info__item">
            <p>Создано</p>
            <p>{{ ((clubPageData.content.clubContent.created).split(' ')[0]).replaceAll(':', '.') }}</p>
          </div>
        </div>

      </div>
      <!--     enter club button      -->
      <div class="project-info">
        <div v-if="getUserInfo.isLogged">
          <button
              class="status-button"
              :class="{[paymentButtonData.buttonStatusClass]: true}"
              
              :data-payment-id="paymentButtonData.paymentId"
              :data-payment-status="paymentButtonData.buttonStatusClass"
              @click="paymentButtonAction"
              style="margin-bottom: 15px"
          >
            {{ paymentButtonData.enterButtonText }}
          </button>
          <p class="project-message">{{ paymentButtonData.enterMessage }}</p>
        </div>
        <div v-else>
          <p class="project-message">Войдите в профиль или зарегистрируйтесь чтобы вступить</p>
        </div>
      </div>
      <!--     / enter club button      -->
    </section>
  </div>
</template>

<script>
import router from "@/router";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "ClubBody",
  props: {
    clubId: {
      type: String,
    }
  },
  data() {
    return {
      clubPageData: {},
      paymentButtonData: {
        enterButtonShow: '',
        enterButtonText: '',
        enterMessage: '',
        buttonStatusClass: '',
        paymentsLinkStatus: '',
        participation: '',
        paymentId: '',
      },
      headers: '',
      siteName: '',
    }
  },
  computed: {
    ...mapGetters(['getData', 'getUserInfo', 'getGlobals']),
  },

  methods: {
    ...mapActions(['sendRequest', 'getUserPayment']),
    ...mapMutations(['setData']),
    checkDiscounts(clubContent) {
      let discounts = {}
      if (clubContent.costInfo.discountCertificateCost !== null) {
        discounts.discountCertificateCost = clubContent.costInfo.discountCertificateCost + ' ₽'
      } else {
        discounts.discountCertificateCost = ''
      }
      if (clubContent.costInfo.discountEntryCost !== null) {
        discounts.discountEntryCost = clubContent.costInfo.discountEntryCost + ' ₽'
      } else {
        discounts.discountEntryCost = ''
      }
      return discounts
    },
    paymentButtonAction() {
      const button = this.$el.querySelector('.status-button');
      if (button) {
        if (button.dataset.paymentId !== 'none') {
          const options = {
            content: "<h6>Вы действительно хотите перейти к платежам?</h6>",
            action: {
              display: 'block',
              buttonText: 'Перейти',
              function: this.goToPayments,
            },
          }
          this.$modal.initModal(options);
        } else {
          const options = {
            content: `
                <h6>Вы действительно хотите вступить в группу?</h6>
                <div>
                <p class="message">Стоимость участия: 
                    <b>${this.clubPageData.content.clubInfo.discountEntryCost ? this.clubPageData.content.clubInfo.discountEntryCost : this.clubPageData.content.clubInfo.entryCost} ₽</b>
                    </p>
                    
                    <p>При нажатии "Вступить" будет создана запись в вашем списке платежей. В ней можно будет увидеть реквизиты для внесения платежа. После подтверждения оплаты Администратором вы станете участником Складчины и сможете читать и писать комментарии.</p>
                </div>`,
            action: {
              display: 'block',
              buttonText: 'Вступить',
              function: this.createPayment,
              argument: this.clubPageData.content.clubInfo.clubID,
            },
          }
          this.$modal.initModal(options);
        }
      }
    },
    goToPayments() {
      const button = this.$el.querySelector('.status-button');
      let params = {
        newPayment: button.dataset.paymentId === 'none',
        paymentId: button.dataset.paymentId === 'none' ? null : button.dataset.paymentId,
      };
      router.push({
        name: `Payments`,
        params
      })
    },
    
    createPayment(clubId) {
      fetch(`${this.getGlobals.siteName}/v1/payment/${clubId}`, {
        method: 'POST',
        credentials: "include",
        headers: this.getGlobals.headers
      })
          .then(response => {
            if (response.status === 200) {
              response.json()
                  .then(data => {
                    let params = {
                      newPayment: true,
                      paymentId: data.id,
                    };
                    router.push({
                      name: `Payments`,
                      params
                    })
              })
            } else {
              const options = {
                content: `<h6>Произошла ошибка!</h6><p style="text-align: center; font-size: 48px">${response.status}</p>`,
              };
              this.$modal.initModal(options);
            }
          })
          .catch(err => {
            const options = {
              content: `<h6>Произошла ошибка!</h6><p style="text-align: center; font-size: 48px">${err}</p>`,
            };
            this.$modal.initModal(options);
          })
    }
  },
  
  mounted() {
    this.siteName = this.getGlobals.siteName;
    const clubRequest = {
      method: 'GET',
      requestURL: `/v1/club/${this.clubId}`,
      headers: this.getGlobals.headers,
      body: null,
      stateTarget: [`club-${this.clubId}_content`]
    };
    let responseClubData = {
      author: {},
      clubContent: {},
      clubInfo: {},
      thisUser: {}
    };
    let mutatedClubData = {
      author: {},
      clubContent: {},
      clubInfo: {},
      thisUser: {}
    };
    this.sendRequest(clubRequest)
        .then(() => {
          Object.assign(responseClubData, this.getData([`club-${this.clubId}_content`]));
          const authorRequest = {
            method: 'GET',
            requestURL: `/v1/account/${responseClubData.authorId}`,
            headers: this.getGlobals.headers,
            body: null,
            stateTarget: [`club-${this.clubId}_content`, 'author']
          };
          this.sendRequest(authorRequest)
              .then(() => {
                const thisAuthor = this.getData([`club-${this.clubId}_content`, 'author']);
                mutatedClubData.author.avatar = thisAuthor.email ? (thisAuthor.email.slice(0, 1)).toUpperCase() : 'A'
                mutatedClubData.author.nick = thisAuthor.email;
                mutatedClubData.author.role = this.$getUserRole(thisAuthor.role).text;
                // getting club content
                mutatedClubData.clubContent.header = responseClubData.name;
                mutatedClubData.clubContent.description = responseClubData.description;
                mutatedClubData.clubContent.created = responseClubData.created;
                mutatedClubData.clubContent.clubID = responseClubData.id;
                const participantsRequest = {
                  method: 'GET',
                  requestURL: `/v1/club/${this.clubId}/count`,
                  headers: this.getGlobals.headers,
                  body: null,
                  stateTarget: [`club-${this.clubId}_content`, 'participantsCount']
                }
                this.sendRequest(participantsRequest)
                    .then(() => {
                      mutatedClubData.clubInfo.clubID = responseClubData.id;
                      mutatedClubData.clubInfo.participants = this.getData([`club-${this.clubId}_content`, 'participantsCount']);
                      mutatedClubData.clubInfo.expireCondition = responseClubData.activeInfo.expireCondition;
                      mutatedClubData.clubInfo.notExpired = responseClubData.activeInfo.expired ? 'Да' : 'Нет';
                      mutatedClubData.clubInfo.certificateCost = responseClubData.costInfo.certificateCost;
                      mutatedClubData.clubInfo.entryCost = responseClubData.costInfo.entryCost;
                      const discounts = this.checkDiscounts(responseClubData);
                      mutatedClubData.clubInfo.discountCertificateCost = discounts.discountCertificateCost;
                      mutatedClubData.clubInfo.discountEntryCost = discounts.discountEntryCost;
                      this.$set(this.clubPageData, 'content', mutatedClubData);
                    })
                    .then(() => {
                      if (this.getUserInfo.isLogged) {
                        const userPaymentInfoRequest = {
                          method: 'GET',
                          requestURL: `/v1/club/${this.clubId}/payment`,
                          headers: this.getGlobals.headers,
                          stateTarget: [`club-${this.clubId}-payment`],
                        };
                        this.sendRequest(userPaymentInfoRequest)
                            .then(() => {
                              this.paymentButtonData = this.$definePaymentStatus(this.getData([`club-${this.clubId}-payment`]))
                            })
                      }
                    })
              })
        })}
  }
  
</script>

<style scoped>

</style>