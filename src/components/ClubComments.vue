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
                  <div class="comment__user--avatar"><p>{{ (comment.accountEmail[0]).toUpperCase() }}</p></div>
                  <div>
                    <p class="comment__user--name">{{ comment.accountEmail }}</p>
                    <p class="text-light">{{ (comment.created).split(' ')[0] }}</p>
                  </div>
                </div>
                <div class="comment__text">
                  <div v-if="comment.answered" class="reply-comment">
                    <p class="aside-text">
                      <b>{{ comment.answered.accountEmail }}</b> написал:
                    </p>
                    <div class="reply-place__text">
                      {{ comment.answered.value }}
                    </div>
                  </div>
                  <p>{{ comment.value }}</p>
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
                <button @click="writeReply(comment)" class="comment__actions--reply">
                  <svg fill="#668880" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="14px"
                       viewBox="0 0 45.58 45.58" xml:space="preserve">
                    <g>
                    <path
                        d="M45.506,33.532c-1.741-7.42-7.161-17.758-23.554-19.942V7.047c0-1.364-0.826-2.593-2.087-3.113c-1.261-0.521-2.712-0.229-3.675,0.737L1.305,19.63c-1.739,1.748-1.74,4.572-0.001,6.32L16.19,40.909c0.961,0.966,2.415,1.258,3.676,0.737c1.261-0.521,2.087-1.75,2.087-3.113v-6.331c5.593,0.007,13.656,0.743,19.392,4.313c0.953,0.594,2.168,0.555,3.08-0.101C45.335,35.762,45.763,34.624,45.506,33.532z"></path>
                    </g>
                  </svg>
                  <p>Ответить</p>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div v-if="getUserInfo.isLogged">

        <div v-if="userInClub" class="write-form">

          <div class="write-reply__container">
            <div class="write-reply">
              <div class="reply-place visible">
                <div class="write-reply__header">
                  <h3>Написать ответ на комментарий:</h3>
                  <button @click="cancelWriteReply" class="bright-button cancel">Отмена</button>
                </div>
                <div class="write-reply__comment"></div>
              </div>
            </div>
          </div>


          <textarea
              placeholder="Введите ваш комментарий"
              v-model="currentCommentText"
          ></textarea>
          <button
              @click="sendComment"
              class="bright-button send"
              :class="{ disabled : this.currentCommentText.length === 0 }"
          >
            Отправить
          </button>
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
import {nextTick} from "vue";

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
      currentCommentText: '',
      currentAnswer: null,
    }
  },

  computed: {
    ...mapGetters(['getData', 'getUserInfo', 'getGlobals']),
  },

  methods: {
    ...mapActions(['sendRequest', 'getUserPayment']),

    writeReply(comment) {
      const writeCommentBlock = this.$el.querySelector('.write-form');
      const replyBlock = this.$el.querySelector('.write-reply');
      const replyBlockText = this.$el.querySelector('.write-reply__comment');
      const replyBlockContainer = this.$el.querySelector('.write-reply__container');
      this.currentAnswer = comment.id;
      const replyLayout = `
        <div class="reply-comment">
           <p class="aside-text">
              <b>${comment.accountEmail}</b> написал:
           </p>
           <div class="reply-place__text">${comment.value}</div>
        </div>
      `;
      
      writeCommentBlock.scrollIntoView();
      replyBlockText.innerHTML = replyLayout;
      replyBlockContainer.style.height = replyBlock.scrollHeight + 25 + 'px';
    },
    
    cancelWriteReply() {
      const replyBlockText = this.$el.querySelector('.write-reply__comment');
      const replyBlockContainer = this.$el.querySelector('.write-reply__container');
      replyBlockContainer.style.height = '0px';
      this.currentAnswer = '';
      setTimeout(() => {
        replyBlockText.innerHTML = ''
      }, 600)
    },

    sendComment() {
      const body = {
        'value': this.currentCommentText,
      }

      if (this.currentAnswer !== null) {
        body.answered = this.currentAnswer;
      }

      const sendCommentRequest = {
        method: 'POST',
        requestURL: `/v1/club/${this.$props.clubId}/comment`,
        headers: this.getGlobals.headers,
        body: JSON.stringify(body),
        stateTarget: [`club-${this.$props.clubId}_content`, 'tempComment',],
      }
      this.sendRequest(sendCommentRequest)
          .then(() => {
            return new Promise(resolve => {
              const newComment = this.getData([`club-${this.$props.clubId}_content`, 'tempComment']);
              this.$set(this.$store.state[`club-${this.$props.clubId}_content`].comments, newComment.id, newComment);
              resolve();
            }).then(() => {
              nextTick(() => {
                this.currentCommentText = '';
                if (this.currentAnswer !== '') {
                  this.cancelWriteReply()
                }
              })
            })
          })
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
    });
  },
  mounted() {
    window.scroll(0, 0);
  }
}
</script>)

<style scoped>

</style>