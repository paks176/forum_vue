<template>
  <div class="main-auth">
    <section class="container-auth">
      <div class="container-auth__logo">
        <img src="../assets/img/authlogo.svg" alt="">
      </div>
      <form id="loginForm">
        <input id="loginName" type="text" required placeholder="Введите почту" v-model="login">
        <input id="loginPassword" type="text" required placeholder="Введите пароль" v-model="password">
        <a href="#">Забыли пароль?</a>
        <button type="submit" class="bright-button" style="margin-top: 32px" id="loginButton" @click="logInPress">Вход</button>
      </form>
    </section>
    <div class="auth-message animation" :class="{ opacity100:  showMessage}">
        <p class="bold-text" :class="{'error-text': wrong}">{{message}}</p>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {mapGetters} from "vuex";
import router from '@/router/index'

export default {
  name: "AuthPage",
  data() {
    return {
      login: '',
      password: '',
      message: '',
      showMessage: false,
      wrong: false,
    }
  },
  methods: {
    ...mapActions(['logIn']),
    logInPress() {
      if (this.$validateForm(this.$el.querySelector('form'))) {
        event.preventDefault();
        const data = new FormData();
        const userName = this.login;
        const password = this.password;
        data.append('username', userName);
        data.append('password', password);
        this.logIn(data).then(() => {
          if (this.getLoginStatus === true) {
            this.wrong = false;
            this.message = 'Успешный вход';
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 1400)
            setTimeout(() => {
              router.push('/');
            }, 2000)
          } else {
            this.wrong = true;
            this.message = 'Неверные логин или пароль';
            this.showMessage = true;
            setTimeout(() => {
              this.showMessage = false;
            }, 3000)
          }
        })
      }
    },
  },
  computed: {
    ...mapGetters(['getLoginStatus']),
  }
}
</script>

<style scoped>

</style>