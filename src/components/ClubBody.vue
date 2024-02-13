<template>
  <div class="theme-content__top">
    <section class="project-theme">
      <div class="user">
        <div class="user__avatar">
          <p>${clubPageData.author.avatar}</p>
        </div>
        <h3 class="user__nickname">${clubPageData.author.nick}</h3>
        <p class="aside-text">${clubPageData.author.role}</p>
      </div>
      <div class="project-theme__body">
        <div>
          <div class="project-theme__body--header">
            <div>
              <h2>${clubPageData.clubContent.header}</h2>
            </div>
          </div>
          <div class="project-theme__body--text">
            <p>${clubPageData.clubContent.description}</p>
          </div>
        </div>

        <div class="aside-text">
          ${clubPageData.clubContent.created}
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
          <p class="aside-text">${clubPageData.clubInfo.notExpired}</p>
          <p class="text-light">Когда закроется:</p>
          <p class="aside-text">${clubPageData.clubInfo.expireCondition}</p>
        </div>
        <div class="project-info__body">
          <div class="project-info__item">
            <p>Вход</p>
            <div>
              ${getEntryCost(clubPageData)}
            </div>
          </div>
          <div class="project-info__item">
            <p>Целевая сумма</p>
            <div>
              ${getCertificateCost(clubPageData)}
            </div>
          </div>
          <div class="project-info__item">
            <p>Создано</p>
            <p>${clubPageData.clubContent.created}</p>
          </div>
        </div>

      </div>
      <!--     enter club button      -->
      <div class="project-info">
        <button id="paymentsLink"
                class="status-button not-active ${clubPageData.thisUser.paymentsLinkStatus} ${clubPageData.thisUser.buttonStatus}"
                data-club-id="${clubPageData.clubInfo.clubID}"
                style="margin-bottom: 15px">
          ${clubPageData.thisUser.enterButtonText}
        </button>
        <p class="project-message" >${clubPageData.thisUser.enterMessage}</p>
      </div>
      <!--     / enter club button      -->

    </section>
  </div>
</template>

<script>
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
    }
  },
  computed: {
    ...mapGetters(['getGlobals']),
    ...mapGetters(['getData']),
  },

  methods: {
    ...mapActions(['sendRequest']),
    ...mapMutations(['setData']),
  },
  mounted() {
    const clubRequest = {
      method: 'GET',
      requestURL: `/v1/club/${this.clubId}`,
      headers: this.getGlobals.headers,
      body: null,
      stateTarget: [`club-${this.clubId}_content`]
    };
    this.sendRequest(clubRequest).then(() => {
      this.$set(this.clubPageData, 'content', this.getData([`club-${this.clubId}_content`]))
    })
  }
}
</script>

<style scoped>

</style>