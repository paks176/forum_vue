<template>
  <div v-if="clubPageData.content" class="theme-content__top">
    <section class="project-theme">
          <div class="user">
            <div class="user__avatar">
              <p>{{clubPageData.content.author.avatar}}</p>
            </div>
            <h3 class="user__nickname">{{clubPageData.content.author.nick}}</h3>
            <p class="aside-text">{{clubPageData.content.author.role}}</p>
          </div>
          <div class="project-theme__body">
            <div>
              <div class="project-theme__body--header">
                <div>
                  <h2>{{clubPageData.content.clubContent.header}}</h2>
                </div>
              </div>
              <div class="project-theme__body--text">
                <p>{{clubPageData.content.clubContent.description}}</p>
              </div>
            </div>

            <div class="aside-text">
              {{((clubPageData.content.clubContent.created).split(' ')[0]).replaceAll(':', '.')}}
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
              <p class="aside-text">{{clubPageData.content.clubInfo.notExpired}}</p>
              <p class="text-light">Когда закроется:</p>
              <p class="aside-text">{{clubPageData.content.clubInfo.expireCondition}}</p>
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
                <p>Целевая сумма</p>
                <div v-html="clubPageData.content.clubInfo.certificateCost + ' ₽'">
                </div>
              </div>
              <div class="project-info__item">
                <p>Создано</p>
                <p>{{((clubPageData.content.clubContent.created).split(' ')[0]).replaceAll(':', '.')}}</p>
              </div>
            </div>

          </div>
          <!--     enter club button      -->
          <div class="project-info">
            <div v-if="getUserInfo.isLogged">
              <button 
                  class="status-button"
                  :class="{[paymentButtonData.buttonStatusClass]: true}"
                  v-if="paymentButtonData.enterButtonShow"
                  :data-payment-id="paymentButtonData.paymentId"
                  :data-payment-status="paymentButtonData.buttonStatusClass"
                  @click="paymentButtonAction"
                  style="margin-bottom: 15px"
              >
                {{paymentButtonData.enterButtonText}}
              </button>
              <p class="project-message">{{paymentButtonData.enterMessage}}</p>
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
    getUserRole(role) {
      switch (role) {
        case 'PARTNER':
          return {
            text: 'Партнер',
            color: '#c99f13'
          }
        case 'ADMIN':
          return {
            text: 'Администратор',
            color: 'rgb(200 80 72)'
          }
        case 'USER':
          return {
            text: 'Пользователь',
            color: 'rgb(0 110 169)'
          }
      }
    },
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
    definePaymentButtonStatus(payment) {
      let result = {};
      switch (payment.status) {
        case 'NEW':
          result.enterButtonShow = true;
          result.enterButtonText = 'Ожидает оплаты';
          result.enterMessage = 'Платеж создан, ожидает вашей оплаты';
          result.buttonStatusClass = 'waitingForUser';
          result.paymentsLinkStatus = 'active';
          result.participation = false;
          result.paymentId = payment.id;
          break
        case 'CONFIRMED':
          result.enterButtonShow = false;
          result.enterButtonText = 'Платеж подтвержден';
          result.enterMessage = 'Платеж подтвержден, вы участник складчины';
          result.buttonStatusClass = 'succeed';
          result.paymentsLinkStatus = 'active';
          result.participation = true;
          result.paymentId = payment.id;
          break;
        case 'SEND':
          result.enterButtonShow = false;
          result.enterButtonText = 'Платеж отправлен';
          result.enterMessage = 'Платеж отправлен, находится на проверке у модератора';
          result.buttonStatusClass = 'waitingForCheck';
          result.paymentsLinkStatus = '';
          result.participation = false;
          result.paymentId = payment.id;
          break;
        default:
          result.enterButtonShow = true;
          result.enterButtonText = 'Вступить';
          result.enterMessage = 'Нажмите, чтобы создать платеж для вступления';
          result.buttonStatusClass = 'notCreated';
          result.paymentsLinkStatus = 'active';
          result.participation = false;
          result.paymentId = 'none';
      }
      this.paymentButtonData = result;
    },
    paymentButtonAction() {
      const button = this.$el.querySelector('.status-button');
      if (button) {
        if (button.dataset.paymentId !== 'none') {
          const options = {
            content: "<h6>Вы действительно хотите перейти к платежам?</h6>",
            action: {
              display: 'block',
              buttonText: 'Вступить',
              function: this.goToPayments,
            },
          }
          this.$modal.initModal(options);
        } else {
          const options = {
            content: "<h6>Вы действительно хотите вступить в группу?</h6><div></div>",
            action: {
              display: 'block',
              buttonText: 'Вступить',
              function: this.goToPayments,
            },
          }
          this.$modal.initModal(options);
        }
      }
    },
    goToPayments() {
      const button = this.$el.querySelector('.status-button');
      let isThisNewPayment = false;
      if (button.dataset.paymentId === 'none') {
        isThisNewPayment = true;
      }
      router.push({
        name: `Payments`,
        params: {
          newPayment: isThisNewPayment
        }
      })
      return true;
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
    }
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

                mutatedClubData.author.avatar = (thisAuthor.email.slice(0, 1)).toUpperCase();
                mutatedClubData.author.nick = thisAuthor.email;
                mutatedClubData.author.role = this.getUserRole(thisAuthor.role).text;
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
                      console.log(this.clubPageData)
                    }).then(() => {
                        if (this.getUserInfo.isLogged) {
                                fetch(this.getGlobals.siteName + `/v1/club/${this.clubId}/payment`, {
                                  method: 'GET',
                                  credentials: 'include',
                                  headers: this.getGlobals.headers,
                                }).then(response => {
                                    response.json()
                                        .then(data => {
                                            console.log(data)
                                            this.definePaymentButtonStatus(data)
                                          })
                                    })
                                
                        }
                })
                })
        })
  }
}
</script>

<style scoped>

</style>