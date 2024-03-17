<template>
  <div>
    <h2>Комментарии участников</h2>
    <div class="comment__section">
      <div class="comment__list">
        <div v-if="!noComments" class="project-info message-block">
          <h4 style="margin-bottom: 0">Комментариев пока нет</h4>
        </div>
        <div v-else>
          <section class="comment" v-for="comment in this.commentsData" :key="comment.id">
            <div class="comment__content">
              <div class="comment__body">
                <div class="comment__user">
                  <div class="comment__user--avatar"><p>{{(comment.accountEmail[0]).toUpperCase()}}</p></div>
                  <div>
                    <p class="comment__user--name">{{comment.accountEmail}}</p>
                    <p class="text-light">{{(comment.created).split(' ')[0]}}</p>
                  </div>
                </div>
                <div class="comment__text">
                  <div v-if="comment.answered" class="reply-place visible">
                    <p class="aside-text">
                      <b>{{comment.answered.accountEmail}}</b> написал:
                    </p>
                    <div class="reply-place__text">
                      {{comment.answered.value}}
                    </div>
                  </div>
                  <p>{{comment.value}}</p>
                </div>
              </div>
              <div class="comment__actions">
                <div class="comment__actions--submenu">
                  <input id="" type="checkbox">
                  <div class="comment__actions--submenu-body">
                    <button>Написать</button>
                    <button>Пожаловаться</button>
                  </div>
                  <label for="">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100"
                         style="enable-background:new 0 0 100 100;" xml:space="preserve">
                      <g>
                        <circle class="st0" cx="50" cy="13.7" r="13.7"></circle>
                        <circle class="st0" cx="50" cy="50" r="13.7" fill="#668880"></circle>
                        <circle class="st0" cx="50" cy="86.3" r="13.7" fill="#668880"></circle>
                      </g>
                    </svg>
                  </label>
                </div>
                <a href="#comment-form" class="comment__actions--reply">
                  <svg fill="#668880" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="14px" viewBox="0 0 45.58 45.58" xml:space="preserve">
                    <g>
                    <path d="M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"></path>
                    </g>
                  </svg>
                  <p>Ответить</p>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div v-if="getUserInfo.isLogged">

        <div v-if="userInClub" class="write-form">
          <textarea type="text" placeholder="Введите ваш комментарий"></textarea>
          <button class="bright-button">Отправить</button>
        </div>

        <div v-else class="project-info message-block">
          <h4 style="margin-bottom: 0">Станьте участником складчины чтобы смотреть и писать комментарии</h4>
        </div>

      </div>

      <div v-else class="project-info message-block">
        <h4 style="margin-bottom: 0">Войдите в профиль и вступите в складчину, чтобы смотреть и писать комментарии</h4>
      </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ClubComments",

  props: {
    clubId: {
      type: String,
    }
  },

  data() {
    return {
      commentsData: '',
      userInClub: false,
      noComments: true,
    }
  },

  computed: {
    ...mapGetters(['getData', 'getUserInfo', 'getGlobals']),
  },

  methods: {
    ...mapActions(['sendRequest', 'getUserPayment']),
    sendComment() {
      
    }
  },

  created() {
    fetch(`${this.getGlobals.siteName}/v1/club/${this.$props.clubId}/payment`, {
      method: 'GET',
      credentials: 'include',
    }).then(response => {
      response.json()
          .then(data => {
            if (data.status === 'CONFIRMED') {
              this.userInClub = true;
            } else {
              this.userInClub = false;
            }
          })
    });

    const commentsDataRequest = {
      method: 'GET',
      requestURL: `/v1/club/${this.$props.clubId}/comments`,
      headers: this.getGlobals.headers,
      stateTarget: [`club-${this.$props.clubId}_content`, 'comments'],
    };

    this.sendRequest(commentsDataRequest).then(() => {
      this.commentsData = this.getData([`club-${this.$props.clubId}_content`, 'comments']);
      if (Object.keys(this.commentsData).length === 0) {
        this.noComments = false;
      }
      console.log(this.commentsData)
    });
  }
}
</script>)

<style scoped>

</style>